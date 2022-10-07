import { JSBI, TokenAmount, Fraction } from '@venomswap/sdk'
import { SmartChefStakingPool } from '../../../../state/stake/types'
import { Contract } from 'ethers'
import { useActiveWeb3React } from '../../../../hooks'
import { useSingleCallResult } from '../../../../state/multicall/hooks'
import { useSmartChefContract, useTokenContract } from '../../../../hooks/useContract'
import useBUSDPrice from '../../../useBUSDPrice'
//import useTokenWethPrice from '../../../useTokenWethPrice'
import { useBlockNumber } from '../../../../state/application/hooks'
import calculateSingleStakingApr from '../../../../utils/staking/smartChef/apr/calculateSingleStakingApr'

export function useUpdatePoolRewards(
  smartChefContract: Contract | null,
  stakingPool: SmartChefStakingPool
): SmartChefStakingPool {
  return stakingPool
}

export function useUpdatePendingRewards(
  smartChefContract: Contract | null,
  stakingPool: SmartChefStakingPool,
  account: string | null | undefined
): SmartChefStakingPool {
  const pendingRewardResult = useSingleCallResult(smartChefContract, 'pendingReward', [account])

  if (stakingPool && pendingRewardResult && !pendingRewardResult.error && !pendingRewardResult.loading) {
    const calculatedTotalPendingRewards = JSBI.BigInt(pendingRewardResult?.result?.[0] ?? 0)
    const totalPendingRewardAmount = new TokenAmount(stakingPool.rewardToken, calculatedTotalPendingRewards)

    if (totalPendingRewardAmount) {
      stakingPool.earnedAmount = totalPendingRewardAmount
    }
  }

  return stakingPool
}

export function useUpdateStakedAmount(
  smartChefContract: Contract | null,
  stakingPool: SmartChefStakingPool,
  account?: string | null
): SmartChefStakingPool {
  const tokenContract = useTokenContract(stakingPool.stakedToken?.address)
  const userInfoResult = useSingleCallResult(smartChefContract, 'userInfo', [account])
  const tokenBalanceResult = useSingleCallResult(tokenContract, 'balanceOf', [stakingPool.stakedToken?.address])

  if (
    stakingPool &&
    stakingPool.stakedToken &&
    userInfoResult &&
    !userInfoResult.error &&
    !userInfoResult.loading &&
    tokenBalanceResult &&
    !tokenBalanceResult.error &&
    !tokenBalanceResult.loading
  ) {
    stakingPool.stakedAmount = new TokenAmount(stakingPool.stakedToken, JSBI.BigInt(userInfoResult?.result?.[0] ?? 0))
    stakingPool.totalStakedAmount = new TokenAmount(
      stakingPool.stakedToken,
      JSBI.BigInt(tokenBalanceResult.result?.[0] ?? 0)
    )
    stakingPool.stakedRatio = new Fraction(stakingPool.stakedAmount.raw, stakingPool.totalStakedAmount.raw)
  }

  return stakingPool
}

export function useUpdateBlockData(stakingPool: SmartChefStakingPool): SmartChefStakingPool {
  const currentBlock = useBlockNumber()

  if (currentBlock) {
    stakingPool.blocks.shouldShowCountdown = Boolean(stakingPool.blocks.start && stakingPool.blocks.end)
    stakingPool.blocks.untilStart = Math.max(stakingPool.blocks.start - currentBlock, 0)
    stakingPool.blocks.remaining = Math.max(stakingPool.blocks.end - currentBlock, 0)
    stakingPool.blocks.started = stakingPool.blocks.untilStart === 0 && stakingPool.blocks.remaining > 0
    stakingPool.blocks.toDisplay = stakingPool.blocks.started
      ? stakingPool.blocks.remaining
      : stakingPool.blocks.untilStart
    stakingPool.blocks.ended = stakingPool.blocks.remaining <= 0
  }

  return stakingPool
}

export function useUpdateStatistics(stakingPool: SmartChefStakingPool): SmartChefStakingPool {
  const stakingTokenContract = useTokenContract(stakingPool.stakedToken?.address)

  const stakedTokenBalanceResult = useSingleCallResult(stakingTokenContract, 'balanceOf', [stakingPool.address])

  const stakedTokenBalance = stakingPool.stakedToken
    ? new TokenAmount(stakingPool.stakedToken, JSBI.BigInt(stakedTokenBalanceResult?.result?.[0] ?? 0))
    : undefined

  const stakedTokenBusdPrice = useBUSDPrice(stakingPool.stakedToken)
  const rewardTokenBusdPrice = useBUSDPrice(stakingPool.rewardToken)

  if (stakedTokenBusdPrice && stakedTokenBalance) {
    stakingPool.valueOfTotalStakedAmountInUsd = stakedTokenBalance.multiply(stakedTokenBusdPrice)

    const apr =
      stakingPool.valueOfTotalStakedAmountInUsd && stakingPool.rewardPerBlock && stakingPool.blocksPerYear
        ? calculateSingleStakingApr(
            rewardTokenBusdPrice,
            stakingPool.rewardPerBlock,
            stakingPool.blocksPerYear,
            stakingPool.valueOfTotalStakedAmountInUsd
          )
        : undefined

    stakingPool.apr = apr
  }

  return stakingPool
}

export function useExtendStakingInfo(stakingPool: SmartChefStakingPool): SmartChefStakingPool {
  const { account } = useActiveWeb3React()
  const smartChefContract = useSmartChefContract(stakingPool.address)

  // Update base + pool specific rewards
  //stakingInfo = useUpdatePoolRewards(masterBreederContract, stakingInfo, govToken)

  // Update pending rewards
  stakingPool = useUpdatePendingRewards(smartChefContract, stakingPool, account)

  // Update staking amounts
  stakingPool = useUpdateStakedAmount(smartChefContract, stakingPool, account)

  // Update block data
  stakingPool = useUpdateBlockData(stakingPool)

  // Update APR/statistics
  stakingPool = useUpdateStatistics(stakingPool)

  return stakingPool
}

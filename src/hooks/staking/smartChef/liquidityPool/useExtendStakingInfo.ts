import { ChainId, JSBI, Pair, TokenAmount, Fraction } from '@venomswap/sdk'
import { SmartChefStakingPool } from '../../../../state/stake/types'
import { Contract } from 'ethers'
import { useActiveWeb3React } from '../../..'
import { useSingleCallResult } from '../../../../state/multicall/hooks'
import { useSmartChefContract, usePairContract } from '../../../useContract'
import { useBlockNumber } from '../../../../state/application/hooks'
import useTokensWithWethPrices from '../../../tokens/useTokensWithWethPrices'
import useBUSDPrice from '../../../useBUSDPrice'
import useTokenWethPrice from '../../../useTokenWethPrice'

import determineBaseToken from '../../../../utils/determineBaseToken'
import calculateWethAdjustedTotalStakedAmount from '../../../../utils/calculateWethAdjustedTotalStakedAmount'
import calculateLpStakingApr from '../../../../utils/staking/smartChef/apr/calculateLpStakingApr'

export function useUpdatePoolRewards(stakingPool: SmartChefStakingPool): SmartChefStakingPool {
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
  const pairContract = usePairContract(stakingPool?.pairAddress)
  const userInfoResult = useSingleCallResult(smartChefContract, 'userInfo', [account])
  const lpTokenBalanceResult = useSingleCallResult(pairContract, 'balanceOf', [stakingPool.address])

  if (
    stakingPool &&
    stakingPool.stakedTokens &&
    userInfoResult &&
    !userInfoResult.error &&
    !userInfoResult.loading &&
    lpTokenBalanceResult &&
    !lpTokenBalanceResult.error &&
    !lpTokenBalanceResult.loading
  ) {
    const dummyPair = new Pair(
      new TokenAmount(stakingPool.stakedTokens[0], '0'),
      new TokenAmount(stakingPool.stakedTokens[1], '0')
    )

    stakingPool.stakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(userInfoResult?.result?.[0] ?? 0))
    stakingPool.totalStakedAmount = new TokenAmount(
      dummyPair.liquidityToken,
      JSBI.BigInt(lpTokenBalanceResult.result?.[0] ?? 0)
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

export function useUpdateStatistics(
  stakingPool: SmartChefStakingPool,
  chainId: ChainId | undefined
): SmartChefStakingPool {
  const pairContract = usePairContract(stakingPool?.pairAddress)
  const lpTokenTotalSupplyResult = useSingleCallResult(pairContract, 'totalSupply')
  const lpTokenReserveResult = useSingleCallResult(pairContract, 'getReserves')
  const tokensWithPrices = useTokensWithWethPrices()
  const weth = tokensWithPrices?.WETH?.token
  const wethBusdPrice = useBUSDPrice(weth)
  const rewardTokenWethPrice = useTokenWethPrice(stakingPool.rewardToken)

  if (
    chainId &&
    stakingPool &&
    stakingPool.stakedTokens &&
    stakingPool.stakedTokensReserveOrder &&
    stakingPool.totalStakedAmount &&
    stakingPool.rewardPerBlock &&
    lpTokenTotalSupplyResult &&
    !lpTokenTotalSupplyResult.error &&
    !lpTokenTotalSupplyResult.loading &&
    lpTokenReserveResult &&
    !lpTokenReserveResult.error &&
    !lpTokenReserveResult.loading &&
    tokensWithPrices &&
    wethBusdPrice
  ) {
    //const govToken = tokensWithPrices?.govToken?.token
    if (stakingPool.baseToken === undefined) {
      stakingPool.baseToken = stakingPool.stakedTokens
        ? determineBaseToken(tokensWithPrices, stakingPool.stakedTokens)
        : undefined
    }

    const dummyPair = new Pair(
      new TokenAmount(stakingPool.stakedTokens[0], '0'),
      new TokenAmount(stakingPool.stakedTokens[1], '0')
    )

    const totalLpTokenSupply = new TokenAmount(
      dummyPair.liquidityToken,
      JSBI.BigInt(lpTokenTotalSupplyResult.result?.[0] ?? 0)
    )

    const totalStakedAmountWETH = calculateWethAdjustedTotalStakedAmount(
      chainId,
      stakingPool.baseToken,
      tokensWithPrices,
      stakingPool.stakedTokensReserveOrder,
      totalLpTokenSupply,
      stakingPool.totalStakedAmount,
      lpTokenReserveResult?.result
    )

    const totalStakedAmountBUSD =
      wethBusdPrice && totalStakedAmountWETH && totalStakedAmountWETH.multiply(wethBusdPrice?.raw)

    const apr = totalStakedAmountWETH
      ? calculateLpStakingApr(
          rewardTokenWethPrice,
          stakingPool.rewardPerBlock,
          stakingPool.blocksPerYear,
          totalStakedAmountWETH
        )
      : undefined

    stakingPool.valueOfTotalStakedAmountInWeth = totalStakedAmountWETH
    stakingPool.valueOfTotalStakedAmountInUsd = totalStakedAmountBUSD
    stakingPool.apr = apr
  }

  return stakingPool
}

export function useExtendStakingInfo(stakingPool: SmartChefStakingPool): SmartChefStakingPool {
  const { chainId, account } = useActiveWeb3React()
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
  stakingPool = useUpdateStatistics(stakingPool, chainId)

  return stakingPool
}

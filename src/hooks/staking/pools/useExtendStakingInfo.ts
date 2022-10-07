import { JSBI, Pair, Token, TokenAmount, Fraction, ChainId } from '@venomswap/sdk'
import { useSingleCallResult, useSingleContractMultipleData } from '../../../state/multicall/hooks'
import { useMasterBreederContract } from '../../useContract'
import useGovernanceToken from '../../tokens/useGovernanceToken'
import { DefaultStakingPool } from '../../../state/stake/types'
import { Contract } from 'ethers'
import { usePairContract } from '../../useContract'
import { useActiveWeb3React } from '../..'
import useTokensWithWethPrices from '../../tokens/useTokensWithWethPrices'
import useBUSDPrice from '../../useBUSDPrice'

import determineBaseToken from '../../../utils/determineBaseToken'
import calculateWethAdjustedTotalStakedAmount from '../../../utils/calculateWethAdjustedTotalStakedAmount'
import calculateApr from '../../../utils/staking/apr/calculateApr'

export function useUpdatePoolRewards(
  masterBreederContract: Contract | null,
  stakingInfo: DefaultStakingPool,
  govToken: Token | undefined
): DefaultStakingPool {
  const poolRewardsArgs = [[0], [stakingInfo?.pid !== undefined ? stakingInfo.pid + 1 : 0]]
  const poolRewardsPerBlock = useSingleContractMultipleData(
    masterBreederContract,
    'getNewRewardPerBlock',
    poolRewardsArgs
  )

  const baseRewardsResult = poolRewardsPerBlock[0]
  const poolRewardsResult = poolRewardsPerBlock[1]

  if (
    stakingInfo &&
    baseRewardsResult &&
    !baseRewardsResult.error &&
    !baseRewardsResult.loading &&
    poolRewardsResult &&
    !poolRewardsResult.error &&
    !poolRewardsResult.loading
  ) {
    const baseBlockRewards =
      govToken && baseRewardsResult?.result?.[0]
        ? new TokenAmount(govToken, JSBI.BigInt(baseRewardsResult?.result?.[0]))
        : undefined

    const poolBlockRewards =
      govToken && poolRewardsResult?.result?.[0]
        ? new TokenAmount(govToken, JSBI.BigInt(poolRewardsResult?.result?.[0] ?? 0))
        : baseBlockRewards

    stakingInfo.baseRewardsPerBlock = baseBlockRewards
    stakingInfo.poolRewardsPerBlock = poolBlockRewards
    stakingInfo.poolShare =
      baseBlockRewards && poolBlockRewards ? new Fraction(poolBlockRewards.raw, baseBlockRewards.raw) : undefined
  }

  return stakingInfo
}

export function useUpdatePendingRewards(
  masterBreederContract: Contract | null,
  stakingInfo: DefaultStakingPool,
  account: string | null | undefined,
  govToken: Token | undefined
): DefaultStakingPool {
  const pendingRewardResult = useSingleCallResult(masterBreederContract, 'pendingReward', [stakingInfo?.pid, account])

  if (
    stakingInfo &&
    pendingRewardResult &&
    !pendingRewardResult.error &&
    !pendingRewardResult.loading &&
    stakingInfo?.lockedRewardsPercentageUnits
  ) {
    const unlockedRewardsPercentageUnits = 100 - stakingInfo.lockedRewardsPercentageUnits

    const calculatedTotalPendingRewards = JSBI.BigInt(pendingRewardResult?.result?.[0] ?? 0)
    const calculatedLockedPendingRewards = JSBI.divide(
      JSBI.multiply(calculatedTotalPendingRewards, JSBI.BigInt(stakingInfo.lockedRewardsPercentageUnits)),
      JSBI.BigInt(100)
    )
    const calculatedUnlockedPendingRewards = JSBI.divide(
      JSBI.multiply(calculatedTotalPendingRewards, JSBI.BigInt(unlockedRewardsPercentageUnits)),
      JSBI.BigInt(100)
    )

    const totalPendingRewardAmount = govToken ? new TokenAmount(govToken, calculatedTotalPendingRewards) : undefined
    const totalPendingLockedRewardAmount = govToken
      ? new TokenAmount(govToken, calculatedLockedPendingRewards)
      : undefined
    const totalPendingUnlockedRewardAmount = govToken
      ? new TokenAmount(govToken, calculatedUnlockedPendingRewards)
      : undefined

    if (totalPendingRewardAmount) {
      stakingInfo.earnedAmount = totalPendingRewardAmount
    }

    if (totalPendingLockedRewardAmount) {
      stakingInfo.lockedEarnedAmount = totalPendingLockedRewardAmount
    }

    if (totalPendingUnlockedRewardAmount) {
      stakingInfo.unlockedEarnedAmount = totalPendingUnlockedRewardAmount
    }
  }

  return stakingInfo
}

export function useUpdateStakedAmount(
  masterBreederContract: Contract | null,
  stakingInfo: DefaultStakingPool,
  account?: string | null
): DefaultStakingPool {
  const pairContract = usePairContract(stakingInfo?.pairAddress)

  const userInfoResult = useSingleCallResult(masterBreederContract, 'userInfo', [stakingInfo?.pid, account])
  const lpTokenBalanceResult = useSingleCallResult(pairContract, 'balanceOf', [masterBreederContract?.address])

  if (
    stakingInfo &&
    stakingInfo.tokens &&
    userInfoResult &&
    !userInfoResult.error &&
    !userInfoResult.loading &&
    lpTokenBalanceResult &&
    !lpTokenBalanceResult.error &&
    !lpTokenBalanceResult.loading
  ) {
    const dummyPair = new Pair(new TokenAmount(stakingInfo.tokens[0], '0'), new TokenAmount(stakingInfo.tokens[1], '0'))
    stakingInfo.stakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(userInfoResult?.result?.[0] ?? 0))
    stakingInfo.totalStakedAmount = new TokenAmount(
      dummyPair.liquidityToken,
      JSBI.BigInt(lpTokenBalanceResult.result?.[0] ?? 0)
    )
    stakingInfo.stakedRatio = new Fraction(stakingInfo.stakedAmount.raw, stakingInfo.totalStakedAmount.raw)
  }

  return stakingInfo
}

export function useUpdateStatistics(stakingInfo: DefaultStakingPool, chainId: ChainId | undefined): DefaultStakingPool {
  const pairContract = usePairContract(stakingInfo?.pairAddress)
  const lpTokenTotalSupplyResult = useSingleCallResult(pairContract, 'totalSupply')
  const lpTokenReserveResult = useSingleCallResult(pairContract, 'getReserves')
  const tokensWithPrices = useTokensWithWethPrices()
  const weth = tokensWithPrices?.WETH?.token
  const wethBusdPrice = useBUSDPrice(weth)

  if (
    chainId &&
    stakingInfo &&
    stakingInfo.totalStakedAmount &&
    stakingInfo.baseRewardsPerBlock &&
    stakingInfo.poolShare &&
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
    const govTokenWETHPrice = tokensWithPrices?.govToken?.price
    stakingInfo.baseToken = determineBaseToken(tokensWithPrices, stakingInfo.tokens)
    const dummyPair = new Pair(new TokenAmount(stakingInfo.tokens[0], '0'), new TokenAmount(stakingInfo.tokens[1], '0'))

    const totalLpTokenSupply = new TokenAmount(
      dummyPair.liquidityToken,
      JSBI.BigInt(lpTokenTotalSupplyResult.result?.[0] ?? 0)
    )

    const totalStakedAmountWETH = calculateWethAdjustedTotalStakedAmount(
      chainId,
      stakingInfo.baseToken,
      tokensWithPrices,
      stakingInfo.tokens,
      totalLpTokenSupply,
      stakingInfo.totalStakedAmount,
      lpTokenReserveResult?.result
    )

    const totalStakedAmountBUSD =
      wethBusdPrice && totalStakedAmountWETH && totalStakedAmountWETH.multiply(wethBusdPrice?.raw)

    const apr = totalStakedAmountWETH
      ? calculateApr(
          govTokenWETHPrice,
          stakingInfo.baseRewardsPerBlock,
          stakingInfo.blocksPerYear,
          stakingInfo.poolShare,
          totalStakedAmountWETH
        )
      : undefined

    stakingInfo.valueOfTotalStakedAmountInWeth = totalStakedAmountWETH
    stakingInfo.valueOfTotalStakedAmountInUsd = totalStakedAmountBUSD
    stakingInfo.apr = apr
  }

  return stakingInfo
}

export function useExtendStakingInfo(stakingInfo: DefaultStakingPool): DefaultStakingPool {
  const { chainId, account } = useActiveWeb3React()
  const masterBreederContract = useMasterBreederContract()
  const govToken = useGovernanceToken()

  // Update base + pool specific rewards
  stakingInfo = useUpdatePoolRewards(masterBreederContract, stakingInfo, govToken)

  // Update pending rewards
  stakingInfo = useUpdatePendingRewards(masterBreederContract, stakingInfo, account, govToken)

  // Update staking amounts
  stakingInfo = useUpdateStakedAmount(masterBreederContract, stakingInfo, account)

  // Update APR/statistics
  stakingInfo = useUpdateStatistics(stakingInfo, chainId)

  return stakingInfo
}

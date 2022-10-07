import { CurrencyAmount, JSBI, Token, TokenAmount, Pair } from '@venomswap/sdk'
import { useMemo } from 'react'
import { useActiveWeb3React } from '../../hooks'
import { tryParseAmount } from '../swap/hooks'
import useGovernanceToken from '../../hooks/tokens/useGovernanceToken'
import useFilterDefaultStakingPoolInfos from '../../hooks/staking/pools/useFilterDefaultStakingPoolInfos'
import useFilterSmartChefStakingPoolInfos from '../../hooks/staking/smartChef/useFilterSmartChefStakingPoolInfos'
import getBlocksPerYear from '../../utils/getBlocksPerYear'
import { DefaultStakingPool, SmartChefStakingPool } from './types'
import useStakingSettings from '../../hooks/useStakingSettings'
import useExtendWithPendingRewards from '../../hooks/staking/pools/useExtendWithPendingRewards'
import { useBlockNumber } from '../../state/application/hooks'
import { utils } from 'ethers'

export const STAKING_GENESIS = 6502000

export const REWARDS_DURATION_DAYS = 60

// gets the staking info from the network for the active chain id
export function useDefaultStakingPools(
  active: boolean | undefined = undefined,
  pairToFilterBy?: Pair | null
): DefaultStakingPool[] {
  const { chainId } = useActiveWeb3React()

  const stakingSettings = useStakingSettings()

  const defaultStakingPoolInfos = useFilterDefaultStakingPoolInfos(chainId, active, pairToFilterBy)

  const govToken = useGovernanceToken()

  const blocksPerYear = getBlocksPerYear(chainId)

  const pids = useMemo(() => defaultStakingPoolInfos.map(({ pid }) => pid), [defaultStakingPoolInfos])

  //const poolLength = useSingleCallResult(masterBreederContract, 'poolLength')
  const startBlock = stakingSettings ? stakingSettings.startBlock : 10183471
  const lockedRewardsPercentageUnits = stakingSettings ? stakingSettings.lockRewardsRatio : 95
  const unlockedRewardsPercentageUnits = stakingSettings ? stakingSettings.unlockedRewardsRatio : 5

  //const rewardPerBlock = useSingleCallResult(masterBreederContract, 'REWARD_PER_BLOCK')

  return useMemo(() => {
    if (!chainId || !govToken) return []

    return pids.reduce<DefaultStakingPool[]>((memo: any, pid: number, index: number) => {
      const stakingInfoData = defaultStakingPoolInfos[index]
      const active = stakingInfoData.active || stakingInfoData.allocPoints > 0
      //const pendingReward = pendingRewards[index]

      const stakingInfo = {
        pid: pid,
        order: stakingInfoData.order,
        allocPoints: stakingInfoData.allocPoints,
        tokens: stakingInfoData.tokens,
        bgToken: stakingInfoData.bgToken,
        startBlock: startBlock,
        blocksPerYear: blocksPerYear,
        lockedRewardsPercentageUnits: lockedRewardsPercentageUnits,
        unlockedRewardsPercentageUnits: unlockedRewardsPercentageUnits,
        pairAddress: stakingInfoData.pairAddress,
        active: active
      }

      memo.push(stakingInfo)

      return memo
    }, [])
  }, [chainId, defaultStakingPoolInfos, govToken, pids])
}

export function useSmartChefStakingPools(
  category = 'single',
  active: boolean | undefined = undefined,
  addressToFilterBy?: string
): SmartChefStakingPool[] {
  const { chainId } = useActiveWeb3React()

  const smartChefStakingPoolInfos = useFilterSmartChefStakingPoolInfos(chainId, category, active, addressToFilterBy)

  const currentBlock = useBlockNumber()

  const blocksPerYear = getBlocksPerYear(chainId)

  const pids = useMemo(() => smartChefStakingPoolInfos.map(({ pid }) => pid), [smartChefStakingPoolInfos])

  return useMemo(() => {
    if (!chainId || !smartChefStakingPoolInfos) return []

    return pids.reduce<SmartChefStakingPool[]>((memo: any, pid: number, index: number) => {
      const poolInfo = smartChefStakingPoolInfos[index]

      const pool: SmartChefStakingPool = {
        pid: poolInfo.pid,
        order: poolInfo.order,
        address: poolInfo.address,
        poolType: poolInfo.poolType,
        stakedToken: poolInfo.stakedToken,
        stakedTokens: poolInfo.stakedTokens,
        stakedTokensReserveOrder: poolInfo.stakedTokensReserveOrder,
        pairAddress: poolInfo.pairAddress,
        rewardToken: poolInfo.rewardToken,
        bgToken: poolInfo.bgToken,
        category: poolInfo.category,
        blocksPerYear: blocksPerYear,
        blocks: {
          start: poolInfo.blocks.start,
          end: poolInfo.blocks.end
        },
        withdrawalMethod: poolInfo.withdrawalMethod,
        visible: poolInfo.visible
      }

      if (poolInfo.baseToken) {
        pool.baseToken = poolInfo.baseToken
      }

      if (pool.rewardPerBlock === undefined) {
        pool.rewardPerBlock = new TokenAmount(
          pool.rewardToken,
          JSBI.BigInt(utils.parseUnits(poolInfo.rewardPerBlock.toString(), pool.rewardToken.decimals))
        )
      }

      if (currentBlock) {
        pool.blocks.duration = Math.max(pool.blocks.end - pool.blocks.start, 0)
        pool.blocks.shouldShowCountdown = Boolean(poolInfo.blocks.start && poolInfo.blocks.end)
        pool.blocks.untilStart = Math.max(pool.blocks.start - currentBlock, 0)
        pool.blocks.remaining = Math.max(pool.blocks.end - currentBlock, 0)
        pool.blocks.started = pool.blocks.untilStart === 0 && pool.blocks.remaining > 0
        pool.blocks.ended = pool.blocks.remaining <= 0
        pool.blocks.toDisplay = pool.blocks.started ? pool.blocks.remaining : pool.blocks.untilStart
      }

      memo.push(pool)

      return memo
    }, [])
  }, [chainId, smartChefStakingPoolInfos, pids, category, active])
}

export function useTotalGovTokensEarned(): TokenAmount | undefined {
  const govToken = useGovernanceToken()
  const stakingInfos = useExtendWithPendingRewards(useDefaultStakingPools(true))
  const withLoadedRewards = stakingInfos.filter(
    (stakingInfo: DefaultStakingPool) => stakingInfo.earnedAmount !== undefined
  )

  return useMemo(() => {
    if (!govToken) return undefined
    if (withLoadedRewards.length === 0) return undefined
    return (
      stakingInfos?.reduce(
        (accumulator, stakingInfo) =>
          accumulator.add(stakingInfo.earnedAmount ? stakingInfo.earnedAmount : new TokenAmount(govToken, '0')),
        new TokenAmount(govToken, '0')
      ) ?? undefined
    )
  }, [stakingInfos, govToken])
}

export function useTotalLockedGovTokensEarned(): TokenAmount | undefined {
  const govToken = useGovernanceToken()
  const stakingInfos = useExtendWithPendingRewards(useDefaultStakingPools(true))
  const withLoadedRewards = stakingInfos.filter(
    (stakingInfo: DefaultStakingPool) => stakingInfo.lockedEarnedAmount !== undefined
  )

  return useMemo(() => {
    if (!govToken) return undefined
    if (withLoadedRewards.length === 0) return undefined
    return (
      stakingInfos?.reduce(
        (accumulator, stakingInfo) =>
          accumulator.add(
            stakingInfo.lockedEarnedAmount ? stakingInfo.lockedEarnedAmount : new TokenAmount(govToken, '0')
          ),
        new TokenAmount(govToken, '0')
      ) ?? undefined
    )
  }, [stakingInfos, govToken])
}

export function useTotalUnlockedGovTokensEarned(): TokenAmount | undefined {
  const govToken = useGovernanceToken()
  const stakingInfos = useExtendWithPendingRewards(useDefaultStakingPools(true))
  const withLoadedRewards = stakingInfos.filter(
    (stakingInfo: DefaultStakingPool) => stakingInfo.unlockedEarnedAmount !== undefined
  )

  return useMemo(() => {
    if (!govToken) return undefined
    if (withLoadedRewards.length === 0) return undefined
    return (
      stakingInfos?.reduce(
        (accumulator, stakingInfo) =>
          accumulator.add(
            stakingInfo.unlockedEarnedAmount ? stakingInfo.unlockedEarnedAmount : new TokenAmount(govToken, '0')
          ),
        new TokenAmount(govToken, '0')
      ) ?? undefined
    )
  }, [stakingInfos, govToken])
}

// based on typed value
export function useDerivedStakeInfo(
  typedValue: string,
  stakingToken: Token | undefined,
  userLiquidityUnstaked: TokenAmount | undefined
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = stakingToken ? tryParseAmount(typedValue, stakingToken) : undefined

  const parsedAmount =
    parsedInput && userLiquidityUnstaked && JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}

// based on typed value
export function useDerivedUnstakeInfo(
  typedValue: string,
  stakingAmount: TokenAmount | undefined
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = stakingAmount
    ? tryParseAmount(typedValue, stakingAmount.token)
    : undefined

  const parsedAmount =
    parsedInput && stakingAmount && JSBI.lessThanOrEqual(parsedInput.raw, stakingAmount.raw) ? parsedInput : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}

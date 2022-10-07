import { ChainId } from '@venomswap/sdk'
import { useMemo } from 'react'
import { DEFAULT_STAKING_POOL_INFOS } from '../../../constants/staking/pools'

export default function useCalculateStakingInfoMembers(
  chainId: ChainId | undefined
): Record<string, number | undefined> {
  return useMemo(() => {
    const activeStakingInfos = chainId
      ? DEFAULT_STAKING_POOL_INFOS[chainId as ChainId]?.filter(stakingRewardInfo => stakingRewardInfo.active)
      : []
    const inactiveStakingInfos = chainId
      ? DEFAULT_STAKING_POOL_INFOS[chainId as ChainId]?.filter(stakingRewardInfo => !stakingRewardInfo.active)
      : []

    return {
      active: activeStakingInfos?.length,
      inactive: inactiveStakingInfos?.length
    }
  }, [chainId])
}

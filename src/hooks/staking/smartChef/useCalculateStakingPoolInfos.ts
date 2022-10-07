import { ChainId } from '@venomswap/sdk'
import { useMemo } from 'react'
import { SMART_CHEF_POOL_INFOS } from '../../../constants/staking/smartChef'

export default function useCalculateStakingPoolInfos(
  chainId: ChainId | undefined,
  category = 'single'
): Record<string, number | undefined> {
  return useMemo(() => {
    const activeStakingInfos = chainId
      ? SMART_CHEF_POOL_INFOS[chainId as ChainId]?.[category]?.filter(stakingRewardInfo => stakingRewardInfo.visible)
      : []
    const inactiveStakingInfos = chainId
      ? SMART_CHEF_POOL_INFOS[chainId as ChainId]?.[category]?.filter(stakingRewardInfo => !stakingRewardInfo.visible)
      : []

    return {
      active: activeStakingInfos?.length,
      inactive: inactiveStakingInfos?.length
    }
  }, [chainId, category])
}

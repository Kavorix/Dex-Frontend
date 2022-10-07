import { useMemo } from 'react'
import { ChainId } from '@venomswap/sdk'
import { SmartChefPoolInfo } from '../../../constants/staking/types'
import { SMART_CHEF_POOL_INFOS } from '../../../constants/staking/smartChef'

export default function useFilterSmartChefStakingPoolInfos(
  chainId: ChainId | undefined,
  category = 'single',
  visible: boolean | undefined = undefined,
  address: string | undefined = undefined
): SmartChefPoolInfo[] {
  return useMemo(() => {
    let pools = chainId ? SMART_CHEF_POOL_INFOS[chainId]?.[category] ?? [] : []

    if (visible !== undefined) {
      pools = pools?.filter(stakingRewardInfo => stakingRewardInfo.visible === visible) ?? []
    }

    if (address !== undefined) {
      pools = pools?.filter(stakingRewardInfo => stakingRewardInfo.address === address) ?? []
    }

    return pools
  }, [chainId, category, visible, address])
}

import { useMemo } from 'react'
import { ChainId, Pair } from '@venomswap/sdk'
import { DefaultStakingPoolInfo } from '../../../constants/staking/types'
import { DEFAULT_STAKING_POOL_INFOS } from '../../../constants/staking/pools'

export default function useFilterDefaultStakingPoolInfos(
  chainId: ChainId | undefined,
  active: boolean | undefined = undefined,
  pairToFilterBy?: Pair | null
): DefaultStakingPoolInfo[] {
  return useMemo(() => {
    const pools = chainId
      ? DEFAULT_STAKING_POOL_INFOS[chainId]?.filter(stakingRewardInfo =>
          pairToFilterBy === undefined
            ? true
            : pairToFilterBy === null
            ? false
            : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
              pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])
        ) ?? []
      : []

    if (active !== undefined) {
      return pools?.filter(stakingRewardInfo => stakingRewardInfo.active === active) ?? []
    }

    return pools
  }, [chainId, active, pairToFilterBy])
}

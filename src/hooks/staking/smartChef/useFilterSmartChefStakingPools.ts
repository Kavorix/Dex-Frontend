import { useMemo } from 'react'
import { SmartChefStakingPool } from '../../../state/stake/types'

export default function useFilterSmartChefStakingPools(
  stakingInfos: SmartChefStakingPool[],
  isActive: boolean | undefined = undefined,
  onlyStaked: boolean | undefined = undefined,
  sort: string | undefined = undefined
): SmartChefStakingPool[] {
  sort = sort ? sort : 'order'

  return useMemo(() => {
    if (isActive !== undefined) {
      stakingInfos = stakingInfos.filter(s => s.visible === isActive)
    }

    if (onlyStaked !== undefined) {
      return stakingInfos
        .filter(s => s?.earnedAmount?.greaterThan('0'))
        .sort((a, b) => {
          if (a.earnedAmount === undefined || b.earnedAmount === undefined) {
            return 0
          }
          return b.earnedAmount.greaterThan(a.earnedAmount) ? 1 : -1
        })
    }

    switch (sort) {
      case 'pid':
        return stakingInfos.sort((a, b) => {
          if (a.pid === undefined || b.pid === undefined) {
            return 0
          }
          return b.pid > a.pid ? 1 : -1
        })

      case 'order':
        return stakingInfos.sort((a, b) => {
          if (a.order === undefined || b.order === undefined) {
            return 0
          }
          return b.order > a.order ? 1 : -1
        })

      case 'apr':
        return stakingInfos.sort((a, b) => {
          if (a.apr === undefined || b.apr === undefined) {
            return 0
          }
          return b.apr.greaterThan(a.apr) ? 1 : -1
        })
        break

      default:
        return stakingInfos.sort((a, b) => {
          if (a.pid === undefined || b.pid === undefined) {
            return 0
          }
          return b.pid > a.pid ? 1 : -1
        })
        break
    }
  }, [stakingInfos, isActive, onlyStaked])
}

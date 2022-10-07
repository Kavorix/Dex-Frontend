import { useMemo } from 'react'
import { DefaultStakingPool } from '../../../state/stake/types'

export default function useFilterDefaultStakingPools(
  stakingInfos: DefaultStakingPool[],
  isActive: boolean | undefined = undefined,
  onlyStaked: boolean | undefined = undefined,
  sort: string | undefined = undefined
): DefaultStakingPool[] {
  sort = sort ? sort : 'order'

  return useMemo(() => {
    if (isActive !== undefined) {
      stakingInfos = stakingInfos.filter(s => s.active === isActive)
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

      case 'allocPoints':
        return stakingInfos.sort((a, b) => {
          if (a.allocPoints === undefined || b.allocPoints === undefined) {
            return 0
          }
          return b.allocPoints > a.allocPoints ? 1 : -1
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

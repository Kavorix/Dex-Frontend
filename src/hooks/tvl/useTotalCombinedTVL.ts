import { useMemo } from 'react'
import { DefaultStakingPool } from '../../state/stake/types'
import useTotalTVL from './useTotalTVL'
import usePitTVL from './usePitTVL'
import { useExtendWithStatistics } from '../staking/pools/useExtendWithStatistics'

export default function useTotalCombinedTVL(stakingInfos: DefaultStakingPool[]): Record<string, any> {
  stakingInfos = useExtendWithStatistics(stakingInfos)
  const totalStakingPoolTVL = useTotalTVL(stakingInfos)
  const totalPitTVL = usePitTVL()

  return useMemo(() => {
    return {
      stakingPoolTVL: totalStakingPoolTVL ? totalStakingPoolTVL : undefined,
      totalPitTVL: totalPitTVL ? totalPitTVL : undefined,
      totalCombinedTVL: totalStakingPoolTVL && totalPitTVL ? totalStakingPoolTVL.add(totalPitTVL) : undefined
    }
  }, [stakingInfos, totalStakingPoolTVL, totalPitTVL])
}

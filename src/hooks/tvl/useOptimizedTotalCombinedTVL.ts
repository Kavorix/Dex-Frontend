import { useMemo } from 'react'
import { ChainId } from '@venomswap/sdk'
import useLpPoolTVL from './useLpPoolTVL'
import usePitTVL from './usePitTVL'
import useSingleStakingTVL from './useSingleStakingTVL'
import { useBlockNumber } from '../../state/application/hooks'

export default function useOptimizedTotalCombinedTVL(chainId: ChainId | undefined): Record<string, any> | undefined {
  const latestBlockNumber = useBlockNumber()
  const lpPoolTVL = useLpPoolTVL()
  const totalPitTVL = usePitTVL()
  const totalSingleStakingTVL = useSingleStakingTVL()
  const validTvlData = lpPoolTVL !== undefined && totalPitTVL !== undefined && totalSingleStakingTVL !== undefined

  return useMemo(() => {
    if (!validTvlData) return undefined
    return {
      stakingPoolTVL: lpPoolTVL ? lpPoolTVL : undefined,
      totalPitTVL: totalPitTVL ? totalPitTVL : undefined,
      totalNestTVL: totalSingleStakingTVL ? totalSingleStakingTVL : undefined,
      totalCombinedTVL:
        lpPoolTVL && totalPitTVL && totalSingleStakingTVL
          ? lpPoolTVL.add(totalPitTVL).add(totalSingleStakingTVL)
          : undefined
    }
  }, [chainId, latestBlockNumber, validTvlData])
}

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useActiveWeb3React } from '../../../hooks'
import { AppDispatch, AppState } from '../../index'
import { SerializableFraction } from '../../serialize'
import { updateTvl } from './actions'
import { StakingTvlDetails } from './reducer'

export function useUpdateTvl(): (tvlType: string, tvl: SerializableFraction) => void {
  const { chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (tvlType, tvl) => {
      if (!chainId) return
      dispatch(updateTvl({ chainId, tvlType, tvl }))
    },
    [dispatch, chainId]
  )
}

// returns the current tvl for a given tvl type
export function useTVL(): { [tvlType: string]: StakingTvlDetails } {
  const { chainId } = useActiveWeb3React()

  const state = useSelector<AppState, AppState['stakingTvls']>(state => state.stakingTvls)

  return chainId ? state[chainId] ?? {} : {}
}

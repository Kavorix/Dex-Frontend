import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useActiveWeb3React } from '../../../hooks'
import { AppDispatch, AppState } from '../../index'
import { addStakingPool, SerializableApr } from './actions'
import { StakingPoolDetails } from './reducer'

export function useStakingPoolAdder(): (pid: number, pairAddress?: string, apr?: SerializableApr) => void {
  const { chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (pid, pairAddress, apr) => {
      if (!chainId) return
      dispatch(addStakingPool({ chainId, pid, pairAddress, apr }))
    },
    [dispatch, chainId]
  )
}

// returns all the transactions for the current chain
export function useAllStakingPools(): { [pid: number]: StakingPoolDetails } {
  const { chainId } = useActiveWeb3React()

  const state = useSelector<AppState, AppState['stakingPools']>(state => state.stakingPools)

  return chainId ? state[chainId] ?? {} : {}
}

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useActiveWeb3React } from '../../../hooks'
import { AppDispatch, AppState } from '../../index'
import { updateGovernanceTokenDetails } from './actions'
import { SerializableGovernanceTokenDetails } from '../'
import { GovernanceTokenDetails } from './reducer'

export function useUpdateGovernanceTokenDetails(): (details: SerializableGovernanceTokenDetails) => void {
  const { chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    details => {
      if (!chainId) return
      dispatch(
        updateGovernanceTokenDetails({
          chainId,
          details
        })
      )
    },
    [dispatch, chainId]
  )
}

// returns all the transactions for the current chain
export function useGovernanceTokenDetails(): GovernanceTokenDetails {
  const { chainId } = useActiveWeb3React()

  const state = useSelector<AppState, AppState['governanceTokenDetails']>(state => state.governanceTokenDetails)

  return chainId ? state[chainId] ?? {} : {}
}

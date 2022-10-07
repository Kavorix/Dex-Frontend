import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useActiveWeb3React } from '../../../hooks'
import { AppDispatch, AppState } from '../../index'
import { updateGovernanceTokenUserDetails } from './actions'
import { SerializableGovernanceTokenUserDetails } from '..'
import { GovernanceTokenUserDetails } from './reducer'

export function useUpdateGovernanceTokenUserDetails(): (details: SerializableGovernanceTokenUserDetails) => void {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    details => {
      if (!chainId || !account) return
      dispatch(
        updateGovernanceTokenUserDetails({
          chainId,
          account,
          details
        })
      )
    },
    [dispatch, chainId, account]
  )
}

// returns all the transactions for the current chain
export function useGovernanceTokenUserDetails(): GovernanceTokenUserDetails {
  const { account, chainId } = useActiveWeb3React()

  const state = useSelector<AppState, AppState['governanceTokenUserDetails']>(state => state.governanceTokenUserDetails)

  const chainFilteredState = chainId ? state[chainId] ?? {} : {}
  const accountFilteredState = account ? chainFilteredState[account] ?? {} : {}

  return accountFilteredState
}

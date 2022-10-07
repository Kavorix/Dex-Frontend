import { createReducer } from '@reduxjs/toolkit'
import { updateGovernanceTokenUserDetails } from './actions'
import { SerializableGovernanceTokenUserDetails } from '..'

const currentTimestamp = () => new Date().getTime()

export interface GovernanceTokenUserDetails {
  details?: SerializableGovernanceTokenUserDetails
  timestamp?: number
}

export interface GovernanceUserTokenDetailsState {
  [chainId: number]: {
    [account: string]: GovernanceTokenUserDetails
  }
}

export const initialState: GovernanceUserTokenDetailsState = {}

export default createReducer(initialState, builder =>
  builder.addCase(
    updateGovernanceTokenUserDetails,
    (governanceTokenUserDetails, { payload: { chainId, account, details } }) => {
      if (chainId && account && details) {
        const data = governanceTokenUserDetails[chainId] ?? {}
        const existingDetails = data[account]?.details ?? {}
        data[account] = { details: { ...existingDetails, ...details }, timestamp: currentTimestamp() }
        governanceTokenUserDetails[chainId] = data
      }
    }
  )
)

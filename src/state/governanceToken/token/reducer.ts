import { createReducer } from '@reduxjs/toolkit'
import { updateGovernanceTokenDetails } from './actions'
import { SerializableGovernanceTokenDetails } from '../'

const currentTimestamp = () => new Date().getTime()

export interface GovernanceTokenDetails {
  details?: SerializableGovernanceTokenDetails
  timestamp?: number
}

export interface GovernanceTokenDetailsState {
  [chainId: number]: GovernanceTokenDetails
}

export const initialState: GovernanceTokenDetailsState = {}

export default createReducer(initialState, builder =>
  builder.addCase(updateGovernanceTokenDetails, (governanceTokenDetails, { payload: { chainId, details } }) => {
    if (chainId) {
      let data = governanceTokenDetails[chainId] ?? {}
      const existingDetails = data?.details ?? {}
      data = { details: { ...existingDetails, ...details }, timestamp: currentTimestamp() }
      governanceTokenDetails[chainId] = data
    }
  })
)

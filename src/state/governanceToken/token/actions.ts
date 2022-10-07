import { createAction } from '@reduxjs/toolkit'
import { ChainId } from '@venomswap/sdk'
import { SerializableGovernanceTokenDetails } from '../'

export const updateGovernanceTokenDetails = createAction<{
  chainId: ChainId
  details: SerializableGovernanceTokenDetails
}>('governanceTokenDetails/add')

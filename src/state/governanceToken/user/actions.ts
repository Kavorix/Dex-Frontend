import { createAction } from '@reduxjs/toolkit'
import { ChainId } from '@venomswap/sdk'
import { SerializableGovernanceTokenUserDetails } from '..'

export const updateGovernanceTokenUserDetails = createAction<{
  chainId: ChainId
  account: string
  details: SerializableGovernanceTokenUserDetails
}>('governanceTokenUserDetails/add')

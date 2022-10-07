import { createAction } from '@reduxjs/toolkit'
import { ChainId } from '@venomswap/sdk'

export interface SerializableApr {
  numerator: string | undefined
  denominator: string | undefined
}

export const addStakingPool = createAction<{
  chainId: ChainId
  pid: number
  pairAddress?: string
  apr?: SerializableApr
}>('stakingPools/addStakingPool')

export const clearAllStakingPools = createAction<{ chainId: ChainId }>('stakingPools/clearAllStakingPools')

import { createReducer } from '@reduxjs/toolkit'
import { SerializableFraction } from '../../serialize'
import { updateTvl } from './actions'

const currentTimestamp = () => new Date().getTime()

export interface StakingTvlDetails {
  tvlType: string
  tvl?: SerializableFraction
  timestamp: number
}

export interface StakingTvlState {
  [chainId: number]: {
    [tvlType: string]: StakingTvlDetails
  }
}

export const initialState: StakingTvlState = {}

export default createReducer(initialState, builder =>
  builder.addCase(updateTvl, (stakingTvls, { payload: { chainId, tvlType, tvl } }) => {
    if (chainId && tvlType && tvl) {
      const data = stakingTvls[chainId] ?? {}
      data[tvlType] = { tvlType, tvl, timestamp: currentTimestamp() }
      stakingTvls[chainId] = data
    }
  })
)

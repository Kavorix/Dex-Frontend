import { createReducer } from '@reduxjs/toolkit'
import { addStakingPool, clearAllStakingPools, SerializableApr } from './actions'

const now = () => new Date().getTime()

export interface StakingPoolDetails {
  pid: number
  pairAddress?: string
  apr?: SerializableApr
  addedTime: number
}

export interface StakingPoolState {
  [chainId: number]: {
    [pid: number]: StakingPoolDetails
  }
}

export const initialState: StakingPoolState = {}

export default createReducer(initialState, builder =>
  builder
    .addCase(addStakingPool, (stakingPools, { payload: { chainId, pid, pairAddress, apr } }) => {
      if (chainId && pid && pairAddress && apr) {
        const pools = stakingPools[chainId] ?? {}
        pools[pid] = { pid, pairAddress, apr, addedTime: now() }
        stakingPools[chainId] = pools
      }
    })
    .addCase(clearAllStakingPools, (stakingPools, { payload: { chainId } }) => {
      if (!stakingPools[chainId]) return
      stakingPools[chainId] = {}
    })
)

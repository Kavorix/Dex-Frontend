import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'

import application from './application/reducer'
import { updateVersion } from './global/actions'
import user from './user/reducer'
import transactions from './transactions/reducer'
import swap from './swap/reducer'
import mint from './mint/reducer'
import lists from './lists/reducer'
import burn from './burn/reducer'
import multicall from './multicall/reducer'
import stakingPools from './staking/pools/reducer'
import stakingTvls from './staking/tvl/reducer'
import governanceTokenDetails from './governanceToken/token/reducer'
import governanceTokenUserDetails from './governanceToken/user/reducer'

const PERSISTED_KEYS: string[] = [
  'user',
  'transactions',
  'lists',
  'stakingTvls',
  'governanceTokenDetails',
  'governanceTokenUserDetails'
]

const store = configureStore({
  reducer: {
    application,
    user,
    transactions,
    swap,
    mint,
    burn,
    multicall,
    lists,
    stakingPools,
    stakingTvls,
    governanceTokenDetails,
    governanceTokenUserDetails
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), save({ states: PERSISTED_KEYS })],
  preloadedState: load({ states: PERSISTED_KEYS })
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

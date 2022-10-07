import { ChainId } from '@venomswap/sdk'
import { PitInfo } from '../types'
import { HARMONY_MAINNET_PIT_POOLS } from './harmony/mainnet'
import { HARMONY_TESTNET_PIT_POOLS } from './harmony/testnet'
import { BSC_MAINNET_PIT_POOLS } from './bsc/mainnet'
import { BSC_TESTNET_PIT_POOLS } from './bsc/testnet'

export const PIT_POOLS: {
  [chainId in ChainId]?: PitInfo[]
} = {
  [ChainId.HARMONY_MAINNET]: HARMONY_MAINNET_PIT_POOLS,
  [ChainId.HARMONY_TESTNET]: HARMONY_TESTNET_PIT_POOLS,
  [ChainId.BSC_MAINNET]: BSC_MAINNET_PIT_POOLS,
  [ChainId.BSC_TESTNET]: BSC_TESTNET_PIT_POOLS
}

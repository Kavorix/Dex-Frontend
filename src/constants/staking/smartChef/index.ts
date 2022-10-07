import { ChainId } from '@venomswap/sdk'
import { SmartChefPoolInfo } from '../types'
import { HARMONY_MAINNET_SMART_CHEF_POOLS } from './harmony/mainnet'
import { HARMONY_TESTNET_SMART_CHEF_POOLS } from './harmony/testnet'
import { BSC_MAINNET_SMART_CHEF_POOLS } from './bsc/mainnet'
import { BSC_TESTNET_SMART_CHEF_POOLS } from './bsc/testnet'

export const SMART_CHEF_POOL_INFOS: {
  [chainId in ChainId]?: Record<string, SmartChefPoolInfo[]>
} = {
  [ChainId.HARMONY_MAINNET]: HARMONY_MAINNET_SMART_CHEF_POOLS,
  [ChainId.HARMONY_TESTNET]: HARMONY_TESTNET_SMART_CHEF_POOLS,
  [ChainId.BSC_MAINNET]: BSC_MAINNET_SMART_CHEF_POOLS,
  [ChainId.BSC_TESTNET]: BSC_TESTNET_SMART_CHEF_POOLS
}

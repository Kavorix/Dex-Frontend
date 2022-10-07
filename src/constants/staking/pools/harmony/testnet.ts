import { ChainId, Pair } from '@venomswap/sdk'
import getPairTokensWithDefaults from '../../../../utils/getPairTokensWithDefaults'
import { DefaultStakingPoolInfo } from '../../types'

export const HARMONY_TESTNET_POOLS: DefaultStakingPoolInfo[] = [
  {
    pid: 0,
    order: 0,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/1BUSD'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/1BUSD')),
    allocPoints: 1000,
    active: true
  },
  {
    pid: 1,
    order: 1,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/VIPER')),
    allocPoints: 1000,
    active: true
  },
  {
    pid: 2,
    order: 2,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/1ETH'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/1ETH')),
    allocPoints: 1000,
    active: true
  },
  {
    pid: 3,
    order: 3,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, '1BUSD/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, '1BUSD/VIPER')),
    allocPoints: 1000,
    active: true
  },
  {
    pid: 4,
    order: 4,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'xVIPER/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'xVIPER/VIPER')),
    allocPoints: 1000,
    active: true
  },
  {
    pid: 5,
    order: 5,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/xVIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/xVIPER')),
    allocPoints: 1000,
    active: true
  }
]

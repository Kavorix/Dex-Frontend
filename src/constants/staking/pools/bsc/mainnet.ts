import { ChainId, Pair } from '@venomswap/sdk'
import getPairTokensWithDefaults from '../../../../utils/getPairTokensWithDefaults'
import getTokenWithDefault from '../../../../utils/getTokenWithDefault'
import { DefaultStakingPoolInfo } from '../../types'

export const BSC_MAINNET_POOLS: DefaultStakingPoolInfo[] = [
  {
    pid: 0,
    order: 99,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'WBNB/BUSD'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'WBNB/BUSD')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 1,
    order: 1,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/BUSD'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/BUSD')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 2,
    order: 100,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/WBNB'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/WBNB')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 3,
    order: 98,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/1VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/1VIPER')),
    bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, '1VIPER'),
    allocPoints: 0,
    active: false
  },
  {
    pid: 4,
    order: 4,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'xCOBRA/WBNB'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'xCOBRA/WBNB')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 5,
    order: 5,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/BTCB'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/BTCB')),
    bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'BTCB'),
    allocPoints: 0,
    active: false
  },
  {
    pid: 6,
    order: 6,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/ETH'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/ETH')),
    bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'ETH'),
    allocPoints: 0,
    active: false
  },
  {
    pid: 7,
    order: 7,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/CAKE'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/CAKE')),
    bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'CAKE'),
    allocPoints: 0,
    active: false
  },
  {
    pid: 8,
    order: 8,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/XVS'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/XVS')),
    bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'XVS'),
    allocPoints: 0,
    active: false
  },
  {
    pid: 9,
    order: 9,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/ADA'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/ADA')),
    bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'ADA'),
    allocPoints: 0,
    active: false
  },
  {
    pid: 10,
    order: 10,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/DOT'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/DOT')),
    bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'DOT'),
    allocPoints: 0,
    active: false
  },
  {
    pid: 11,
    order: 11,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/SXP'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/SXP')),
    bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'SXP'),
    allocPoints: 0,
    active: false
  },
  {
    pid: 12,
    order: 12,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/ALPACA'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/ALPACA')),
    bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'ALPACA'),
    allocPoints: 0,
    active: false
  },
  {
    pid: 13,
    order: 13,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/BAKE'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/BAKE')),
    bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'BAKE'),
    allocPoints: 0,
    active: false
  },
  {
    pid: 14,
    order: 14,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/EPS'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/EPS')),
    bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'EPS'),
    allocPoints: 0,
    active: false
  },
  {
    pid: 15,
    order: 15,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/LINK'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/LINK')),
    bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'LINK'),
    allocPoints: 0,
    active: false
  },
  {
    pid: 16,
    order: 16,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/XRP'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/XRP')),
    bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'XRP'),
    allocPoints: 0,
    active: false
  }
]

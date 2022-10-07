import { ChainId, Pair } from '@venomswap/sdk'
import getPairTokensWithDefaults from '../../../../utils/getPairTokensWithDefaults'
import { DefaultStakingPoolInfo } from '../../types'

export const BSC_TESTNET_POOLS: DefaultStakingPoolInfo[] = [
  {
    pid: 0,
    order: 0,
    tokens: getPairTokensWithDefaults(ChainId.BSC_TESTNET, 'WBNB/BUSD'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_TESTNET, 'WBNB/BUSD')),
    allocPoints: 5,
    active: true
  },
  {
    pid: 1,
    order: 1,
    tokens: getPairTokensWithDefaults(ChainId.BSC_TESTNET, 'COBRA/BUSD'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_TESTNET, 'COBRA/BUSD')),
    allocPoints: 5,
    active: true
  },
  {
    pid: 2,
    order: 2,
    tokens: getPairTokensWithDefaults(ChainId.BSC_TESTNET, 'COBRA/WBNB'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.BSC_TESTNET, 'COBRA/WBNB')),
    allocPoints: 55,
    active: true
  }
]

import { ChainId } from '@venomswap/sdk'
import getPairTokensWithDefaults from '../../../../utils/getPairTokensWithDefaults'
import { PitInfo } from '../../types'

export const BSC_MAINNET_PIT_POOLS: PitInfo[] = [
  {
    pid: 0,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'WBNB/BUSD')
  },
  {
    pid: 1,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/BUSD')
  },
  {
    pid: 2,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/WBNB')
  },
  {
    pid: 3,
    tokens: getPairTokensWithDefaults(ChainId.BSC_MAINNET, 'COBRA/1VIPER')
  }
]

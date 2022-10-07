import { ChainId } from '@venomswap/sdk'
import getPairTokensWithDefaults from '../../../../utils/getPairTokensWithDefaults'
import { PitInfo } from '../../types'

export const HARMONY_TESTNET_PIT_POOLS: PitInfo[] = [
  {
    pid: 0,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/BUSD')
  }
]

import { Blockchain } from '@venomswap/sdk'
import { getBlockchain } from '../utils/blockchain'
import { NETWORK_CHAIN_ID } from '../connectors'

export default function useBlockchainFromEnv(): Blockchain {
  return getBlockchain(NETWORK_CHAIN_ID)
}

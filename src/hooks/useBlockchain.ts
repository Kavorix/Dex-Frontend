import { Blockchain } from '@venomswap/sdk'
import { getBlockchain } from '../utils/blockchain'
import { useActiveWeb3React } from './index'

export default function useBlockchain(): Blockchain {
  const { chainId } = useActiveWeb3React()
  return getBlockchain(chainId)
}

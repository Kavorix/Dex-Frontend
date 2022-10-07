import { useMemo } from 'react'
import { Token, ChainId } from '@venomswap/sdk'
import { useActiveWeb3React } from '..'
import getToken from '../../utils/getToken'

/**
 * Returns the token given a specific symbol
 * @param symbol ticker for a given token
 */
export default function useToken(symbol = 'BUSD'): Token | undefined {
  const { chainId } = useActiveWeb3React()
  if (symbol === 'BUSD' && chainId === ChainId.HARMONY_TESTNET) {
    symbol = '1BUSD'
  }

  return useMemo<Token | undefined>(() => {
    return getToken(chainId, symbol)
  }, [chainId, symbol])
}

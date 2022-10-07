import { ChainId, WETH, Token } from '@venomswap/sdk'

export default function normalizeWethToken(chainId: ChainId, token: Token | undefined): Token | undefined {
  if (token === undefined) return undefined
  const weth = chainId && WETH[chainId]
  if (token == weth) {
    switch (chainId) {
      case ChainId.BSC_MAINNET:
      case ChainId.BSC_TESTNET:
        return new Token(chainId, token.address, token.decimals, 'BNB', 'Binance Coin')
      case ChainId.HARMONY_MAINNET:
      case ChainId.HARMONY_TESTNET:
        return new Token(chainId, token.address, token.decimals, 'ONE', 'Harmony')
      default:
        return token
    }
  }

  return token
}

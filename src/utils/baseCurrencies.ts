import { ChainId, Currency, ETHER, HARMONY, BINANCE_COIN, WETH, GOVERNANCE_TOKENS } from '@venomswap/sdk'
import { NETWORK_CHAIN_ID } from '../connectors'

export default function baseCurrencies(chainId: ChainId | undefined): Currency[] {
  const currencies: Currency[] = []

  if (chainId) {
    switch (chainId) {
      case ChainId.BSC_MAINNET:
      case ChainId.BSC_TESTNET:
        currencies.push(BINANCE_COIN)
        currencies.push(WETH[chainId])
        currencies.push(GOVERNANCE_TOKENS[chainId])
        break
      case ChainId.HARMONY_MAINNET:
      case ChainId.HARMONY_TESTNET:
        currencies.push(HARMONY)
        currencies.push(WETH[chainId])
        currencies.push(GOVERNANCE_TOKENS[chainId])
        break
      default:
        currencies.push(ETHER)
        currencies.push(WETH[chainId])
        break
    }
  } else {
    currencies.push(ETHER)
    currencies.push(WETH[NETWORK_CHAIN_ID as ChainId])
  }

  return currencies
}

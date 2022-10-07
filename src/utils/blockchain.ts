import { Blockchain, ChainId, Currency, ETHER, BINANCE_COIN, HARMONY } from '@venomswap/sdk'

export function getBlockchain(chainId: ChainId | undefined): Blockchain {
  switch (chainId) {
    case ChainId.MAINNET:
    case ChainId.ROPSTEN:
    case ChainId.RINKEBY:
    case ChainId.GÖRLI:
    case ChainId.KOVAN:
      return Blockchain.ETHEREUM
    case ChainId.BSC_MAINNET:
    case ChainId.BSC_TESTNET:
      return Blockchain.BINANCE_SMART_CHAIN
    case ChainId.HARMONY_MAINNET:
    case ChainId.HARMONY_TESTNET:
      return Blockchain.HARMONY
    default:
      return Blockchain.ETHEREUM
  }
}

export function getBlockchainAdjustedCurrency(
  blockchain: Blockchain,
  currency: Currency | undefined
): Currency | undefined {
  if (!currency) return currency
  if (currency !== ETHER) return currency
  switch (blockchain) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return BINANCE_COIN
    case Blockchain.HARMONY:
      return HARMONY
    default:
      return ETHER
  }
}

// Returns the block time in seconds
export function getBlockchainBlockTime(blockchain: Blockchain): number {
  switch (blockchain) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return 3
    case Blockchain.HARMONY:
      return 2
    default:
      return 13
  }
}

export function getBlockchainName(chainId: ChainId | undefined): string {
  switch (chainId) {
    case ChainId.MAINNET:
    case ChainId.ROPSTEN:
    case ChainId.RINKEBY:
    case ChainId.GÖRLI:
    case ChainId.KOVAN:
      return 'Ethereum'
    case ChainId.BSC_MAINNET:
    case ChainId.BSC_TESTNET:
      return 'Binance Smart Chain'
    case ChainId.HARMONY_MAINNET:
    case ChainId.HARMONY_TESTNET:
      return 'Harmony'
    default:
      return 'Ethereum'
  }
}

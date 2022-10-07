import { ChainId } from '@venomswap/sdk'
import normalizeWethToken from '../normalizeWethToken'

const REGEX_PATTERN = /(?<token0>[\da-z]{2,10})[\-\/](?<token1>[\da-z]{2,10})/gi

function isTokenMatching(searchToken0: any, searchToken1: any, searchInput: string): boolean {
  if (searchToken0 && searchToken1) {
    if (searchInput.toLowerCase().includes('-') || searchInput.toLowerCase().includes('/')) {
      const match = REGEX_PATTERN.exec(searchInput.toLowerCase())
      if (match && match.groups) {
        if (
          (searchToken0.symbol?.toLowerCase().includes(match.groups.token0) &&
            searchToken1.symbol?.toLowerCase().includes(match.groups.token1)) ||
          (searchToken0.symbol?.toLowerCase().includes(match.groups.token1) &&
            searchToken1.symbol?.toLowerCase().includes(match.groups.token0))
        ) {
          return true
        }
      }
    } else {
      if (
        searchToken0.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
        searchToken0.symbol?.toLowerCase().includes(searchInput.toLowerCase()) ||
        searchToken1.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
        searchToken1.symbol?.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return true
      }
    }
  }

  return false
}

function sortSearchResults(searchResults: any[]): any[] {
  return searchResults?.sort((a, b) => {
    if (a.pid === undefined || b.pid === undefined) {
      return 0
    }
    return b.pid > a.pid ? 1 : -1
  })
}

export function performTokenSearch(
  chainId: ChainId | undefined,
  pools: any,
  tokenKey: string,
  searchInput: string
): any[] {
  const searchResults: any[] = []

  for (let i = 0; i < pools.length; i++) {
    const searchToken0 = chainId ? normalizeWethToken(chainId, pools[i][tokenKey]?.[0]) : pools[i][tokenKey]?.[0]
    const searchToken1 = chainId ? normalizeWethToken(chainId, pools[i][tokenKey]?.[1]) : pools[i][tokenKey]?.[1]

    if (isTokenMatching(searchToken0, searchToken1, searchInput)) {
      searchResults.push(pools[i])
    }
  }

  return sortSearchResults(searchResults)
}

export function performAlternativeTokenSearch(
  chainId: ChainId | undefined,
  pools: any,
  token0Key: string,
  token1Key: string,
  searchInput: string
): any[] {
  const searchResults: any[] = []

  for (let i = 0; i < pools.length; i++) {
    const searchToken0 = chainId ? normalizeWethToken(chainId, pools[i][token0Key]) : pools[i][token0Key]
    const searchToken1 = chainId ? normalizeWethToken(chainId, pools[i][token1Key]) : pools[i][token1Key]

    if (isTokenMatching(searchToken0, searchToken1, searchInput)) {
      searchResults.push(pools[i])
    }
  }

  return sortSearchResults(searchResults)
}

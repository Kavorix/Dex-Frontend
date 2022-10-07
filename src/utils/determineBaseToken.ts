import { Token, DEFAULT_CURRENCIES } from '@venomswap/sdk'
import { unwrappedToken } from './wrappedCurrency'

export default function determineBaseToken(tokenData: Record<string, any>, tokens: [Token, Token]): Token | undefined {
  const currency0 = unwrappedToken(tokens[0])
  const currency1 = unwrappedToken(tokens[1])

  //const baseToken = currency0 && DEFAULT_CURRENCIES.includes(currency0) ? token0 : token1

  let baseToken: Token | undefined = tokenData?.WETH?.token

  if (DEFAULT_CURRENCIES.includes(currency0) || DEFAULT_CURRENCIES.includes(currency1)) {
    baseToken = tokenData?.WETH?.token
  } else if (
    tokens[0]?.symbol?.toUpperCase() === tokenData?.govToken?.token?.symbol?.toUpperCase() ||
    tokens[1]?.symbol?.toUpperCase() === tokenData?.govToken?.token?.symbol?.toUpperCase()
  ) {
    baseToken = tokenData?.govToken?.token
  } else if (
    tokens[0]?.symbol?.toUpperCase() === tokenData?.pitToken?.token?.symbol?.toUpperCase() ||
    tokens[1]?.symbol?.toUpperCase() === tokenData?.pitToken?.token?.symbol?.toUpperCase()
  ) {
    baseToken = tokenData?.pitToken?.token
  } else if (
    tokens[0]?.symbol?.toUpperCase() === tokenData?.BUSD?.token?.symbol?.toUpperCase() ||
    tokens[1]?.symbol?.toUpperCase() === tokenData?.BUSD?.token?.symbol?.toUpperCase()
  ) {
    baseToken = tokenData?.BUSD?.token
  } else if (
    tokens[0]?.symbol?.toUpperCase() === tokenData?.USDC?.token?.symbol?.toUpperCase() ||
    tokens[1]?.symbol?.toUpperCase() === tokenData?.USDC?.token?.symbol?.toUpperCase()
  ) {
    baseToken = tokenData?.USDC?.token
  } else if (
    tokens[0]?.symbol?.toUpperCase() === tokenData?.DAI?.token?.symbol?.toUpperCase() ||
    tokens[1]?.symbol?.toUpperCase() === tokenData?.DAI?.token?.symbol?.toUpperCase()
  ) {
    baseToken = tokenData?.DAI?.token
  } else if (
    tokens[0]?.symbol?.toUpperCase() === tokenData?.ONEUSD?.token?.symbol?.toUpperCase() ||
    tokens[1]?.symbol?.toUpperCase() === tokenData?.ONEUSD?.token?.symbol?.toUpperCase()
  ) {
    baseToken = tokenData?.ONEUSD?.token
  } else if (
    tokens[0]?.symbol?.toUpperCase() === tokenData?.bscBUSD?.token?.symbol?.toUpperCase() ||
    tokens[1]?.symbol?.toUpperCase() === tokenData?.bscBUSD?.token?.symbol?.toUpperCase()
  ) {
    baseToken = tokenData?.bscBUSD?.token
  } else if (
    tokens[0]?.symbol?.toUpperCase() === tokenData?.bridgedETH?.token?.symbol?.toUpperCase() ||
    tokens[1]?.symbol?.toUpperCase() === tokenData?.bridgedETH?.token?.symbol?.toUpperCase()
  ) {
    baseToken = tokenData?.bridgedETH?.token
  } else if (
    tokens[0]?.symbol?.toUpperCase() === tokenData?.bridgedBTC?.token?.symbol?.toUpperCase() ||
    tokens[1]?.symbol?.toUpperCase() === tokenData?.bridgedBTC?.token?.symbol?.toUpperCase()
  ) {
    baseToken = tokenData?.bridgedBTC?.token
  } else if (
    tokens[0]?.symbol?.toUpperCase() === tokenData?.bridgedVIPER?.token?.symbol?.toUpperCase() ||
    tokens[1]?.symbol?.toUpperCase() === tokenData?.bridgedVIPER?.token?.symbol?.toUpperCase()
  ) {
    baseToken = tokenData?.bridgedVIPER?.token
  }

  return baseToken
}

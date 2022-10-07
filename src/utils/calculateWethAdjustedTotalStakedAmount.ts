import { Token, TokenAmount, Fraction, ChainId } from '@venomswap/sdk'
import { wrappedCurrency } from './wrappedCurrency'
import calculateTotalStakedAmount from './calculateTotalStakedAmount'
import getPair from './getPair'
import { Result } from 'state/multicall/hooks'
import adjustFraction from 'utils/adjustFraction'

function pairCurrencyAmountInWeth(
  baseToken: Token | undefined,
  matchingToken: Token | undefined,
  tokens: Record<string, any>,
  valueOfTotalStakedAmountInPairCurrency: TokenAmount
): TokenAmount | Fraction | undefined {
  if (!baseToken) return valueOfTotalStakedAmountInPairCurrency
  const matchingTokenDecimals = matchingToken ? matchingToken.decimals : 18

  // Special case: both tokens are non-18 decimal tokens
  if (baseToken.symbol?.toUpperCase() === '1USDC' && matchingToken?.symbol?.toUpperCase() === 'ONEUSD') {
    return adjustFraction(valueOfTotalStakedAmountInPairCurrency.multiply(tokens?.USDC?.price), 6)
  }

  switch (baseToken.symbol?.toUpperCase()) {
    case tokens?.WETH?.token?.symbol?.toUpperCase():
      return valueOfTotalStakedAmountInPairCurrency
    case tokens?.govToken?.token?.symbol?.toUpperCase():
      return tokens?.govToken?.price
        ? valueOfTotalStakedAmountInPairCurrency.multiply(tokens?.govToken?.price)
        : valueOfTotalStakedAmountInPairCurrency
    case tokens?.pitToken?.token?.symbol?.toUpperCase():
      return tokens?.pitToken?.price
        ? valueOfTotalStakedAmountInPairCurrency.multiply(tokens?.pitToken?.price)
        : valueOfTotalStakedAmountInPairCurrency

    // Bridged ETH stables
    case tokens?.BUSD?.token?.symbol?.toUpperCase():
      return tokens?.BUSD?.price
        ? valueOfTotalStakedAmountInPairCurrency.multiply(tokens?.BUSD?.price)
        : valueOfTotalStakedAmountInPairCurrency
    case tokens?.USDC?.token?.symbol?.toUpperCase():
      return tokens?.USDC?.price
        ? valueOfTotalStakedAmountInPairCurrency.multiply(tokens?.USDC?.price)
        : valueOfTotalStakedAmountInPairCurrency
    case tokens?.DAI?.token?.symbol?.toUpperCase():
      return tokens?.DAI?.price
        ? valueOfTotalStakedAmountInPairCurrency.multiply(tokens?.DAI?.price)
        : valueOfTotalStakedAmountInPairCurrency

    // Bridged BSC stables
    case tokens?.bscBUSD?.token?.symbol?.toUpperCase():
      return tokens?.bscBUSD?.price
        ? valueOfTotalStakedAmountInPairCurrency.multiply(tokens?.bscBUSD?.price)
        : valueOfTotalStakedAmountInPairCurrency
    case tokens?.bscUSDC?.token?.symbol?.toUpperCase():
      return tokens?.bscUSDC?.price
        ? adjustFraction(valueOfTotalStakedAmountInPairCurrency.multiply(tokens?.bscUSDC?.price), matchingTokenDecimals)
        : valueOfTotalStakedAmountInPairCurrency
    case tokens?.bscDAI?.token?.symbol?.toUpperCase():
      return tokens?.bscDAI?.price
        ? valueOfTotalStakedAmountInPairCurrency.multiply(tokens?.bscDAI?.price)
        : valueOfTotalStakedAmountInPairCurrency

    // Bridged ETH & BTC from Ethereum & BSC
    case tokens?.bridgedETH?.token?.symbol?.toUpperCase():
      return tokens?.bridgedETH?.price
        ? valueOfTotalStakedAmountInPairCurrency.multiply(tokens?.bridgedETH?.price)
        : valueOfTotalStakedAmountInPairCurrency
    case tokens?.bridgedBscETH?.token?.symbol?.toUpperCase():
      return tokens?.bridgedBscETH?.price
        ? valueOfTotalStakedAmountInPairCurrency.multiply(tokens?.bridgedBscETH?.price)
        : valueOfTotalStakedAmountInPairCurrency
    case tokens?.bridgedBTC?.token?.symbol?.toUpperCase():
      return tokens?.bridgedBTC?.price
        ? valueOfTotalStakedAmountInPairCurrency.multiply(tokens?.bridgedBTC?.price)
        : valueOfTotalStakedAmountInPairCurrency
    case tokens?.bridgedBscBTC?.token?.symbol?.toUpperCase():
      return tokens?.bridgedBscBTC?.price
        ? adjustFraction(
            valueOfTotalStakedAmountInPairCurrency.multiply(tokens?.bridgedBscBTC?.price),
            matchingTokenDecimals
          )
        : valueOfTotalStakedAmountInPairCurrency

    default:
      return valueOfTotalStakedAmountInPairCurrency
  }
}

export default function calculateWethAdjustedTotalStakedAmount(
  chainId: ChainId,
  baseToken: Token | undefined,
  tokenData: Record<string, any>,
  tokens: [Token, Token],
  totalLpTokenSupply: TokenAmount,
  totalStakedAmount: TokenAmount,
  lpTokenReserves: Result | undefined
): TokenAmount | Fraction | undefined {
  if (!baseToken || !lpTokenReserves || !totalLpTokenSupply) return undefined

  const matchingToken = tokens[0] === baseToken ? tokens[1] : tokens[0]

  const reserve0 = lpTokenReserves?.reserve0
  const reserve1 = lpTokenReserves?.reserve1

  const stakingTokenPair = getPair(
    wrappedCurrency(tokens[0], chainId),
    wrappedCurrency(tokens[1], chainId),
    reserve0,
    reserve1
  )
  if (!stakingTokenPair) return undefined

  const valueOfTotalStakedAmountInPairCurrency = calculateTotalStakedAmount(
    baseToken,
    stakingTokenPair,
    totalStakedAmount,
    totalLpTokenSupply
  )
  if (!valueOfTotalStakedAmountInPairCurrency) return undefined

  const amountInWeth = pairCurrencyAmountInWeth(
    baseToken,
    matchingToken,
    tokenData,
    valueOfTotalStakedAmountInPairCurrency
  )

  return amountInWeth
}

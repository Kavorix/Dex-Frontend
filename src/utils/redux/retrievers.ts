import { JSBI, Token, CurrencyAmount, TokenAmount, Fraction, Price } from '@venomswap/sdk'
import { SerializableFraction } from '../../state/serialize'

const MAX_DURATION = 86400000 // 1 day in milliseconds

function now(): number {
  return new Date().getTime()
}

function recentlyStored(timestamp?: number, maxDuration = MAX_DURATION): boolean {
  return timestamp === undefined || (timestamp !== undefined && now() - timestamp <= maxDuration)
}

export function retrieveETHAmount(
  currentValue: CurrencyAmount | undefined,
  storedValue: string | undefined,
  timestamp?: number,
  maxDuration = MAX_DURATION
): CurrencyAmount | undefined {
  if (currentValue !== undefined) return currentValue
  return storedValue && recentlyStored(timestamp, maxDuration)
    ? CurrencyAmount.ether(JSBI.BigInt(storedValue))
    : undefined
}

export function retrieveTokenAmount(
  token: Token | undefined,
  currentValue: TokenAmount | undefined,
  storedValue: string | undefined,
  timestamp?: number,
  maxDuration = MAX_DURATION
): TokenAmount | undefined {
  if (!token) return undefined
  if (currentValue !== undefined) return currentValue
  return storedValue && recentlyStored(timestamp, maxDuration)
    ? new TokenAmount(token, JSBI.BigInt(storedValue))
    : undefined
}

export function retrieveFraction(
  currentValue: Fraction | undefined,
  storedValue: SerializableFraction | undefined,
  timestamp?: number,
  maxDuration = MAX_DURATION
): Fraction | undefined {
  if (currentValue !== undefined) return currentValue
  return storedValue && storedValue.numerator && storedValue.denominator && recentlyStored(timestamp, maxDuration)
    ? new Fraction(storedValue.numerator, storedValue.denominator)
    : undefined
}

export function retrievePrice(
  baseCurrency: Token | undefined,
  quoteCurrency: Token | undefined,
  currentValue: Price | undefined,
  storedValue: SerializableFraction | undefined,
  timestamp?: number,
  maxDuration = MAX_DURATION
): Price | undefined {
  if (!baseCurrency || !quoteCurrency) return undefined
  if (currentValue !== undefined) return currentValue
  return storedValue && storedValue.numerator && storedValue.denominator && recentlyStored(timestamp, maxDuration)
    ? new Price(baseCurrency, quoteCurrency, storedValue.denominator, storedValue.numerator)
    : undefined
}

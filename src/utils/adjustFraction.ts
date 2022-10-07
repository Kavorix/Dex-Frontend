import { utils } from 'ethers'
import { Fraction } from '@venomswap/sdk'

export default function adjustFraction(fraction: Fraction, decimals = 18): Fraction {
  if (decimals === 18) return fraction

  const padded = String(1).padStart(decimals, '0')
  const divisorString = `0.${padded}`
  const parsed = utils.parseEther(divisorString)

  return fraction.divide(parsed.toString())
}

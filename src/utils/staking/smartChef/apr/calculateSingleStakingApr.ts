import { Price, Fraction, TokenAmount, JSBI } from '@venomswap/sdk'
import { utils } from 'ethers'

export default function calculateSingleStakingApr(
  rewardTokenUsdPrice: Price | undefined,
  rewardPerBlock: TokenAmount | undefined,
  blocksForPeriod: JSBI,
  valueOfTotalStakedAmountInUSD: TokenAmount | Fraction
): Fraction | undefined {
  if (rewardPerBlock === undefined) return undefined

  const multiplied = rewardTokenUsdPrice?.raw.multiply(rewardPerBlock.raw).multiply(blocksForPeriod.toString())
  let apr: Fraction | undefined

  if (multiplied && valueOfTotalStakedAmountInUSD.greaterThan('0')) {
    if (valueOfTotalStakedAmountInUSD instanceof TokenAmount) {
      apr = multiplied.divide(valueOfTotalStakedAmountInUSD?.raw)
    } else {
      // Somehow a Fraction/Fraction division has to be further divided by 1 ETH to get the correct number?
      apr = multiplied.divide(valueOfTotalStakedAmountInUSD).divide(utils.parseEther('1').toString())
    }

    return apr
  }

  return new Fraction(JSBI.BigInt(0), JSBI.BigInt(1))
}

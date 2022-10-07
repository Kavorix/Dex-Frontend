import { Price, Fraction, TokenAmount, JSBI } from '@venomswap/sdk'
import { utils } from 'ethers'

export default function calculateLpStakingApr(
  rewardTokenWethPrice: Price | undefined,
  rewardPerBlock: TokenAmount,
  blocksPerYear: JSBI,
  valueOfTotalStakedAmountInWeth: TokenAmount | Fraction
): Fraction | undefined {
  const multiplied = rewardTokenWethPrice?.raw.multiply(rewardPerBlock.raw).multiply(blocksPerYear.toString())

  let apr: Fraction | undefined

  if (multiplied && valueOfTotalStakedAmountInWeth.greaterThan('0')) {
    if (valueOfTotalStakedAmountInWeth instanceof TokenAmount) {
      apr = multiplied.divide(valueOfTotalStakedAmountInWeth?.raw)
    } else {
      // Somehow a Fraction/Fraction division has to be further divided by 1 ETH to get the correct number?
      apr = multiplied.divide(valueOfTotalStakedAmountInWeth).divide(utils.parseEther('1').toString())
    }

    return apr
  }

  return new Fraction(JSBI.BigInt(0), JSBI.BigInt(1))
}

import { Token, TokenAmount, Pair, JSBI } from '@venomswap/sdk'

export default function calculateTotalStakedAmount(
  baseToken: Token,
  stakingTokenPair: Pair,
  totalStakedAmount: TokenAmount,
  totalLpTokenSupply: TokenAmount
): TokenAmount {
  // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
  return new TokenAmount(
    baseToken,
    JSBI.divide(
      JSBI.multiply(
        JSBI.multiply(totalStakedAmount.raw, stakingTokenPair.reserveOf(baseToken).raw),
        JSBI.BigInt(2) // this is b/c the value of LP shares are ~double the value of the WETH they entitle owner to
      ),
      totalLpTokenSupply.raw
    )
  )
}

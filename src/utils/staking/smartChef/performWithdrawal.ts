import { Contract } from 'ethers'
import { CallOverrides } from '@ethersproject/contracts'
import { TransactionResponse } from '@ethersproject/providers'
import { Blockchain, CurrencyAmount } from '@venomswap/sdk'
import { calculateGasMargin } from '../..'
import { SmartChefStakingPool } from '../../../state/stake/types'

export async function performWithdrawal(
  blockchain: Blockchain,
  smartChef: Contract,
  stakingInfo: SmartChefStakingPool,
  parsedAmount: CurrencyAmount | undefined
): Promise<TransactionResponse> {
  const formattedAmount = `0x${parsedAmount?.raw.toString(16)}`

  const normalWithdrawal = stakingInfo.withdrawalMethod === 'withdraw'

  const estimatedGas = normalWithdrawal
    ? await smartChef.estimateGas.withdraw(formattedAmount)
    : await smartChef.estimateGas.emergencyWithdraw()

  const callOptions: CallOverrides = {
    gasLimit: calculateGasMargin(estimatedGas)
  }

  return normalWithdrawal
    ? await smartChef.withdraw(formattedAmount, callOptions)
    : await smartChef.emergencyWithdraw(callOptions)
}

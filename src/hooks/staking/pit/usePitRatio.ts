import { useMemo } from 'react'
import { Fraction } from '@venomswap/sdk'

import { utils } from 'ethers'
import usePitToken from '../../tokens/usePitToken'
import { useTokenBalance } from '../../../state/wallet/hooks'
import useGovernanceToken from '../../tokens/useGovernanceToken'
import { useTotalSupply } from '../../../data/TotalSupply'

export default function usePitRatio(): Fraction | undefined {
  const govToken = useGovernanceToken()
  const pit = usePitToken()
  const pitTotalSupply = useTotalSupply(pit)
  const pitGovTokenBalance = useTokenBalance(pit?.address, govToken)
  const multiplier = utils.parseEther('1').toString()

  return useMemo(() => {
    return pitGovTokenBalance &&
      pitGovTokenBalance.greaterThan('0') &&
      pitTotalSupply &&
      pitTotalSupply.greaterThan('0')
      ? pitGovTokenBalance?.divide(pitTotalSupply?.raw.toString()).multiply(multiplier)
      : undefined
  }, [govToken, pit, pitTotalSupply, pitGovTokenBalance])
}

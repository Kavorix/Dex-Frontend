import { useState, useEffect } from 'react'
import { TokenAmount, Fraction, Price } from '@venomswap/sdk'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import useBUSDPrice from '../useBUSDPrice'
import usePitToken from '../tokens/usePitToken'
import useToken from '../tokens/useToken'
import { ZERO_FRACTION } from '../../constants'
import { GOVERNANCE_TOKEN_INTERFACE } from '../../constants/abis/governanceToken'
import useGovernanceToken from '../tokens/useGovernanceToken'
import { useUpdateTvl, useTVL } from '../../state/staking/tvl/hooks'
import { useBlockNumber } from '../../state/application/hooks'
import { useGovernanceTokenDetails } from '../../state/governanceToken/token/hooks'
import { retrievePrice, retrieveTokenAmount } from '../../utils/redux/retrievers'
import { SerializableGovernanceTokenDetails } from '../../state/governanceToken'

type TokenDetailsPersisterFunction = (details: SerializableGovernanceTokenDetails) => void

export function persistTokenDetails(
  adder: TokenDetailsPersisterFunction,
  usdPrice: Price | undefined,
  totalSupplyInPit: TokenAmount | undefined
) {
  let shouldPersist = false
  const persistDetails: SerializableGovernanceTokenDetails = {}

  if (usdPrice !== undefined) {
    persistDetails.usdPrice = {
      numerator: usdPrice?.numerator.toString(),
      denominator: usdPrice?.denominator.toString()
    }
    shouldPersist = true
  }

  if (totalSupplyInPit !== undefined) {
    persistDetails.totalSupplyInPit = totalSupplyInPit?.raw?.toString()
    shouldPersist = true
  }

  if (shouldPersist) {
    adder(persistDetails)
  }
}

export default function usePitTVL(): Fraction {
  const { chainId } = useActiveWeb3React()
  const latestBlockNumber = useBlockNumber()

  const govToken = useGovernanceToken()
  const pit = usePitToken()

  const storedDetails = useGovernanceTokenDetails()

  const quoteStableCoinToken = useToken('BUSD')
  const latestGovTokenPrice = useBUSDPrice(govToken)

  const govTokenPrice = retrievePrice(
    govToken,
    quoteStableCoinToken,
    latestGovTokenPrice,
    storedDetails.details?.usdPrice,
    storedDetails.timestamp
  )

  const pitGovTokenBalance = retrieveTokenAmount(
    govToken,
    useTokenBalance(pit && pit.address, govToken, 'balanceOf', GOVERNANCE_TOKEN_INTERFACE),
    storedDetails.details?.totalSupplyInPit,
    storedDetails.timestamp
  )

  const [initialized, setInitialized] = useState<boolean>(false)
  const [tvl, setTvl] = useState<Fraction>(ZERO_FRACTION)

  const tvlType = 'pit'
  const addTvl = useUpdateTvl()
  const storedTvl = useTVL()?.[tvlType]

  useEffect(() => {
    let mounted = true

    if (mounted && storedTvl?.tvl) {
      setTvl(
        storedTvl.tvl.numerator && storedTvl.tvl.denominator
          ? new Fraction(storedTvl.tvl.numerator, storedTvl.tvl.denominator)
          : ZERO_FRACTION
      )
    }

    setInitialized(true)

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      if (mounted && initialized) {
        if (govTokenPrice) {
          const calculatedTvl = govTokenPrice ? pitGovTokenBalance?.multiply(govTokenPrice?.raw) : undefined
          if (calculatedTvl) {
            setTvl(calculatedTvl)
            addTvl(tvlType, {
              numerator: calculatedTvl.numerator?.toString(),
              denominator: calculatedTvl.denominator?.toString()
            })
          }
        } else if (!govTokenPrice && storedTvl?.tvl) {
          setTvl(
            storedTvl.tvl.numerator && storedTvl.tvl.denominator
              ? new Fraction(storedTvl.tvl.numerator, storedTvl.tvl.denominator)
              : ZERO_FRACTION
          )
        }
      }
    }

    fetchData()

    setInitialized(true)

    return () => {
      mounted = false
    }
  }, [chainId, latestBlockNumber])

  return tvl
}

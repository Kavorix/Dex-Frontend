import { useState, useEffect } from 'react'
import { ChainId, JSBI, Fraction } from '@venomswap/sdk'
import { useActiveWeb3React } from '..'
import { EXCHANGE_SUBGRAPHS, ZERO_FRACTION } from '../../constants'
import Client from '../../services/graphql/client'
import { useBlockNumber } from '../../state/application/hooks'
import { useUpdateTvl, useTVL } from '../../state/staking/tvl/hooks'

export default function useLpPoolTVL(): Fraction {
  const { chainId } = useActiveWeb3React()
  const latestBlockNumber = useBlockNumber()

  const subgraph = chainId && EXCHANGE_SUBGRAPHS[chainId]

  const [initialized, setInitialized] = useState<boolean>(false)
  const [tvl, setTvl] = useState<Fraction>(ZERO_FRACTION)

  const tvlType = 'pools'
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
      if (subgraph && subgraph !== '' && chainId && [ChainId.HARMONY_MAINNET, ChainId.BSC_MAINNET].includes(chainId)) {
        const subgraphClient = new Client(subgraph)
        const result = await subgraphClient.totalLiquidity()
        if (result) {
          const fraction = new Fraction(JSBI.BigInt(parseFloat(result).toFixed(0)), JSBI.BigInt(1))
          if (mounted) {
            setTvl(fraction)
            addTvl(tvlType, {
              numerator: fraction.numerator?.toString(),
              denominator: fraction.denominator?.toString()
            })
          }
        } else if (!result && storedTvl?.tvl) {
          if (mounted) {
            setTvl(
              storedTvl.tvl.numerator && storedTvl.tvl.denominator
                ? new Fraction(storedTvl.tvl.numerator, storedTvl.tvl.denominator)
                : ZERO_FRACTION
            )
          }
        }
      }
    }

    if (initialized) fetchData()

    setInitialized(true)

    return () => {
      mounted = false
    }
  }, [chainId, latestBlockNumber])

  return tvl
}

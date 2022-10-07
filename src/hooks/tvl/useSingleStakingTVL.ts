import { useState, useEffect } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'
import { WETH, Fraction, JSBI, TokenAmount, ChainId } from '@venomswap/sdk'
import useGovernanceToken from '../tokens/useGovernanceToken'
import usePitToken from '../tokens/usePitToken'
import { useActiveWeb3React } from '../../hooks'
import useFilterSmartChefStakingPoolInfos from '../staking/smartChef/useFilterSmartChefStakingPoolInfos'
import ERC20_ABI from '../../constants/abis/erc20'
import { useBlockNumber } from '../../state/application/hooks'
import useBUSDPrice from '../useBUSDPrice'
import { getContract } from '../../utils'
import { ZERO_FRACTION } from '../../constants'
import { SmartChefPoolInfo } from 'constants/staking/types'
import { useUpdateTvl, useTVL } from '../../state/staking/tvl/hooks'

function useTokens(chainId: ChainId | undefined): Record<string, Record<string, any>> {
  const weth = chainId && WETH[chainId]
  const govToken = useGovernanceToken()
  const pitToken = usePitToken()

  const wethBusdPrice = useBUSDPrice(weth)
  const govTokenBusdPrice = useBUSDPrice(govToken)
  const pitTokenBusdPrice = useBUSDPrice(pitToken)

  const tokens: Record<string, Record<string, any>> =
    weth && govToken && pitToken
      ? {
          [weth.address]: { token: weth, price: wethBusdPrice },
          [govToken.address]: { token: govToken, price: govTokenBusdPrice },
          [pitToken.address]: { token: pitToken, price: pitTokenBusdPrice }
        }
      : {}

  return tokens
}

function useBalances(
  library: Web3Provider | undefined,
  pools: SmartChefPoolInfo[],
  blockNumber: number | undefined,
  shouldFetch = true
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>(undefined)

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      const promises: Promise<BigNumber>[] = []

      try {
        for (const pool of pools) {
          if (library && pool.stakedToken) {
            const contract = getContract(pool.stakedToken?.address, ERC20_ABI, library)
            promises.push(contract.balanceOf(pool.address))
          }
        }
      } catch (error) {
        if (mounted) setBalances(undefined)
      }

      const settled: any = await Promise.allSettled(promises)
      const fulfilled: BigNumber[] | undefined = settled
        ?.filter((p: any) => p.status === 'fulfilled')
        ?.map((p: any) => (p as PromiseFulfilledResult<BigNumber[] | undefined>).value)
      //?.filter((p: BigNumber[] | undefined) => p !== undefined)

      if (mounted) setBalances(fulfilled)
    }

    if (shouldFetch) fetchData()

    return () => {
      mounted = false
    }
  }, [pools, blockNumber])

  return balances && balances.length === pools.length ? balances : undefined
}

function accumulateTvl(
  tokens: Record<string, Record<string, any>>,
  balances: BigNumber[] | undefined,
  pools: SmartChefPoolInfo[]
) {
  if (!balances) return undefined
  let accumulatedTvl: Fraction | undefined = undefined
  let accumulatedCount = 0
  const expectedCount = balances?.length ?? 0

  try {
    if (tokens && balances && expectedCount > 0) {
      for (const [i, balance] of balances.entries()) {
        const pool = pools[i]
        const token = pool.stakedToken?.address ? tokens[pool.stakedToken?.address] : undefined
        if (token && token.token && token.price && balance) {
          const amount = new TokenAmount(token.token, JSBI.BigInt(balance.toString()))
          const usdAmount = amount?.multiply(token.price?.raw)
          accumulatedTvl = accumulatedTvl ? accumulatedTvl.add(usdAmount) : usdAmount
          accumulatedCount++
        }
      }
    }
  } catch (error) {
    return undefined
  }

  return accumulatedTvl && accumulatedCount === expectedCount ? accumulatedTvl : undefined
}

export default function useSingleStakingTVL(): Fraction {
  const { chainId, library } = useActiveWeb3React()
  const latestBlockNumber = useBlockNumber()

  const [tvl, setTvl] = useState<Fraction>(ZERO_FRACTION)
  const [initialized, setInitialized] = useState<boolean>(false)

  const tokens = useTokens(chainId)
  const singleStakingPools = useFilterSmartChefStakingPoolInfos(chainId, 'single', true)
  const balances = useBalances(library, singleStakingPools, latestBlockNumber, initialized)

  const tvlType = 'single'
  const addTvl = useUpdateTvl()
  const storedTvl = useTVL()?.[tvlType]

  const accumulatedTvl = accumulateTvl(tokens, balances, singleStakingPools)

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

    if (accumulatedTvl) {
      if (mounted) {
        setTvl(accumulatedTvl)
        addTvl(tvlType, {
          numerator: accumulatedTvl.numerator?.toString(),
          denominator: accumulatedTvl.denominator?.toString()
        })
      }
    } else {
      if (mounted && storedTvl?.tvl) {
        setTvl(
          storedTvl.tvl.numerator && storedTvl.tvl.denominator
            ? new Fraction(storedTvl.tvl.numerator, storedTvl.tvl.denominator)
            : ZERO_FRACTION
        )
      }
    }

    setInitialized(true)

    return () => {
      mounted = false
    }
  }, [chainId, latestBlockNumber, singleStakingPools, balances])

  return tvl
}

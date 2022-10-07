import { useEffect } from 'react'
import { ChainId, Token, TokenAmount, Price, Fraction } from '@venomswap/sdk'
import { useGovTokenSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '..'
import { useTotalLockedGovTokensEarned, useTotalUnlockedGovTokensEarned } from '../../state/stake/hooks'
import { useAggregateGovTokenBalance, useTokenBalance } from '../../state/wallet/hooks'
import useBUSDPrice from '../useBUSDPrice'
import { useBlockNumber } from '../../state/application/hooks'
import useGovernanceToken from './useGovernanceToken'
import useToken from './useToken'
import { GOVERNANCE_TOKEN_INTERFACE } from '../../constants/abis/governanceToken'
import { retrieveTokenAmount, retrieveFraction, retrievePrice } from '../../utils/redux/retrievers'
import { useUpdateGovernanceTokenDetails, useGovernanceTokenDetails } from '../../state/governanceToken/token/hooks'
import {
  useUpdateGovernanceTokenUserDetails,
  useGovernanceTokenUserDetails
} from '../../state/governanceToken/user/hooks'
import { SerializableGovernanceTokenDetails, SerializableGovernanceTokenUserDetails } from '../../state/governanceToken'

type TokenDetailsPersisterFunction = (details: SerializableGovernanceTokenDetails) => void
type TokenUserDetailsPersisterFunction = (details: SerializableGovernanceTokenUserDetails) => void

export interface GovernanceTokenDetails {
  chainId: ChainId | undefined
  token: Token | undefined
  usdPrice: Price | undefined
  totalSupply: TokenAmount | undefined
  totalCirculatingSupply: TokenAmount | undefined
  totalMarketCap: Fraction | undefined
  totalCirculatingMarketCap: Fraction | undefined
  users?: Record<string, GovernanceTokenUserDetails | undefined>
}

export interface GovernanceTokenUserDetails {
  aggregatedBalance: TokenAmount | undefined
  unlockedBalance: TokenAmount | undefined
  lockedBalance: TokenAmount | undefined
  totalBalance: TokenAmount | undefined
  claimableUnlocked: TokenAmount | undefined
  claimableLocked: TokenAmount | undefined
}

export function useGovernanceTokenUserAggregatedBalance(): TokenAmount | undefined {
  const { chainId, account } = useActiveWeb3React()
  const latestBlockNumber = useBlockNumber()
  const govToken = useGovernanceToken()

  const updateGovTokenUserDetails = useUpdateGovernanceTokenUserDetails()
  const storedDetails = useGovernanceTokenUserDetails()

  const userAggregatedBalance = retrieveTokenAmount(
    govToken,
    useAggregateGovTokenBalance(),
    storedDetails.details?.aggregatedBalance,
    storedDetails.timestamp
  )

  useEffect(() => {
    if (userAggregatedBalance !== undefined) {
      updateGovTokenUserDetails({
        aggregatedBalance: userAggregatedBalance?.raw?.toString()
      })
    }
  }, [chainId, account, latestBlockNumber, govToken])

  return userAggregatedBalance
}

function persistTokenUserDetails(
  adder: TokenUserDetailsPersisterFunction,
  userAggregatedBalance: TokenAmount | undefined,
  userUnlockedBalance: TokenAmount | undefined,
  userLockedBalance: TokenAmount | undefined,
  userTotalBalance: TokenAmount | undefined,
  userLockedTokensToClaim: TokenAmount | undefined,
  userUnlockedTokensToClaim: TokenAmount | undefined
) {
  let shouldPersist = false
  const persistDetails: SerializableGovernanceTokenUserDetails = {}

  if (userAggregatedBalance !== undefined) {
    persistDetails.aggregatedBalance = userAggregatedBalance?.raw?.toString()
    shouldPersist = true
  }

  if (userUnlockedBalance !== undefined) {
    persistDetails.unlockedBalance = userUnlockedBalance?.raw?.toString()
    shouldPersist = true
  }

  if (userLockedBalance !== undefined) {
    persistDetails.lockedBalance = userLockedBalance?.raw?.toString()
    shouldPersist = true
  }

  if (userTotalBalance !== undefined) {
    persistDetails.totalBalance = userTotalBalance?.raw?.toString()
    shouldPersist = true
  }

  if (userLockedTokensToClaim !== undefined) {
    persistDetails.claimableLocked = userLockedTokensToClaim?.raw?.toString()
    shouldPersist = true
  }

  if (userUnlockedTokensToClaim !== undefined) {
    persistDetails.claimableUnlocked = userUnlockedTokensToClaim?.raw?.toString()
    shouldPersist = true
  }

  if (shouldPersist) {
    adder(persistDetails)
  }
}

export function useGovernanceTokenUserDetailsData(govToken: Token | undefined): GovernanceTokenUserDetails | undefined {
  const { chainId, account } = useActiveWeb3React()
  const latestBlockNumber = useBlockNumber()

  // User token details
  const updateGovTokenUserDetails = useUpdateGovernanceTokenUserDetails()
  const storedDetails = useGovernanceTokenUserDetails()

  const userAggregatedBalance = retrieveTokenAmount(
    govToken,
    useAggregateGovTokenBalance(),
    storedDetails.details?.aggregatedBalance,
    storedDetails.timestamp
  )

  const userUnlockedBalance = retrieveTokenAmount(
    govToken,
    useTokenBalance(account ?? undefined, govToken, 'balanceOf', GOVERNANCE_TOKEN_INTERFACE),
    storedDetails.details?.unlockedBalance,
    storedDetails.timestamp
  )

  const userLockedBalance = retrieveTokenAmount(
    govToken,
    useTokenBalance(account ?? undefined, govToken, 'lockOf', GOVERNANCE_TOKEN_INTERFACE),
    storedDetails.details?.lockedBalance,
    storedDetails.timestamp
  )

  const userTotalBalance = retrieveTokenAmount(
    govToken,
    useTokenBalance(account ?? undefined, govToken, 'totalBalanceOf', GOVERNANCE_TOKEN_INTERFACE),
    storedDetails.details?.totalBalance,
    storedDetails.timestamp
  )

  const userLockedTokensToClaim = retrieveTokenAmount(
    govToken,
    useTotalLockedGovTokensEarned(),
    storedDetails.details?.claimableLocked,
    storedDetails.timestamp
  )

  const userUnlockedTokensToClaim = retrieveTokenAmount(
    govToken,
    useTotalUnlockedGovTokensEarned(),
    storedDetails.details?.claimableUnlocked,
    storedDetails.timestamp
  )

  const details: GovernanceTokenUserDetails = {
    aggregatedBalance: userAggregatedBalance,
    unlockedBalance: userUnlockedBalance,
    lockedBalance: userLockedBalance,
    totalBalance: userTotalBalance,
    claimableLocked: userLockedTokensToClaim,
    claimableUnlocked: userUnlockedTokensToClaim
  }

  useEffect(() => {
    persistTokenUserDetails(
      updateGovTokenUserDetails,
      userAggregatedBalance,
      userUnlockedBalance,
      userLockedBalance,
      userTotalBalance,
      userLockedTokensToClaim,
      userUnlockedTokensToClaim
    )
  }, [chainId, account, latestBlockNumber])

  return chainId && account ? details : undefined
}

function persistTokenDetails(
  adder: TokenDetailsPersisterFunction,
  usdPrice: Price | undefined,
  totalSupply: TokenAmount | undefined,
  totalCirculatingSupply: TokenAmount | undefined,
  totalMarketCap: Fraction | undefined,
  totalCirculatingMarketCap: Fraction | undefined
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

  if (totalSupply !== undefined) {
    persistDetails.totalSupply = totalSupply?.raw?.toString()
    shouldPersist = true
  }
  if (totalCirculatingSupply !== undefined) {
    persistDetails.totalCirculatingSupply = totalCirculatingSupply?.raw?.toString()
    shouldPersist = true
  }

  if (totalMarketCap !== undefined) {
    persistDetails.totalMarketCap = {
      numerator: totalMarketCap?.numerator.toString(),
      denominator: totalMarketCap?.denominator.toString()
    }
    shouldPersist = true
  }

  if (totalCirculatingMarketCap !== undefined) {
    persistDetails.totalCirculatingMarketCap = {
      numerator: totalCirculatingMarketCap?.numerator.toString(),
      denominator: totalCirculatingMarketCap?.denominator.toString()
    }
    shouldPersist = true
  }

  if (shouldPersist) {
    adder(persistDetails)
  }
}

export function useGovernanceTokenDetailsData(): GovernanceTokenDetails | undefined {
  const { chainId, account } = useActiveWeb3React()
  const latestBlockNumber = useBlockNumber()

  const govToken = useGovernanceToken()

  const updateGovTokenDetails = useUpdateGovernanceTokenDetails()
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

  // Global token details
  const totalSupply = retrieveTokenAmount(govToken, useGovTokenSupply(), storedDetails.details?.totalSupply)

  const totalCirculatingSupply = retrieveTokenAmount(
    govToken,
    useGovTokenSupply('unlockedSupply'),
    storedDetails.details?.totalCirculatingSupply,
    storedDetails.timestamp
  )

  const totalMarketCap = govTokenPrice
    ? retrieveFraction(
        totalSupply?.multiply(govTokenPrice.raw),
        storedDetails.details?.totalMarketCap,
        storedDetails.timestamp
      )
    : undefined

  const totalCirculatingMarketCap = govTokenPrice
    ? retrieveFraction(
        totalCirculatingSupply?.multiply(govTokenPrice.raw),
        storedDetails.details?.totalCirculatingMarketCap,
        storedDetails.timestamp
      )
    : undefined

  // User token details
  const govTokenUserDetails = useGovernanceTokenUserDetailsData(govToken)

  const tokenDetails: GovernanceTokenDetails = {
    chainId: chainId,
    token: govToken,
    usdPrice: govTokenPrice,
    totalSupply: totalSupply,
    totalCirculatingSupply: totalCirculatingSupply,
    totalMarketCap: totalMarketCap,
    totalCirculatingMarketCap: totalCirculatingMarketCap
  }

  if (account) tokenDetails.users = { [account]: govTokenUserDetails }

  useEffect(() => {
    persistTokenDetails(
      updateGovTokenDetails,
      govTokenPrice,
      totalSupply,
      totalCirculatingSupply,
      totalMarketCap,
      totalCirculatingMarketCap
    )
  }, [chainId, latestBlockNumber])

  return chainId ? tokenDetails : undefined
}

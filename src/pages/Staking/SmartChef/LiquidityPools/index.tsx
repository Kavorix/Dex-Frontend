import React, { RefObject, useState, useCallback, useRef } from 'react'
import { AutoColumn } from '../../../../components/Column'
import styled from 'styled-components'
import { SMART_CHEF_POOL_INFOS } from '../../../../constants/staking/smartChef'
import { SmartChefStakingPool } from '../../../../state/stake/types'
import { useSmartChefStakingPools } from '../../../../state/stake/hooks'
import { TYPE, StyledInternalLink } from '../../../../theme'
import PoolCard from '../../../../components/Staking/SmartChef/LiquidityPool/PoolCard'
import { CustomButtonWhite } from '../../../../components/Button'
import AwaitingRewards from '../../../../components/Staking/Pools/AwaitingRewards'
import { RowBetween } from '../../../../components/Row'
import {
  CardSection,
  ExtraDataCard,
  CardNoise,
  CardBGImage
} from '../../../../components/Staking/SmartChef/LiquidityPool/styled'
//import Loader from '../../../../components/Loader'
import { useActiveWeb3React } from '../../../../hooks'
import { OutlineCard } from '../../../../components/Card'
import useFilterSmartChefStakingPools from '../../../../hooks/staking/smartChef/useFilterSmartChefStakingPools'
import useCalculateStakingPoolInfos from '../../../../hooks/staking/smartChef/useCalculateStakingPoolInfos'
import toTitleCase from 'utils/toTitleCase'
import CombinedTVL from '../../../../components/Staking/TVL/Combined'
import { performTokenSearch } from '../../../../utils/tokens/performTokenSearch'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`
/*
const ButtonWrapper = styled(AutoColumn)`
  max-width: 150px;
  width: 100%;
`
<ButtonWrapper>
  <StyledInternalLink to={`/claimAllRewards`} style={{ width: '100%' }}>
    <ButtonPrimary padding="8px" borderRadius="8px" >
      Claim all rewards
    </ButtonPrimary>
  </StyledInternalLink>
</ButtonWrapper>
*/

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`

const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1em;
  margin-bottom: 0.5em;
`

const Arrow = styled.div`
  color: ${({ theme }) => theme.primary1};
  padding: 0 20px;
  user-select: none;
  :hover {
    cursor: pointer;
  }
`

export const SearchInput = styled.input`
  position: relative;
  display: flex;
  padding: 16px;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.text1};
  border-style: solid;
  border: 1px solid ${({ theme }) => theme.primary1};
  -webkit-appearance: none;

  font-size: 18px;

  ::placeholder {
    color: ${({ theme }) => theme.text3};
  }
  transition: border 100ms;
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }
`

interface SmartChefLPEarnProps {
  category: string
}

export default function SmartChefLPEarn({ category = 'lp' }: SmartChefLPEarnProps) {
  const { chainId, account } = useActiveWeb3React()
  const activePoolsOnly = true
  const stakingPools = useSmartChefStakingPools(category, activePoolsOnly)

  // States
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchedPools, setPools] = useState<SmartChefStakingPool[]>([])
  const [isEmpty, setEmpty] = useState(true)
  const [pools] = useState<SmartChefStakingPool[]>(stakingPools)

  const stakingRewardsExist = Boolean(
    typeof chainId === 'number' && (SMART_CHEF_POOL_INFOS[chainId]?.[category]?.length ?? 0) > 0
  )

  const activeStakingInfos = useFilterSmartChefStakingPools(stakingPools, activePoolsOnly)
  const stakingInfoStats = useCalculateStakingPoolInfos(chainId, category)
  const hasArchivedStakingPools = stakingInfoStats?.inactive !== undefined && stakingInfoStats?.inactive > 0

  let poolsToDisplay = activeStakingInfos

  const inputRef = useRef<HTMLInputElement>()

  if (!isEmpty) {
    poolsToDisplay = searchedPools
  }

  const handleInput = useCallback(event => {
    const input = event.target.value
    setSearchQuery(input)
    if (!input || input.trim() === '') {
      setPools([])
      setEmpty(true)
      setPage(1)
      return
    }
    const searchedPools: any[] = performTokenSearch(chainId, pools, 'stakedTokens', input)
    setPools(searchedPools)
    setEmpty(false)
    setPage(1)
  }, [])

  const maxPage = poolsToDisplay.length <= 10 ? 1 : Math.ceil(poolsToDisplay.length / 10)
  const ITEMS_PER_PAGE = 10

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <ExtraDataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>{toTitleCase(category)} Pools liquidity mining</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>Deposit your Liquidity Provider tokens to receive rewards.</TYPE.white>
              </RowBetween>
              {hasArchivedStakingPools && (
                <RowBetween>
                  <StyledInternalLink to={`/staking/${category}/archived`}>
                    <CustomButtonWhite padding="8px" borderRadius="8px">
                      Archived ({stakingInfoStats?.inactive})
                    </CustomButtonWhite>
                  </StyledInternalLink>
                </RowBetween>
              )}
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </ExtraDataCard>
      </TopSection>

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <RowBetween style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>{toTitleCase(category)} Pools</TYPE.mediumHeader>
          <CombinedTVL />
        </RowBetween>

        <SearchInput
          type="text"
          id="pools-search-input"
          placeholder="Search using name or symbol"
          value={searchQuery}
          ref={inputRef as RefObject<HTMLInputElement>}
          onChange={handleInput}
        />

        <AwaitingRewards />

        <PoolSection>
          {account && stakingRewardsExist && stakingPools?.length === 0 ? (
            <OutlineCard>No active pools</OutlineCard>
          ) : account && !stakingRewardsExist ? (
            <OutlineCard>No active pools</OutlineCard>
          ) : account && stakingPools?.length !== 0 && !poolsToDisplay ? (
            <OutlineCard>No active pools</OutlineCard>
          ) : (
            poolsToDisplay
              ?.slice(
                page === 1 ? 0 : (page - 1) * ITEMS_PER_PAGE,
                page * ITEMS_PER_PAGE < poolsToDisplay.length ? page * ITEMS_PER_PAGE : poolsToDisplay.length
              )
              .map(stakingInfo => {
                // need to sort by added liquidity here
                return (
                  <PoolCard key={stakingInfo.pid} category={category} stakingInfo={stakingInfo} isArchived={false} />
                )
              })
          )}
          {poolsToDisplay && poolsToDisplay.length > 0 && (
            <Pagination>
              <div
                onClick={e => {
                  setPage(page === 1 ? page : page - 1)
                }}
              >
                <Arrow>←</Arrow>
              </div>
              <TYPE.body>{'Page ' + page + ' of ' + maxPage}</TYPE.body>
              <div
                onClick={e => {
                  setPage(page === maxPage ? page : page + 1)
                }}
              >
                <Arrow>→</Arrow>
              </div>
            </Pagination>
          )}
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  )
}

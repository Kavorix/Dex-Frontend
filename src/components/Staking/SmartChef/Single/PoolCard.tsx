import React from 'react'
import styled from 'styled-components'
import { AutoColumn } from '../../../Column'
import { RowBetween } from '../../../Row'
import { TYPE, StyledInternalLink } from '../../../../theme'
import DoubleCurrencyLogo from '../../../DoubleLogo'
import { ButtonPrimary } from '../../../Button'
import { SmartChefStakingPool } from '../../../../state/stake/types'
import { useColor } from '../../../../hooks/useColor'
import { Break, CardNoise, CardBGImage } from './styled'
import { unwrappedToken } from '../../../../utils/wrappedCurrency'
import useBUSDPrice from '../../../../hooks/useBUSDPrice'
import { useExtendStakingInfo } from '../../../../hooks/staking/smartChef/single/useExtendStakingInfo'
import adjustFraction from 'utils/adjustFraction'
import TimeUntilRewardsStart from '../TimeUntilRewardsStart'
import TimeUntilRewardsEnd from '../TimeUntilRewardsEnd'

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: none;
`};
`

const StatContainerResponsive = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  margin: 0.75rem 1rem 1rem 1rem;
`

/*const StatContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  margin: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: none;
`};
`*/

const Wrapper = styled(AutoColumn)<{ showBackground: boolean; bgColor: any }>`
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
  position: relative;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '1')};
  background: ${({ theme, bgColor, showBackground }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%, ${showBackground ? theme.black : theme.bg5} 100%) `};
  color: ${({ theme, showBackground }) => (showBackground ? theme.white : theme.text1)} !important;

  ${({ showBackground }) =>
    showBackground &&
    `  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);`}
`

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr 120px;
  grid-gap: 0px;
  align-items: center;
  padding: 1rem;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 48px 1fr 96px;
  `};
`

const BottomSection = styled.div<{ showBackground: boolean }>`
  padding: 12px 16px;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '0.4')};
  border-radius: 0 0 12px 12px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  z-index: 1;
`

export default function PoolCard({
  stakingInfo,
  isArchived
}: {
  stakingInfo: SmartChefStakingPool
  isArchived: boolean
}) {
  stakingInfo = useExtendStakingInfo(stakingInfo)

  const rewardTokenPrice = useBUSDPrice(stakingInfo.rewardToken)
  const rewardAmountUsd =
    rewardTokenPrice && stakingInfo.earnedAmount
      ? adjustFraction(stakingInfo.earnedAmount.multiply(rewardTokenPrice?.raw), stakingInfo.rewardToken.decimals)
      : undefined

  const isStaking = Boolean(stakingInfo.stakedAmount && stakingInfo.stakedAmount.greaterThan('0'))

  // get the color of the token
  const token0 = stakingInfo.stakedToken
  const token1 = stakingInfo.rewardToken
  const currency0 = token0 ? unwrappedToken(token0) : undefined
  const currency1 = token1 ? unwrappedToken(token1) : undefined
  const backgroundColor = useColor(undefined)

  const displayRewardsHaveEnded =
    !stakingInfo.visible || (stakingInfo.blocks.shouldShowCountdown && stakingInfo.blocks.ended)

  const displayRewardsPerBlock =
    stakingInfo.visible && !stakingInfo.blocks.ended && stakingInfo.rewardPerBlock !== undefined

  const displayAPR = stakingInfo.visible && !stakingInfo.blocks.ended && stakingInfo.apr

  return (
    <Wrapper showBackground={isStaking} bgColor={backgroundColor}>
      <CardBGImage desaturate />
      <CardNoise />

      <TopSection>
        <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={24} />
        <TYPE.white fontWeight={600} fontSize={22} style={{ marginLeft: '8px' }}>
          Stake: {currency0?.symbol} - Earn: {currency1?.symbol}
        </TYPE.white>
        <StyledInternalLink to={`/staking/single/${stakingInfo.address}`} style={{ width: '100%' }}>
          <ButtonPrimary padding="8px" borderRadius="8px">
            {isStaking || isArchived ? 'Manage' : 'Deposit'}
          </ButtonPrimary>
        </StyledInternalLink>
      </TopSection>

      {stakingInfo && (
        <StatContainer>
          {stakingInfo.blocks.shouldShowCountdown && stakingInfo.blocks.toDisplay !== undefined && (
            <RowBetween>
              {stakingInfo.visible &&
                stakingInfo.blocks.shouldShowCountdown &&
                !stakingInfo.blocks.started &&
                stakingInfo.blocks.untilStart !== undefined &&
                stakingInfo.blocks.untilStart > 0 && (
                  <>
                    <TYPE.white> Rewards start in</TYPE.white>
                    <TYPE.white fontWeight={500}>
                      <TimeUntilRewardsStart stakingPool={stakingInfo} />
                    </TYPE.white>
                  </>
                )}
              {stakingInfo.visible &&
                stakingInfo.blocks.shouldShowCountdown &&
                stakingInfo.blocks.started &&
                stakingInfo.blocks.toDisplay !== undefined &&
                stakingInfo.blocks.toDisplay > 0 && (
                  <>
                    <TYPE.white> Rewards end in</TYPE.white>
                    <TYPE.white fontWeight={500}>
                      <b>
                        <TimeUntilRewardsEnd stakingPool={stakingInfo} />
                      </b>
                    </TYPE.white>
                  </>
                )}
              {stakingInfo.visible &&
                stakingInfo.blocks.ended &&
                stakingInfo.blocks.toDisplay !== undefined &&
                stakingInfo.blocks.toDisplay > 0 && (
                  <>
                    <TYPE.white> Rewards end in</TYPE.white>
                    <TYPE.white fontWeight={500}>
                      <b>{stakingInfo.blocks.toDisplay} blocks</b>
                    </TYPE.white>
                  </>
                )}
              {displayRewardsHaveEnded && (
                <>
                  <TYPE.white>
                    <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.05rem' }}>
                      ⏰
                    </span>{' '}
                    Rewards have ended
                  </TYPE.white>
                </>
              )}
            </RowBetween>
          )}
          {displayRewardsPerBlock && stakingInfo.rewardPerBlock && (
            <RowBetween>
              <TYPE.white> Reward per block</TYPE.white>
              <TYPE.white fontWeight={500}>
                <b>
                  {stakingInfo.rewardPerBlock.toSignificant(4, { groupSeparator: ',' })}{' '}
                  {stakingInfo.rewardToken?.symbol}
                </b>
              </TYPE.white>
            </RowBetween>
          )}
        </StatContainer>
      )}
      {stakingInfo && (stakingInfo.apr || stakingInfo.valueOfTotalStakedAmountInUsd) && (
        <>
          <Break />
          <StatContainerResponsive>
            {displayAPR && (
              <RowBetween>
                <TYPE.white> APR</TYPE.white>
                <TYPE.white fontWeight={500}>
                  <b>
                    {stakingInfo.apr && stakingInfo.apr.greaterThan('0')
                      ? `${stakingInfo.apr.multiply('100').toSignificant(4, { groupSeparator: ',' })}%`
                      : 'To be determined'}
                  </b>
                </TYPE.white>
              </RowBetween>
            )}
            {stakingInfo.valueOfTotalStakedAmountInUsd && (
              <RowBetween>
                <TYPE.white> Total deposited </TYPE.white>
                <TYPE.white fontWeight={500}>
                  <b>
                    {stakingInfo && stakingInfo.valueOfTotalStakedAmountInUsd
                      ? `$${stakingInfo.valueOfTotalStakedAmountInUsd.toFixed(0, { groupSeparator: ',' })}`
                      : '-'}
                  </b>
                </TYPE.white>
              </RowBetween>
            )}
          </StatContainerResponsive>
        </>
      )}

      {isStaking && (
        <>
          <Break />
          {stakingInfo.earnedAmount && (
            <>
              <Break />
              <BottomSection showBackground={true}>
                <TYPE.black color={'white'} fontWeight={500}>
                  <span>Your Total Rewards</span>
                </TYPE.black>

                <TYPE.black style={{ textAlign: 'right' }} color={'white'} fontWeight={500}>
                  <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
                    ⚡
                  </span>
                  {stakingInfo && stakingInfo.earnedAmount && rewardAmountUsd
                    ? `${stakingInfo.earnedAmount.toSignificant(4, { groupSeparator: ',' })} ${
                        stakingInfo.rewardToken?.symbol
                      } / $${rewardAmountUsd.toSignificant(2, { groupSeparator: ',' })}`
                    : `-`}
                </TYPE.black>
              </BottomSection>
            </>
          )}
        </>
      )}
    </Wrapper>
  )
}

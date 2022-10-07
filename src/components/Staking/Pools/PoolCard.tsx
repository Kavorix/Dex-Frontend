import React from 'react'
import { AutoColumn } from '../../Column'
import { RowBetween, DeviceAwareRowBetween } from '../../Row'
import styled from 'styled-components'
import { isMobile, isAndroid, isIOS } from 'react-device-detect'
import { TYPE, StyledInternalLink } from '../../../theme'
import DoubleCurrencyLogo from '../../DoubleLogo'
import { JSBI } from '@venomswap/sdk'
import { ButtonPrimary } from '../../Button'
import { DefaultStakingPool } from '../../../state/stake/types'
import { useColor } from '../../../hooks/useColor'
import { currencyId } from '../../../utils/currencyId'
import { Break, CardNoise, CardBGImage } from './styled'
import { unwrappedToken } from '../../../utils/wrappedCurrency'
import useBUSDPrice from '../../../hooks/useBUSDPrice'
import { useExtendStakingInfo } from '../../../hooks/staking/pools/useExtendStakingInfo'
//import useUSDCPrice from '../../utils/useUSDCPrice'
//import { BIG_INT_SECONDS_IN_WEEK } from '../../constants'
import useGovernanceToken from '../../../hooks/tokens/useGovernanceToken'
import { ZERO_FRACTION } from '../../../constants'

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
`

const StatContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  margin: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: none;
`};
`

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
  stakingInfo: DefaultStakingPool
  isArchived: boolean
}) {
  const mobile = isMobile || isAndroid || isIOS
  const govToken = useGovernanceToken()
  const govTokenPrice = useBUSDPrice(govToken)

  stakingInfo = useExtendStakingInfo(stakingInfo)

  const isStaking = Boolean(stakingInfo.stakedAmount && stakingInfo.stakedAmount.greaterThan('0'))
  const poolSharePercentage = stakingInfo?.active ? stakingInfo?.poolShare?.multiply(JSBI.BigInt(100)) : ZERO_FRACTION

  // get the color of the token
  const token0 = stakingInfo.tokens[0]
  const token1 = stakingInfo.tokens[1]
  const currency0 = unwrappedToken(token0)
  const currency1 = unwrappedToken(token1)
  const backgroundColor = useColor(undefined)
  const showBackground = isStaking

  return (
    <Wrapper showBackground={showBackground} bgColor={backgroundColor}>
      <CardBGImage desaturate />
      <CardNoise />

      <TopSection>
        <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={24} />
        <TYPE.white fontWeight={600} fontSize={!mobile ? 24 : 20} style={{ marginLeft: !mobile ? '8px' : '6px' }}>
          {currency0.symbol}-{currency1.symbol}
        </TYPE.white>

        <StyledInternalLink
          to={`/staking/pools/${currencyId(currency0)}/${currencyId(currency1)}`}
          style={{ width: '100%' }}
        >
          <ButtonPrimary padding="8px" borderRadius="8px">
            {isStaking || isArchived ? 'Manage' : 'Deposit'}
          </ButtonPrimary>
        </StyledInternalLink>
      </TopSection>

      {stakingInfo &&
        ((stakingInfo.apr && stakingInfo.apr.greaterThan('0')) ||
          stakingInfo.valueOfTotalStakedAmountInUsd ||
          poolSharePercentage) && (
          <StatContainer>
            {stakingInfo.active && stakingInfo.apr && stakingInfo.apr.greaterThan('0') && (
              <RowBetween>
                <TYPE.white> APR*</TYPE.white>
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
            {poolSharePercentage && (
              <DeviceAwareRowBetween>
                <TYPE.white> Pool reward allocation </TYPE.white>
                <TYPE.white>{poolSharePercentage ? `${poolSharePercentage.toSignificant(4)}%` : '-'}</TYPE.white>
              </DeviceAwareRowBetween>
            )}
            {stakingInfo.poolRewardsPerBlock && (
              <DeviceAwareRowBetween>
                <TYPE.white> Emission rate </TYPE.white>
                <TYPE.white>
                  {stakingInfo
                    ? stakingInfo.active
                      ? `${stakingInfo.poolRewardsPerBlock.toSignificant(4, { groupSeparator: ',' })} 
                ${govToken?.symbol} / block`
                      : `0 ${govToken?.symbol} / block`
                    : '-'}
                </TYPE.white>
              </DeviceAwareRowBetween>
            )}
          </StatContainer>
        )}

      {isStaking && (
        <>
          <Break />
          <StatContainerTop>
            {stakingInfo.unlockedEarnedAmount && (
              <RowBetween>
                <TYPE.white> Your Unlocked Rewards </TYPE.white>
                <TYPE.white>
                  <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
                    🔓
                  </span>
                  {stakingInfo
                    ? stakingInfo.active
                      ? `${stakingInfo.unlockedEarnedAmount.toSignificant(4, { groupSeparator: ',' })} ${
                          govToken?.symbol
                        } / $${
                          govTokenPrice
                            ? stakingInfo.unlockedEarnedAmount
                                .multiply(govTokenPrice?.raw)
                                .toSignificant(2, { groupSeparator: ',' })
                            : '0'
                        }`
                      : `0 ${govToken?.symbol}`
                    : '-'}
                </TYPE.white>
              </RowBetween>
            )}
            {stakingInfo.lockedEarnedAmount && (
              <RowBetween>
                <TYPE.white> Your Locked Rewards </TYPE.white>
                <TYPE.white>
                  <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
                    🔒
                  </span>
                  {stakingInfo
                    ? stakingInfo.active
                      ? `${stakingInfo.lockedEarnedAmount.toSignificant(4, { groupSeparator: ',' })} ${
                          govToken?.symbol
                        } / $${
                          govTokenPrice
                            ? stakingInfo.lockedEarnedAmount
                                .multiply(govTokenPrice?.raw)
                                .toSignificant(2, { groupSeparator: ',' })
                            : '0'
                        }`
                      : `0 ${govToken?.symbol}`
                    : '-'}
                </TYPE.white>
              </RowBetween>
            )}
          </StatContainerTop>
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
                  {stakingInfo
                    ? stakingInfo.active
                      ? `${stakingInfo.earnedAmount.toSignificant(4, { groupSeparator: ',' })} ${govToken?.symbol} / $${
                          govTokenPrice
                            ? stakingInfo.earnedAmount
                                .multiply(govTokenPrice?.raw)
                                .toSignificant(2, { groupSeparator: ',' })
                            : '0'
                        }`
                      : `0 ${govToken?.symbol}`
                    : '-'}
                </TYPE.black>
              </BottomSection>
            </>
          )}
        </>
      )}
    </Wrapper>
  )
}

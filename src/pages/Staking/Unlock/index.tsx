import React, { useState } from 'react'
import { TokenAmount } from '@venomswap/sdk'
import { AutoColumn } from '../../../components/Column'
import styled from 'styled-components'

import { RouteComponentProps } from 'react-router-dom'
import { TYPE } from '../../../theme'

import { RowBetween } from '../../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../../components/Staking/Pools/styled'
import { ButtonPrimary } from '../../../components/Button'
import ClaimModal from '../../../components/Staking/Unlock/ClaimModal'
import { useTokenBalance } from '../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../hooks'
import { CountUp } from 'use-count-up'

import usePrevious from '../../../hooks/usePrevious'

import { GOVERNANCE_TOKEN_INTERFACE } from '../../../constants/abis/governanceToken'
import useGovernanceToken from '../../../hooks/tokens/useGovernanceToken'
import CombinedTVL from '../../../components/Staking/TVL/Combined'

import { BlueCard } from '../../../components/Card'
import Loader from '../../../components/Loader'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

/*const PositionInfo = styled(AutoColumn)<{ dim: any }>`
  position: relative;
  max-width: 640px;
  width: 100%;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
`*/

const BottomSection = styled(AutoColumn)`
  border-radius: 12px;
  width: 100%;
  position: relative;
`

/*const StyledDataCard = styled(DataCard)<{ bgColor?: any; showBackground?: any }>`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #1e1a31 0%, #3d51a5 100%);
  z-index: 2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: ${({ theme, bgColor, showBackground }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%,  ${showBackground ? theme.black : theme.bg5} 100%) `};
`*/

const StyledBottomCard = styled(DataCard)<{ dim: any }>`
  background: ${({ theme }) => theme.bg3};
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
  margin-top: -40px;
  padding: 0 1.25rem 1rem 1.25rem;
  padding-top: 32px;
  z-index: 1;
`

/*const PoolData = styled(DataCard)`
  background: none;
  border: 1px solid ${({ theme }) => theme.bg4};
  padding: 1rem;
  z-index: 1;
`*/

/*const VoteCard = styled(DataCard)`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #27ae60 0%, #000000 100%);
  overflow: hidden;
`*/

const CustomCard = styled(DataCard)`
  background: radial-gradient(
    76.02% 75.41% at 1.84% 0%,
    ${({ theme }) => theme.customCardGradientStart} 0%,
    ${({ theme }) => theme.customCardGradientEnd} 100%
  );
  overflow: hidden;
`

const DataRow = styled(RowBetween)`
  justify-content: center;
  gap: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 12px;
  `};
`

const NonCenteredDataRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
flex-direction: column;
`};
`

export default function Unlock({
  match: {
    params: { currencyIdA, currencyIdB }
  }
}: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const { account } = useActiveWeb3React()

  const govToken = useGovernanceToken()

  const [showClaimModal, setShowClaimModal] = useState(false)

  const govTokenUnlockableBalance: TokenAmount | undefined = useTokenBalance(
    account ?? undefined,
    govToken,
    'canUnlockAmount',
    GOVERNANCE_TOKEN_INTERFACE
  )

  const govTokenTotalLockedBalance: TokenAmount | undefined = useTokenBalance(
    account ?? undefined,
    govToken,
    'lockOf',
    GOVERNANCE_TOKEN_INTERFACE
  )

  const balances: (TokenAmount | undefined)[] = [govTokenUnlockableBalance, govTokenTotalLockedBalance]

  const countUpAmount = govTokenUnlockableBalance?.toFixed(6) ?? '0'
  const countUpAmountPrevious = usePrevious(countUpAmount) ?? '0'

  return (
    <PageWrapper gap="lg" justify="center">
      {govToken && (
        <>
          <ClaimModal
            isOpen={showClaimModal}
            onDismiss={() => setShowClaimModal(false)}
            unlockableBalance={govTokenUnlockableBalance}
          />
        </>
      )}

      <TopSection gap="lg" justify="center">
        <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
          <NonCenteredDataRow style={{ alignItems: 'baseline' }}>
            <TYPE.mediumHeader></TYPE.mediumHeader>
            <CombinedTVL />
          </NonCenteredDataRow>
        </AutoColumn>

        <BottomSection gap="lg" justify="center">
          <CustomCard>
            <CardSection>
              <CardBGImage desaturate />
              <CardNoise />
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white fontWeight={600}>Unlock {govToken?.symbol}</TYPE.white>
                </RowBetween>
                {govTokenTotalLockedBalance && (
                  <RowBetween style={{ alignItems: 'baseline' }}>
                    <TYPE.white fontSize={14}>
                      You have a total of {govTokenTotalLockedBalance.toSignificant(4)} locked {govToken?.symbol}.
                    </TYPE.white>
                  </RowBetween>
                )}
                <br />
              </AutoColumn>
            </CardSection>
          </CustomCard>
          <StyledBottomCard dim={false}>
            <CardBGImage desaturate />
            <CardNoise />
            <AutoColumn gap="sm">
              <RowBetween>
                <div>
                  <TYPE.black>Current Unlockable {govToken?.symbol} Balance</TYPE.black>
                </div>
              </RowBetween>
              <RowBetween style={{ alignItems: 'baseline' }}>
                <TYPE.largeHeader fontSize={36} fontWeight={600}>
                  <CountUp
                    key={countUpAmount}
                    isCounting
                    decimalPlaces={4}
                    start={parseFloat(countUpAmountPrevious)}
                    end={parseFloat(countUpAmount)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                </TYPE.largeHeader>
              </RowBetween>
            </AutoColumn>
          </StyledBottomCard>
        </BottomSection>

        {!balances.includes(undefined) && account && govTokenUnlockableBalance?.greaterThan('0') && (
          <DataRow style={{ marginBottom: '0rem' }}>
            <ButtonPrimary padding="8px" borderRadius="8px" width="160px" onClick={() => setShowClaimModal(true)}>
              Unlock
            </ButtonPrimary>
          </DataRow>
        )}

        {balances.includes(undefined) && (
          <BlueCard>
            <AutoColumn gap="10px">
              <TYPE.main style={{ textAlign: 'center' }} fontSize={14}>
                <span
                  role="img"
                  aria-label="wizard-icon"
                  style={{ position: 'relative', top: '2px', marginRight: '5px' }}
                >
                  <Loader style={{ margin: 'auto' }} />
                </span>
                <b>Loading...</b>
                <br />
                Smart contract data is loading, please be patient :)
              </TYPE.main>
            </AutoColumn>
          </BlueCard>
        )}
      </TopSection>
    </PageWrapper>
  )
}

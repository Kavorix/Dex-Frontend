import React, { useCallback, useState, useMemo } from 'react'
import { AutoColumn } from '../../../../components/Column'
import styled from 'styled-components'

import { JSBI } from '@venomswap/sdk'
import { RouteComponentProps } from 'react-router-dom'
import DoubleCurrencyLogo from '../../../../components/DoubleLogo'
import { useWalletModalToggle, useBlockNumber } from '../../../../state/application/hooks'
import { TYPE } from '../../../../theme'
import { BlueCard } from '../../../../components/Card'
import Loader from '../../../../components/Loader'

import { RowBetween } from '../../../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../../../components/Staking/SmartChef/Single/styled'
import { ButtonPrimary, ButtonEmpty } from '../../../../components/Button'
import StakingModal from '../../../../components/Staking/SmartChef/Single/StakingModal'
import { useSmartChefStakingPools } from '../../../../state/stake/hooks'
import ModifiedUnstakingModal from '../../../../components/Staking/SmartChef/Single/ModifiedUnstakingModal'
import ClaimRewardModal from '../../../../components/Staking/SmartChef/ClaimRewardModal'
import AwaitingRewards from '../../../../components/Staking/SmartChef/AwaitingRewards'
import { useTokenBalance } from '../../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../../hooks'
import { useColor } from '../../../../hooks/useColor'
import { CountUp } from 'use-count-up'

import usePrevious from '../../../../hooks/usePrevious'
import { BIG_INT_ZERO } from '../../../../constants'
import { useExtendStakingInfo } from '../../../../hooks/staking/smartChef/single/useExtendStakingInfo'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const PositionInfo = styled(AutoColumn)<{ dim: any }>`
  position: relative;
  max-width: 640px;
  width: 100%;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
`

const BottomSection = styled(AutoColumn)`
  border-radius: 12px;
  width: 100%;
  position: relative;
`

const StyledDataCard = styled(DataCard)<{ bgColor?: any; showBackground?: any }>`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #1e1a31 0%, #3d51a5 100%);
  z-index: 2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: ${({ theme, bgColor, showBackground }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%,  ${showBackground ? theme.black : theme.bg5} 100%) `};
`

const StyledBottomCard = styled(DataCard)<{ dim: any }>`
  background: ${({ theme }) => theme.bg3};
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
  margin-top: -40px;
  padding: 0 1.25rem 1rem 1.25rem;
  padding-top: 32px;
  z-index: 1;
`

const PoolData = styled(DataCard)`
  background: none;
  border: 1px solid ${({ theme }) => theme.bg4};
  padding: 1rem;
  z-index: 1;
`

const DataRow = styled(RowBetween)`
  justify-content: center;
  gap: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 12px;
  `};
`

export default function SmartChefSingleManage({
  match: {
    params: { address }
  }
}: RouteComponentProps<{ address: string }>) {
  const { account } = useActiveWeb3React()

  const category = 'single'
  let stakingInfo = useSmartChefStakingPools(category, undefined, address)?.[0]
  stakingInfo = useExtendStakingInfo(stakingInfo)

  // get currencies and pair
  const [currencyA, currencyB] = [stakingInfo.stakedToken, stakingInfo.rewardToken]

  const currentBlock = useBlockNumber()

  const rewardsStarted = useMemo<boolean>(() => {
    return stakingInfo && currentBlock
      ? JSBI.greaterThanOrEqual(JSBI.BigInt(currentBlock), JSBI.BigInt(stakingInfo.blocks.start))
      : false
  }, [stakingInfo, currentBlock])

  // detect existing unstaked LP position to show add button if none found
  const userLiquidityUnstaked = useTokenBalance(account ?? undefined, stakingInfo?.stakedAmount?.token)
  //const showAddLiquidityButton =
  //  stakingInfo === undefined || Boolean(stakingInfo?.stakedAmount?.equalTo('0') && userLiquidityUnstaked?.equalTo('0'))

  const showAddLiquidityButton = useMemo<boolean>(() => {
    return Boolean(stakingInfo?.stakedAmount?.equalTo('0') && userLiquidityUnstaked?.equalTo('0'))
  }, [stakingInfo, userLiquidityUnstaked])

  // toggle for staking modal and unstaking modal
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [showUnstakingModal, setShowUnstakingModal] = useState(false)
  const [showClaimRewardModal, setShowClaimRewardModal] = useState(false)

  // fade cards if nothing staked or nothing earned yet
  const disableTop = !stakingInfo?.stakedAmount || stakingInfo.stakedAmount.equalTo(JSBI.BigInt(0))

  const backgroundColor = useColor(undefined)

  const countUpAmount = stakingInfo?.earnedAmount?.toFixed(6) ?? '0'
  const countUpAmountPrevious = usePrevious(countUpAmount) ?? '0'

  const displayAvailableToDeposit = userLiquidityUnstaked && userLiquidityUnstaked.greaterThan('0')

  const toggleWalletModal = useWalletModalToggle()

  const handleDepositClick = useCallback(() => {
    if (account) {
      setShowStakingModal(true)
    } else {
      toggleWalletModal()
    }
  }, [account, toggleWalletModal])

  return (
    <PageWrapper gap="lg" justify="center">
      <RowBetween style={{ gap: '24px' }}>
        <TYPE.mediumHeader style={{ margin: 0 }}>
          Stake: {currencyA?.symbol} - Earn: {currencyB?.symbol}
        </TYPE.mediumHeader>
        <DoubleCurrencyLogo currency0={currencyA ?? undefined} currency1={currencyB ?? undefined} size={24} />
      </RowBetween>

      {stakingInfo && stakingInfo.valueOfTotalStakedAmountInUsd && (
        <DataRow style={{ gap: '24px' }}>
          {stakingInfo && stakingInfo.valueOfTotalStakedAmountInUsd && (
            <PoolData>
              <AutoColumn gap="sm">
                <TYPE.body style={{ margin: 0 }}>Total Deposits</TYPE.body>
                <TYPE.body fontSize={24} fontWeight={500}>
                  {stakingInfo && stakingInfo.valueOfTotalStakedAmountInUsd
                    ? `$${stakingInfo.valueOfTotalStakedAmountInUsd.toFixed(0, { groupSeparator: ',' })}`
                    : '-'}
                </TYPE.body>
              </AutoColumn>
            </PoolData>
          )}
          {stakingInfo && stakingInfo.blocks.shouldShowCountdown && (
            <PoolData>
              <AutoColumn gap="sm">
                <TYPE.body style={{ margin: 0 }}>
                  {stakingInfo.visible &&
                    !stakingInfo.blocks.started &&
                    stakingInfo.blocks.untilStart !== undefined &&
                    stakingInfo.blocks.untilStart > 0 && <>Rewards start in</>}
                  {stakingInfo.visible &&
                    stakingInfo.blocks.started &&
                    stakingInfo.blocks.toDisplay !== undefined &&
                    stakingInfo.blocks.toDisplay > 0 && <>Rewards end in</>}
                  {(!stakingInfo.visible || stakingInfo.blocks.ended) && <>Rewards status</>}
                </TYPE.body>
                <TYPE.body fontSize={24} fontWeight={500}>
                  {stakingInfo.visible &&
                    !stakingInfo.blocks.ended &&
                    stakingInfo.blocks.shouldShowCountdown &&
                    stakingInfo.blocks.toDisplay !== undefined &&
                    stakingInfo.blocks.toDisplay > 0 && <>{stakingInfo.blocks.toDisplay} blocks</>}
                  {(!stakingInfo.visible || (stakingInfo.blocks.ended && stakingInfo.blocks.shouldShowCountdown)) && (
                    <>Rewards have ended</>
                  )}
                </TYPE.body>
              </AutoColumn>
            </PoolData>
          )}
        </DataRow>
      )}

      {stakingInfo && (
        <>
          <StakingModal
            isOpen={showStakingModal}
            onDismiss={() => setShowStakingModal(false)}
            stakingInfo={stakingInfo}
            userLiquidityUnstaked={userLiquidityUnstaked}
          />
          <ModifiedUnstakingModal
            isOpen={showUnstakingModal}
            onDismiss={() => setShowUnstakingModal(false)}
            stakingInfo={stakingInfo}
          />
          <ClaimRewardModal
            isOpen={showClaimRewardModal}
            onDismiss={() => setShowClaimRewardModal(false)}
            stakingInfo={stakingInfo}
          />
        </>
      )}

      <PositionInfo gap="lg" justify="center" dim={showAddLiquidityButton}>
        <BottomSection gap="lg" justify="center">
          <StyledDataCard disabled={disableTop} bgColor={backgroundColor} showBackground={!showAddLiquidityButton}>
            <CardSection>
              <CardBGImage desaturate />
              <CardNoise />
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white fontWeight={600}>Your {stakingInfo.stakedToken?.symbol} deposits</TYPE.white>
                </RowBetween>
                <RowBetween style={{ alignItems: 'baseline' }}>
                  <TYPE.white fontSize={36} fontWeight={600}>
                    {stakingInfo?.stakedAmount?.toSignificant(6) ?? '-'}
                  </TYPE.white>
                  <TYPE.white>{currencyA?.symbol}</TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
          </StyledDataCard>
          <StyledBottomCard dim={stakingInfo?.stakedAmount?.equalTo(JSBI.BigInt(0))}>
            <CardBGImage desaturate />
            <CardNoise />
            <AutoColumn gap="sm">
              <RowBetween>
                <div>
                  <TYPE.black>Your unclaimed {stakingInfo.rewardToken.symbol}</TYPE.black>
                </div>
                {stakingInfo?.visible &&
                  stakingInfo?.earnedAmount &&
                  JSBI.notEqual(BIG_INT_ZERO, stakingInfo?.earnedAmount?.raw) && (
                    <ButtonEmpty
                      padding="8px"
                      borderRadius="8px"
                      width="fit-content"
                      onClick={() => setShowClaimRewardModal(true)}
                    >
                      Claim
                    </ButtonEmpty>
                  )}
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
                <TYPE.black fontSize={16} fontWeight={500}></TYPE.black>
              </RowBetween>
            </AutoColumn>
          </StyledBottomCard>
        </BottomSection>
        {!stakingInfo && (
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
        <>
          {rewardsStarted && (
            <TYPE.main style={{ textAlign: 'center' }} fontSize={14}>
              <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px' }}>
                ⭐️
              </span>
              When you deposit or withdraw the contract will automatically claim {stakingInfo.rewardToken.symbol} on
              your behalf.
              <br />
              <br />
              <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px' }}>
                💡
              </span>
              There are no lockups for these rewards. You&apos;ll receive 100% of the rewards you see unlocked.
            </TYPE.main>
          )}
        </>
        <AwaitingRewards stakingInfo={stakingInfo} />
        {!showAddLiquidityButton && (
          <DataRow style={{ marginBottom: '1rem' }}>
            {stakingInfo?.visible && (
              <ButtonPrimary padding="8px" borderRadius="8px" width="160px" onClick={handleDepositClick}>
                {stakingInfo?.stakedAmount?.greaterThan(JSBI.BigInt(0)) ? 'Deposit' : `Deposit ${currencyA?.symbol}`}
              </ButtonPrimary>
            )}

            {stakingInfo?.visible &&
              stakingInfo?.earnedAmount &&
              JSBI.notEqual(BIG_INT_ZERO, stakingInfo?.earnedAmount?.raw) && (
                <ButtonPrimary
                  padding="8px"
                  borderRadius="8px"
                  width="160px"
                  onClick={() => setShowClaimRewardModal(true)}
                >
                  Claim
                </ButtonPrimary>
              )}

            {stakingInfo?.stakedAmount?.greaterThan(JSBI.BigInt(0)) && (
              <>
                <ButtonPrimary
                  padding="8px"
                  borderRadius="8px"
                  width="160px"
                  onClick={() => setShowUnstakingModal(true)}
                >
                  Withdraw
                </ButtonPrimary>
              </>
            )}
          </DataRow>
        )}
        {stakingInfo?.visible && displayAvailableToDeposit && (
          <TYPE.main>
            You have {userLiquidityUnstaked?.toSignificant(6)} {stakingInfo.stakedToken?.symbol} available to deposit
          </TYPE.main>
        )}
        {stakingInfo?.visible && !displayAvailableToDeposit && (
          <TYPE.main>
            You have no {stakingInfo.stakedToken?.symbol} available to deposit. Please swap some other tokens for{' '}
            {stakingInfo.stakedToken?.symbol} first, then try again!
          </TYPE.main>
        )}
      </PositionInfo>
    </PageWrapper>
  )
}

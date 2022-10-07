import React, { useState } from 'react'
import { TransactionResponse } from '@ethersproject/providers'
import { CallOverrides } from '@ethersproject/contracts'
import { TokenAmount } from '@venomswap/sdk'
import Modal from '../../Modal'
import { AutoColumn } from '../../Column'
import styled from 'styled-components'
import { RowBetween } from '../../Row'
import { TYPE, CloseIcon } from '../../../theme'
import { ButtonError } from '../../Button'
import { SmartChefStakingPool } from '../../../state/stake/types'
import { useMasterBreederContract } from '../../../hooks/useContract'
import { SubmittedView, LoadingView } from '../../ModalViews'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { useActiveWeb3React } from '../../../hooks'
import { calculateGasMargin } from '../../../utils'
import useGovernanceToken from '../../../hooks/tokens/useGovernanceToken'
import Loader from '../../Loader'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

interface StakingModalProps {
  isOpen: boolean
  onDismiss: () => void
  stakingInfos: SmartChefStakingPool[]
}

export default function ClaimAllRewardsModal({ isOpen, onDismiss, stakingInfos }: StakingModalProps) {
  const { account } = useActiveWeb3React()

  const govToken = useGovernanceToken()

  // monitor call to help UI loading state
  const addTransaction = useTransactionAdder()
  const [hash, setHash] = useState<string | undefined>()
  const [attempting, setAttempting] = useState(false)
  const [failed, setFailed] = useState<boolean>(false)

  const rewards = stakingInfos.map(({ earnedAmount }) => earnedAmount)
  const sumRewards =
    govToken && rewards
      ? rewards.reduce<TokenAmount | undefined>(
          (a, b) => (a && b ? a.add(b) : undefined),
          new TokenAmount(govToken, '0')
        )
      : undefined

  function wrappedOnDismiss() {
    setHash(undefined)
    setAttempting(false)
    setFailed(false)
    onDismiss()
  }

  const masterBreeder = useMasterBreederContract()

  async function onClaimReward() {
    if (masterBreeder) {
      setAttempting(true)

      const pids = stakingInfos.map(({ pid }) => pid)

      const estimatedGas = await masterBreeder.estimateGas.claimRewards(pids)

      const callOptions: CallOverrides = {
        gasLimit: calculateGasMargin(estimatedGas)
      }

      await masterBreeder
        .claimRewards(pids, callOptions)
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Claim accumulated ${govToken?.symbol} rewards`
          })
          setHash(response.hash)
        })
        .catch((error: any) => {
          setAttempting(false)
          if (error?.code === -32603) {
            setFailed(true)
          }
          console.log(error)
        })
    }
  }

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }

  return (
    <Modal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={90}>
      {!attempting && !hash && !failed && (
        <ContentWrapper gap="lg">
          <RowBetween>
            <TYPE.mediumHeader>Claim</TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOnDismiss} />
          </RowBetween>
          <AutoColumn justify="center" gap="md">
            <>
              {sumRewards?.greaterThan('0') && (
                <>
                  <TYPE.body fontWeight={600} fontSize={36}>
                    {sumRewards?.toSignificant(6)}
                  </TYPE.body>
                  <TYPE.body>Unclaimed {govToken?.symbol}</TYPE.body>
                </>
              )}
              {!sumRewards?.greaterThan('0') && <Loader style={{ margin: 'auto' }} />}
            </>
          </AutoColumn>
          {sumRewards?.greaterThan('0') && (
            <>
              <TYPE.subHeader style={{ textAlign: 'center' }}>
                The sum above includes both locked and unlocked {govToken?.symbol} rewards across all the pools you are
                staking in.
              </TYPE.subHeader>
              <ButtonError disabled={!!error} error={!!error} onClick={onClaimReward}>
                {error ?? 'Claim'}
              </ButtonError>
            </>
          )}
          {!sumRewards?.greaterThan('0') && (
            <TYPE.subHeader style={{ textAlign: 'center' }}>
              Retrieving {govToken?.symbol} rewards across all pools ...
            </TYPE.subHeader>
          )}
        </ContentWrapper>
      )}
      {attempting && !hash && !failed && (
        <LoadingView onDismiss={wrappedOnDismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.body fontSize={20}>Claiming {govToken?.symbol} rewards</TYPE.body>
          </AutoColumn>
        </LoadingView>
      )}
      {hash && !failed && (
        <SubmittedView onDismiss={wrappedOnDismiss} hash={hash}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>Transaction Submitted</TYPE.largeHeader>
            <TYPE.body fontSize={20}>Claimed {govToken?.symbol}!</TYPE.body>
          </AutoColumn>
        </SubmittedView>
      )}
      {!attempting && !hash && failed && (
        <ContentWrapper gap="sm">
          <RowBetween>
            <TYPE.mediumHeader>
              <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
                ⚠️
              </span>
              Error!
            </TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOnDismiss} />
          </RowBetween>
          <TYPE.subHeader style={{ textAlign: 'center' }}>
            Your transaction couldn&apos;t be submitted.
            <br />
            You may have to increase your Gas Price (GWEI) settings!
          </TYPE.subHeader>
        </ContentWrapper>
      )}
    </Modal>
  )
}

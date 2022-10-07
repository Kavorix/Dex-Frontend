import React, { useState } from 'react'
import { TransactionResponse } from '@ethersproject/providers'
import { CallOverrides } from '@ethersproject/contracts'
import Modal from '../../Modal'
import { AutoColumn } from '../../Column'
import styled from 'styled-components'
import { RowBetween } from '../../Row'
import { TYPE, CloseIcon } from '../../../theme'
import { ButtonError } from '../../Button'
import { SmartChefStakingPool } from '../../../state/stake/types'
import { useSmartChefContract } from '../../../hooks/useContract'
import { SubmittedView, LoadingView } from '../../ModalViews'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { useActiveWeb3React } from '../../../hooks'
import { calculateGasMargin } from '../../../utils'
import { BigNumber } from 'ethers'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

interface StakingModalProps {
  isOpen: boolean
  onDismiss: () => void
  stakingInfo: SmartChefStakingPool
}

export default function ClaimRewardModal({ isOpen, onDismiss, stakingInfo }: StakingModalProps) {
  const { account } = useActiveWeb3React()

  // monitor call to help UI loading state
  const addTransaction = useTransactionAdder()
  const [hash, setHash] = useState<string | undefined>()
  const [attempting, setAttempting] = useState(false)
  const [failed, setFailed] = useState<boolean>(false)

  function wrappedOnDismiss() {
    setHash(undefined)
    setAttempting(false)
    setFailed(false)
    onDismiss()
  }

  const smartChef = useSmartChefContract(stakingInfo.address)

  async function onClaimReward() {
    if (smartChef && stakingInfo?.stakedAmount) {
      setAttempting(true)

      const estimatedGas = await smartChef.estimateGas.deposit(BigNumber.from('0'))

      const callOptions: CallOverrides = {
        gasLimit: calculateGasMargin(estimatedGas)
      }

      await smartChef
        .deposit(BigNumber.from('0'), callOptions)
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Claim accumulated ${stakingInfo.rewardToken.symbol} rewards`
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
  if (!stakingInfo?.stakedAmount) {
    error = error ?? 'Enter an amount'
  }

  return (
    <Modal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={90}>
      {!attempting && !hash && !failed && (
        <ContentWrapper gap="lg">
          <RowBetween>
            <TYPE.mediumHeader>Claim</TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOnDismiss} />
          </RowBetween>
          {stakingInfo?.earnedAmount && (
            <AutoColumn justify="center" gap="md">
              <TYPE.body fontWeight={600} fontSize={36}>
                {stakingInfo?.earnedAmount?.toSignificant(6)}
              </TYPE.body>
              <TYPE.body>Unclaimed {stakingInfo.rewardToken.symbol}</TYPE.body>
            </AutoColumn>
          )}
          <ButtonError disabled={!!error} error={!!error && !!stakingInfo?.stakedAmount} onClick={onClaimReward}>
            {error ?? 'Claim'}
          </ButtonError>
        </ContentWrapper>
      )}
      {attempting && !hash && !failed && (
        <LoadingView onDismiss={wrappedOnDismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.body fontSize={20}>
              Claiming {stakingInfo?.earnedAmount?.toSignificant(6)} {stakingInfo.rewardToken.symbol}
            </TYPE.body>
          </AutoColumn>
        </LoadingView>
      )}
      {hash && !failed && (
        <SubmittedView onDismiss={wrappedOnDismiss} hash={hash}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>Transaction Submitted</TYPE.largeHeader>
            <TYPE.body fontSize={20}>Claimed {stakingInfo.rewardToken.symbol}!</TYPE.body>
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

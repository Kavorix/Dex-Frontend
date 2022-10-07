import React, { useState } from 'react'
import { TransactionResponse } from '@ethersproject/providers'
import { CallOverrides } from '@ethersproject/contracts'
import { TokenAmount } from '@venomswap/sdk'
import Modal from '../../Modal'
import { AutoColumn } from '../../Column'
import styled, { keyframes } from 'styled-components'
import { RowBetween } from '../../Row'
import { TYPE, CloseIcon } from '../../../theme'
import { ButtonError } from '../../Button'
import { SubmittedView, LoadingView } from '../../ModalViews'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { useActiveWeb3React } from '../../../hooks'
import { calculateGasMargin } from '../../../utils'
import useGovernanceToken from '../../../hooks/tokens/useGovernanceToken'
import { useGovTokenContract } from '../../../hooks/useContract'
import getTokenLogo from '../../../utils/getTokenLogo'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

const rotateImg = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }

  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
`

export const CustomUniTokenAnimated = styled.img`
  animation: ${rotateImg} 5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  padding: 0;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
`

interface ClaimModalProps {
  isOpen: boolean
  onDismiss: () => void
  unlockableBalance: TokenAmount | undefined
}

export default function ClaimModal({ isOpen, onDismiss, unlockableBalance }: ClaimModalProps) {
  const { account } = useActiveWeb3React()

  const govToken = useGovernanceToken()
  const govTokenContract = useGovTokenContract()

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

  const canUnlockTokens = unlockableBalance?.greaterThan('0')

  async function onClaimRewards() {
    if (govTokenContract) {
      setAttempting(true)

      try {
        const estimatedGas = await govTokenContract.estimateGas.unlock()

        const callOptions: CallOverrides = {
          gasLimit: calculateGasMargin(estimatedGas)
        }

        await govTokenContract
          .unlock(callOptions)
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: `Unlocked ${govToken?.symbol} rewards`
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
      } catch (error) {
        setAttempting(false)
        setFailed(true)
        console.log(error)
      }
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
            <TYPE.mediumHeader> Unlock locked {govToken?.symbol}</TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOnDismiss} />
          </RowBetween>
          <TYPE.body fontSize={32} style={{ textAlign: 'center' }}>
            <CustomUniTokenAnimated width="48px" src={getTokenLogo()} />{' '}
          </TYPE.body>
          {canUnlockTokens && (
            <>
              <TYPE.body fontSize={14} style={{ textAlign: 'center' }}>
                Congratulations, you can unlock {unlockableBalance?.toSignificant(4)} {govToken?.symbol}!
              </TYPE.body>
              <ButtonError disabled={!!error} error={!!error} onClick={onClaimRewards}>
                {error ?? 'Unlock'}
              </ButtonError>
            </>
          )}
          {!canUnlockTokens && (
            <TYPE.body fontSize={14} style={{ textAlign: 'center' }}>
              You have no locked {govToken?.symbol} to unlock right now!
            </TYPE.body>
          )}
        </ContentWrapper>
      )}
      {attempting && !hash && !failed && (
        <LoadingView onDismiss={wrappedOnDismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.body fontSize={20}>Unlocking {govToken?.symbol} rewards</TYPE.body>
          </AutoColumn>
        </LoadingView>
      )}
      {hash && !failed && (
        <SubmittedView onDismiss={wrappedOnDismiss} hash={hash}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>Transaction Submitted</TYPE.largeHeader>
            <TYPE.body fontSize={20}>Unlocked {govToken?.symbol}!</TYPE.body>
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

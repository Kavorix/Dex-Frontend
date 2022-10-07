import React from 'react'
import { JSBI } from '@venomswap/sdk'
import { BLOCKCHAIN_SETTINGS } from '@venomswap/sdk-extra'
import { TYPE } from '../../../theme'
import { useActiveWeb3React } from '../../../hooks'
import useGovernanceToken from '../../../hooks/tokens/useGovernanceToken'
import useBaseStakingRewardsEmission from '../../../hooks/staking/pools/useBaseStakingRewardsEmission'

export default function EmissionRate({ stakingRewardsExist }: { stakingRewardsExist: boolean }) {
  const { chainId } = useActiveWeb3React()
  const govToken = useGovernanceToken()
  const blockchainSettings = chainId ? BLOCKCHAIN_SETTINGS[chainId] : undefined

  const baseEmissions = useBaseStakingRewardsEmission()
  const blocksPerMinute = blockchainSettings?.blockTime ? 60 / blockchainSettings.blockTime : 0
  const emissionsPerMinute =
    baseEmissions && blockchainSettings ? baseEmissions.multiply(JSBI.BigInt(blocksPerMinute)) : undefined

  return (
    <>
      {stakingRewardsExist && baseEmissions && (
        <TYPE.main style={{ textAlign: 'center' }} fontSize={14}>
          <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px' }}>
            ☁️
          </span>
          The base emission rate is currently <b>{baseEmissions.toSignificant(4, { groupSeparator: ',' })}</b>{' '}
          {govToken?.symbol} per block.
          <br />
          <b>{emissionsPerMinute?.toSignificant(4, { groupSeparator: ',' })}</b> {govToken?.symbol} will be minted every
          minute given the current emission schedule.
          <br />
          <br />
          <TYPE.small style={{ textAlign: 'center' }} fontSize={10}>
            * = The APR is calculated using a very simplified formula, it might not fully represent the exact APR
            <br />
            when factoring in the dynamic emission schedule and the locked/unlocked rewards vesting system.
          </TYPE.small>
        </TYPE.main>
      )}
    </>
  )
}

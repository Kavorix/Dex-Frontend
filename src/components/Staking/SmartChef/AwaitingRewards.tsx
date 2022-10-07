import React, { useMemo } from 'react'
import { AutoColumn } from '../../Column'
import { JSBI } from '@venomswap/sdk'
import { TYPE } from '../../../theme'
import { useBlockNumber } from '../../../state/application/hooks'
import { SmartChefStakingPool } from '../../../state/stake/types'
import useBlockchain from '../../../hooks/useBlockchain'
import { getBlockchainBlockTime } from '../../../utils/blockchain'
import { BlueCard } from '../../Card'
import { PoolType } from '../../../constants/staking/types'

const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

interface AwaitingRewardsProps {
  stakingInfo: SmartChefStakingPool
}

export default function AwaitingRewards({ stakingInfo }: AwaitingRewardsProps) {
  const blockchain = useBlockchain()
  const blockTime = getBlockchainBlockTime(blockchain)

  const currentBlock = useBlockNumber()

  const rewardsStarted = useMemo<boolean>(() => {
    return stakingInfo.blocks.start && currentBlock
      ? JSBI.greaterThanOrEqual(JSBI.BigInt(currentBlock), JSBI.BigInt(stakingInfo.blocks.start))
      : false
  }, [stakingInfo.blocks.start, currentBlock])

  const blocksLeftUntilRewards = useMemo<number>(() => {
    return stakingInfo.blocks.start && currentBlock ? stakingInfo.blocks.start - currentBlock : 0
  }, [stakingInfo.blocks.start, currentBlock])

  const secondsToRewards = !rewardsStarted ? blocksLeftUntilRewards * blockTime : 0
  let startingAt = secondsToRewards
  const days = (startingAt - (startingAt % DAY)) / DAY
  startingAt -= days * DAY
  const hours = (startingAt - (startingAt % HOUR)) / HOUR
  startingAt -= hours * HOUR
  const minutes = (startingAt - (startingAt % MINUTE)) / MINUTE
  startingAt -= minutes * MINUTE
  const seconds = startingAt

  return (
    <>
      {stakingInfo.blocks.start && blocksLeftUntilRewards && !rewardsStarted && (
        <BlueCard>
          <AutoColumn gap="10px">
            <TYPE.link fontWeight={400} color={'primaryText1'}>
              <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px' }}>
                💡
              </span>
              <b>{stakingInfo.rewardToken.symbol}</b> rewards haven&apos;t started yet.
              <br />
              <br />
              Rewards will be activated at block <b>{stakingInfo.blocks.start?.toLocaleString()}</b>. There are{' '}
              <b>{blocksLeftUntilRewards}</b> blocks left until the rewards start.
              <br />
              <br />
              Expected start:{' '}
              <b>
                {days ? `${days} ${days === 1 ? 'day' : 'days'}, ` : ''}
                {hours ? `${hours} ${hours === 1 ? 'hour' : 'hours'}, ` : ''}
                {minutes ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ` : ''}
                {seconds
                  ? `${minutes && minutes > 0 ? 'and ' : ''}${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
                  : ''}
              </b>{' '}
              from now.
              <br />
              <br />
              {stakingInfo.poolType === PoolType.Single && stakingInfo.stakedToken && (
                <>
                  You can deposit <b>{stakingInfo.stakedToken.symbol}</b> now if you want to, and you&apos;ll start
                  earning{' '}
                </>
              )}
              {stakingInfo.poolType === PoolType.LP && stakingInfo.stakedTokens && (
                <>You can deposit your LP tokens now if you want to, and you&apos;ll start earning </>
              )}
              <b>{stakingInfo.rewardToken.symbol}</b> rewards at block{' '}
              <b>{stakingInfo.blocks.start?.toLocaleString()}</b> and thereafter.
            </TYPE.link>
          </AutoColumn>
        </BlueCard>
      )}
    </>
  )
}

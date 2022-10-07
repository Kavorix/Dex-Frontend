import React, { useMemo } from 'react'
import { JSBI } from '@venomswap/sdk'
import { useBlockNumber } from '../../../state/application/hooks'
import { SmartChefStakingPool } from '../../../state/stake/types'
import useBlockchain from '../../../hooks/useBlockchain'
import { getBlockchainBlockTime } from '../../../utils/blockchain'

const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

interface AwaitingRewardsProps {
  stakingPool: SmartChefStakingPool
}

export default function TimeUntilRewardsStart({ stakingPool }: AwaitingRewardsProps) {
  const blockchain = useBlockchain()
  const blockTime = getBlockchainBlockTime(blockchain)

  const currentBlock = useBlockNumber()

  const rewardsStarted = useMemo<boolean>(() => {
    return stakingPool.blocks.start && currentBlock
      ? JSBI.greaterThanOrEqual(JSBI.BigInt(currentBlock), JSBI.BigInt(stakingPool.blocks.start))
      : false
  }, [stakingPool.blocks.start, currentBlock])

  const blocksLeftUntilRewards = useMemo<number>(() => {
    return stakingPool.blocks.start && currentBlock ? stakingPool.blocks.start - currentBlock : 0
  }, [stakingPool.blocks.start, currentBlock])

  const secondsToRewards = !rewardsStarted ? blocksLeftUntilRewards * blockTime : 0
  let startingAt = secondsToRewards
  const days = (startingAt - (startingAt % DAY)) / DAY
  startingAt -= days * DAY
  const hours = (startingAt - (startingAt % HOUR)) / HOUR
  startingAt -= hours * HOUR
  const minutes = (startingAt - (startingAt % MINUTE)) / MINUTE
  startingAt -= minutes * MINUTE
  //const seconds = startingAt

  return (
    <>
      {stakingPool.blocks.start && blocksLeftUntilRewards && !rewardsStarted && (
        <>
          {days ? `${days} ${days === 1 ? 'day' : 'days'}, ` : ''}
          {hours ? `${hours} ${hours === 1 ? 'hour' : 'hours'}, ` : ''}
          {minutes ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ` : ''}
        </>
      )}
    </>
  )
}

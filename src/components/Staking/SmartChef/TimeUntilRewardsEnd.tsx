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

export default function TimeUntilRewardsEnd({ stakingPool }: AwaitingRewardsProps) {
  const blockchain = useBlockchain()
  const blockTime = getBlockchainBlockTime(blockchain)

  const currentBlock = useBlockNumber()

  const rewardsEnded = useMemo<boolean>(() => {
    return stakingPool.blocks.end && currentBlock
      ? JSBI.greaterThanOrEqual(JSBI.BigInt(currentBlock), JSBI.BigInt(stakingPool.blocks.end))
      : false
  }, [stakingPool.blocks.end, currentBlock])

  const blocksLeftUntilRewardsEnd = useMemo<number>(() => {
    return stakingPool.blocks.end && currentBlock ? stakingPool.blocks.end - currentBlock : 0
  }, [stakingPool.blocks.end, currentBlock])

  const secondsToRewards = !rewardsEnded ? blocksLeftUntilRewardsEnd * blockTime : 0
  let endingAt = secondsToRewards
  const days = (endingAt - (endingAt % DAY)) / DAY
  endingAt -= days * DAY
  const hours = (endingAt - (endingAt % HOUR)) / HOUR
  endingAt -= hours * HOUR
  const minutes = (endingAt - (endingAt % MINUTE)) / MINUTE
  endingAt -= minutes * MINUTE
  //const seconds = endingAt

  return (
    <>
      {stakingPool.blocks.started && !stakingPool.blocks.ended && blocksLeftUntilRewardsEnd && !rewardsEnded && (
        <>
          {days ? `${days} ${days === 1 ? 'day' : 'days'}, ` : ''}
          {hours ? `${hours} ${hours === 1 ? 'hour' : 'hours'}, ` : ''}
          {minutes ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ` : ''}
        </>
      )}
    </>
  )
}

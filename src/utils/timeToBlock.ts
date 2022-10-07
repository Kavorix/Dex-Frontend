const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export default function timeToBlock(targetBlock: number, blockTime: number): Record<string, number> {
  const secondsToRewards = targetBlock * blockTime
  let startingAt = secondsToRewards
  const days = (startingAt - (startingAt % DAY)) / DAY
  startingAt -= days * DAY
  const hours = (startingAt - (startingAt % HOUR)) / HOUR
  startingAt -= hours * HOUR
  const minutes = (startingAt - (startingAt % MINUTE)) / MINUTE
  startingAt -= minutes * MINUTE
  const seconds = startingAt

  return { days, hours, minutes, seconds }
}

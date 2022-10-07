import { useMemo } from 'react'
import { Fraction, JSBI } from '@venomswap/sdk'
import { DefaultStakingPool } from '../../state/stake/types'

export default function useTotalTVL(stakingInfos: DefaultStakingPool[]): Fraction {
  return useMemo(() => {
    return stakingInfos.reduce<Fraction>((memo, stakingInfo) => {
      if (stakingInfo && stakingInfo.valueOfTotalStakedAmountInUsd) {
        if (stakingInfo.valueOfTotalStakedAmountInUsd) {
          memo = memo.add(stakingInfo.valueOfTotalStakedAmountInUsd)
        }
      }
      return memo
    }, new Fraction(JSBI.BigInt(0), JSBI.BigInt(1)))
  }, [stakingInfos])
}

import { JSBI, TokenAmount } from '@venomswap/sdk'
import { useMemo } from 'react'
import { useActiveWeb3React } from '../..'
import { useSingleContractMultipleData } from '../../../state/multicall/hooks'
import { useMasterBreederContract } from '../../useContract'
import useGovernanceToken from '../../tokens/useGovernanceToken'
import { DefaultStakingPool } from '../../../state/stake/types'

export default function useExtendWithPendingRewards(stakingInfos: DefaultStakingPool[]): DefaultStakingPool[] {
  const { chainId, account } = useActiveWeb3React()
  const govToken = useGovernanceToken()

  const masterBreederContract = useMasterBreederContract()
  const pids = useMemo(() => stakingInfos.map(({ pid }) => pid), [stakingInfos])
  const pidAccountMapping = useMemo(
    () => stakingInfos.map(({ pid }) => (account ? [pid, account] : [undefined, undefined])),
    [stakingInfos, account]
  )

  const pendingRewards = useSingleContractMultipleData(masterBreederContract, 'pendingReward', pidAccountMapping)

  return useMemo(() => {
    if (!chainId || !govToken) return []

    return pids.reduce<DefaultStakingPool[]>((memo, pid, index) => {
      const stakingInfo = stakingInfos[index]
      const pendingReward = pendingRewards[index]

      if (pendingReward && !pendingReward.error && !pendingReward.loading && pendingReward?.result?.[0] !== undefined) {
        const calculatedTotalPendingRewards = JSBI.BigInt(pendingReward?.result?.[0] ?? 0)
        const calculatedLockedPendingRewards = JSBI.divide(
          JSBI.multiply(calculatedTotalPendingRewards, JSBI.BigInt(stakingInfo.lockedRewardsPercentageUnits)),
          JSBI.BigInt(100)
        )
        const calculatedUnlockedPendingRewards = JSBI.divide(
          JSBI.multiply(calculatedTotalPendingRewards, JSBI.BigInt(stakingInfo.unlockedRewardsPercentageUnits)),
          JSBI.BigInt(100)
        )

        const totalPendingRewardAmount = new TokenAmount(govToken, calculatedTotalPendingRewards)
        const totalPendingLockedRewardAmount = new TokenAmount(govToken, calculatedLockedPendingRewards)
        const totalPendingUnlockedRewardAmount = new TokenAmount(govToken, calculatedUnlockedPendingRewards)

        if (totalPendingRewardAmount) {
          stakingInfo.earnedAmount = totalPendingRewardAmount
        }

        if (totalPendingLockedRewardAmount) {
          stakingInfo.lockedEarnedAmount = totalPendingLockedRewardAmount
        }

        if (totalPendingUnlockedRewardAmount) {
          stakingInfo.unlockedEarnedAmount = totalPendingUnlockedRewardAmount
        }
      }

      memo.push(stakingInfo)

      return memo
    }, [])
  }, [chainId, govToken, pids, stakingInfos, pendingRewards])
}

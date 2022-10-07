import { useMemo } from 'react'
import { Interface } from '@ethersproject/abi'
import { TokenAmount } from '@venomswap/sdk'
import { abi as SMART_CHEF_ABI } from '@venomswap/contracts/build/SmartChefInitializable.json'
import { useActiveWeb3React } from '../..'
import useGovernanceToken from '../../tokens/useGovernanceToken'
import { SmartChefStakingPool } from '../../../state/stake/types'
import { useMultipleContractSingleData } from '../../../state/multicall/hooks'

export default function useExtendWithPendingRewards(stakingPools: SmartChefStakingPool[]): SmartChefStakingPool[] {
  const { chainId, account } = useActiveWeb3React()
  const govToken = useGovernanceToken()

  const addresses = useMemo(() => stakingPools.map(({ address }) => address), [stakingPools])

  const smartChefInterface = new Interface(SMART_CHEF_ABI)
  const pendingRewards = useMultipleContractSingleData(addresses, smartChefInterface, 'pendingReward', [account])

  return useMemo(() => {
    if (!chainId || !govToken) return []

    return addresses.reduce<SmartChefStakingPool[]>((memo, address, index) => {
      const stakingInfo = stakingPools[index]
      const pendingReward = pendingRewards[index]

      if (pendingReward && pendingReward.valid && pendingReward.result?.[0]) {
        stakingInfo.earnedAmount = new TokenAmount(stakingInfo.rewardToken, pendingReward.result?.[0])
      }

      memo.push(stakingInfo)

      return memo
    }, [])
  }, [chainId, govToken, stakingPools, addresses, pendingRewards])
}

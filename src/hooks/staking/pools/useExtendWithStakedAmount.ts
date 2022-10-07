import { JSBI, TokenAmount, Pair } from '@venomswap/sdk'
import { useMemo } from 'react'
import { useActiveWeb3React } from '../..'
import { useSingleContractMultipleData } from '../../../state/multicall/hooks'
import { useMasterBreederContract } from '../../useContract'
import useGovernanceToken from '../../tokens/useGovernanceToken'
import { DefaultStakingPool } from '../../../state/stake/types'

export default function useExtendWithStakedAmount(stakingInfos: DefaultStakingPool[]): DefaultStakingPool[] {
  const { chainId, account } = useActiveWeb3React()
  const govToken = useGovernanceToken()

  const masterBreederContract = useMasterBreederContract()
  const pids = useMemo(() => stakingInfos.map(({ pid }) => pid), [stakingInfos])
  const pidAccountMapping = useMemo(
    () => stakingInfos.map(({ pid }) => (account ? [pid, account] : [undefined, undefined])),
    [stakingInfos, account]
  )

  const userInfos = useSingleContractMultipleData(masterBreederContract, 'userInfo', pidAccountMapping)

  return useMemo(() => {
    if (!chainId || !govToken) return []

    return pids.reduce<DefaultStakingPool[]>((memo, pid, index) => {
      const stakingInfo = stakingInfos[index]
      const userInfo = userInfos[index]

      if (userInfo && !userInfo.error && !userInfo.loading && userInfo?.result?.[0] !== undefined) {
        const dummyPair = new Pair(
          new TokenAmount(stakingInfo.tokens[0], '0'),
          new TokenAmount(stakingInfo.tokens[1], '0')
        )
        stakingInfo.stakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(userInfo?.result?.[0] ?? 0))
      }

      memo.push(stakingInfo)

      return memo
    }, [])
  }, [chainId, govToken, pids, stakingInfos, userInfos])
}

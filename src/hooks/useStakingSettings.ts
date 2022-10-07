import { STAKING_SETTINGS } from '../constants/staking/pools/settings'
import { useActiveWeb3React } from './index'

export default function useStakingSettings(): Record<string, any> | undefined {
  const { chainId } = useActiveWeb3React()
  return chainId ? STAKING_SETTINGS[chainId] : undefined
}

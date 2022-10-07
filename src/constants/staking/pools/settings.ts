import { ChainId } from '@venomswap/sdk'

export const STAKING_SETTINGS: {
  [chainId in ChainId]?: Record<string, any>
} = {
  [ChainId.BSC_MAINNET]: {
    startBlock: 9498500,
    lockRewardsRatio: 95,
    unlockedRewardsRatio: 5
  },
  [ChainId.BSC_TESTNET]: {
    startBlock: 10931000,
    lockRewardsRatio: 95,
    unlockedRewardsRatio: 5
  },
  [ChainId.HARMONY_MAINNET]: {
    startBlock: 10183471,
    lockRewardsRatio: 95,
    unlockedRewardsRatio: 5
  },
  [ChainId.HARMONY_TESTNET]: {
    startBlock: 10183471,
    lockRewardsRatio: 95,
    unlockedRewardsRatio: 5
  }
}

import { ChainId, Pair } from '@venomswap/sdk'
import { PoolType } from '../../types'
import getTokenWithDefault from '../../../../utils/getTokenWithDefault'
import getPairTokensWithDefaults from '../../../../utils/getPairTokensWithDefaults'
import { SmartChefPoolInfo } from '../../types'

export const HARMONY_TESTNET_SMART_CHEF_POOLS: Record<string, SmartChefPoolInfo[]> = {
  single: [
    {
      pid: 0,
      order: 0,
      address: '0x122A621c2fEC177Cf72a802afbB8bDD99d524C95',
      poolType: PoolType.Single,
      stakedToken: getTokenWithDefault(ChainId.HARMONY_TESTNET, 'WONE'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_TESTNET, 'VIPER'),
      rewardPerBlock: '0.05',
      blocks: {
        start: 12296500,
        end: 14888500
      },
      withdrawalMethod: 'withdraw',
      visible: true
    }
  ],
  bridge: [
    {
      pid: 0,
      order: 0,
      address: '0xB996F3d3036937411625Abe69FF529Bbd54f5979',
      poolType: PoolType.LP,
      category: 'bridge',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/1BUSD'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/1BUSD')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_TESTNET, 'VIPER'),
      rewardPerBlock: '0.05',
      blocks: {
        start: 12300600,
        end: 14892600
      },
      withdrawalMethod: 'withdraw',
      visible: true
    }
  ]
}

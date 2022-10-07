import { ChainId } from '@venomswap/sdk'
import { PoolType } from '../../types'
import getTokenWithDefault from '../../../../utils/getTokenWithDefault'
import { SmartChefPoolInfo } from '../../types'

export const BSC_MAINNET_SMART_CHEF_POOLS: Record<string, SmartChefPoolInfo[]> = {
  single: [
    {
      pid: 0,
      order: 0,
      address: '0x236b5b57DDEE971AB5EBeA618B05d86210FE9323',
      poolType: PoolType.Single,
      stakedToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'xCOBRA'),
      rewardToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'COBRA'),
      bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'COBRA'),
      rewardPerBlock: '0.2378234399',
      blocks: {
        start: 9891592,
        end: 20403592
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 1,
      order: 1,
      address: '0x5F53C2daf6918BCF88E5851FcdE52e20909C6379',
      poolType: PoolType.Single,
      stakedToken: getTokenWithDefault(ChainId.BSC_MAINNET, 'xCOBRA'),
      rewardToken: getTokenWithDefault(ChainId.BSC_MAINNET, '1VIPER'),
      bgToken: getTokenWithDefault(ChainId.BSC_MAINNET, '1VIPER'),
      rewardPerBlock: '0.1157407407',
      blocks: {
        start: 10547531,
        end: 12275531
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    }
  ]
}

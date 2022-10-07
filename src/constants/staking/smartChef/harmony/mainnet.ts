import { ChainId, Pair } from '@venomswap/sdk'
import { PoolType } from '../../types'
import getTokenWithDefault from '../../../../utils/getTokenWithDefault'
import getPairTokensWithDefaults from '../../../../utils/getPairTokensWithDefaults'
import { SmartChefPoolInfo } from '../../types'

export const HARMONY_MAINNET_SMART_CHEF_POOLS: Record<string, SmartChefPoolInfo[]> = {
  single: [
    {
      pid: 0,
      order: 2,
      address: '0x5c84935da00817c167B3E2E857d9269F9e211334',
      poolType: PoolType.Single,
      stakedToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WONE'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WONE'),
      rewardPerBlock: '0.035',
      blocks: {
        start: 15318226,
        end: 17910226
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 1,
      order: 6,
      address: '0x6Cf157a593de05026B691DcD850c472c8cB75b89',
      poolType: PoolType.Single,
      stakedToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'NFT'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'NFT'),
      rewardPerBlock: '1.581790123',
      blocks: {
        start: 15422060,
        end: 18014060
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 2,
      order: 11,
      address: '0x3e3A5850714541c573eCb746bdfb4900Fd8717D7',
      poolType: PoolType.Single,
      stakedToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'BOOM'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'BOOM'),
      rewardPerBlock: '0.00001094907407',
      blocks: {
        start: 15814774,
        end: 16600229
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 3,
      order: 9,
      address: '0xa58C2CBF2050f47749C44b6FB249aB77f109EF39',
      poolType: PoolType.Single,
      stakedToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'McONE'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'McONE'),
      rewardPerBlock: '4.583333333',
      blocks: {
        start: 15818340,
        end: 16603795
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 4,
      order: 100,
      address: '0x75de75158B0CE2FE38Eaf61632f96ecD713a6FF7',
      poolType: PoolType.Single,
      stakedToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'xVIPER'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      rewardPerBlock: '0.1585489599',
      blocks: {
        start: 15940090,
        end: 31708090
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 5,
      order: 4,
      address: '0x0E4749b1e8f9d35372Fc122Ea19C411335eA2Fd6',
      poolType: PoolType.Single,
      stakedToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'xVIPER'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'bscCOBRA'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'bscCOBRA'),
      rewardPerBlock: '0.01929012346',
      blocks: {
        start: 16440705,
        end: 19032705
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 6,
      order: 1,
      address: '0x88b0daAef8e729D415d8AA502915527A9425878C',
      poolType: PoolType.Single,
      stakedToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'xVIPER'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'wsWAGMI'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'wsWAGMI'),
      rewardPerBlock: '0.00009988584475',
      blocks: {
        start: 22735155,
        end: 38503155
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 7,
      order: 98,
      address: '0x5D36dE2846134E6bAc2E84042C975e460337538d',
      poolType: PoolType.Single,
      stakedToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'xVIPER'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'CSHARE'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'CSHARE'),
      rewardPerBlock: '0.000006307077626',
      blocks: {
        start: 22735155,
        end: 31678174
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 8,
      order: 0,
      address: '0x249a360CeC6687e145D76444Af176335F7C2F818',
      poolType: PoolType.Single,
      stakedToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'wsWAGMI'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      rewardPerBlock: '0.1268391679',
      blocks: {
        start: 22735155,
        end: 38503155
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    }
  ],
  bridge: [
    {
      pid: 0,
      order: 0,
      address: '0xAE2D26605C293d0c8B68C905F0DC81f1d3aC2aC1',
      poolType: PoolType.LP,
      category: 'bridge',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'BUSD/bscBUSD'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscBUSD/BUSD'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'BUSD'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'BUSD/bscBUSD')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      rewardPerBlock: '0.006',
      blocks: {
        start: 15395817,
        end: 17987817
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 1,
      order: 1,
      address: '0xF37d2132c358cc51386fAE9F8485D38d42Be21a5',
      poolType: PoolType.LP,
      category: 'bridge',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1USDC/bscUSDC'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscUSDC/1USDC'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'bscUSDC'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1USDC/bscUSDC')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      rewardPerBlock: '0.006',
      blocks: {
        start: 15395817,
        end: 17987817
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 2,
      order: 2,
      address: '0xf2aC00a3Ba3e04ccA11a1b62cf366b1C3Fa2F196',
      poolType: PoolType.LP,
      category: 'bridge',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1DAI/bscDAI'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscDAI/1DAI'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, '1DAI'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1DAI/bscDAI')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      rewardPerBlock: '0.006',
      blocks: {
        start: 15395817,
        end: 17987817
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 3,
      order: 3,
      address: '0xbd19B4AF9E4a03575D92d127708b0C142a7ec1b7',
      poolType: PoolType.LP,
      category: 'bridge',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1ETH/bscETH'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1ETH/bscETH'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, '1ETH'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1ETH/bscETH')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      rewardPerBlock: '0.01',
      blocks: {
        start: 15395817,
        end: 17987817
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 4,
      order: 4,
      address: '0x9b37d0017eAE7A5027b1536f8C9f4b5CDbB971e2',
      poolType: PoolType.LP,
      category: 'bridge',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1WBTC/bscBTCB'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1WBTC/bscBTCB'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'bscBTCB'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1WBTC/bscBTCB')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      rewardPerBlock: '0.01',
      blocks: {
        start: 15395817,
        end: 17987817
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    }
  ],
  community: [
    {
      pid: 0,
      order: 0,
      address: '0xF33E9C1ad490D760e9a1ea9E24E56BdcdC87F279',
      poolType: PoolType.LP,
      category: 'community',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'KURO/VIPER'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'KURO/VIPER'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'KURO'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'KURO/VIPER')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      rewardPerBlock: '0.007798996914',
      blocks: {
        start: 15772291,
        end: 16605732
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 1,
      order: 10,
      address: '0x2aF8C7BFBc2ba194a4853262B1A3ec86595022D9',
      poolType: PoolType.LP,
      category: 'community',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'NFT/VIPER'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'NFT/VIPER'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'NFT'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'NFT/VIPER')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      rewardPerBlock: '0.006172839506',
      blocks: {
        start: 15820964,
        end: 17116964
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 2,
      order: 2,
      address: '0xa0cB12F792B11f4098a83Fd4d5Bc6fA02Bfb0625',
      poolType: PoolType.LP,
      category: 'community',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'GAME/WONE'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'GAME/WONE'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WONE'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'GAME'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'GAME/WONE')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'CREDIT'),
      rewardPerBlock: '77160493',
      blocks: {
        start: 15848022,
        end: 18440022
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 3,
      order: 3,
      address: '0x55B20ba7b948a46B1C30a639b5b870614004A5ea',
      poolType: PoolType.LP,
      category: 'community',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'CREDIT/WONE'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/CREDIT'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WONE'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'GAME'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'CREDIT/WONE')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'GAME'),
      rewardPerBlock: '0.03858024691',
      blocks: {
        start: 15908025,
        end: 18500025
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 4,
      order: 4,
      address: '0x3AECF4EDEc6eD3CDF5B7eEbf73fd16E2e8319E1E',
      poolType: PoolType.LP,
      category: 'community',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'XYA/WONE'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'XYA/WONE'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WONE'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'XYA'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'XYA/WONE')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'XYA'),
      rewardPerBlock: '0.03858024691',
      blocks: {
        start: 15910328,
        end: 18502328
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 5,
      order: 5,
      address: '0xE112217c21661623a90bC64f5cBe644906D9e923',
      poolType: PoolType.LP,
      category: 'community',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'VINCI/WONE'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'VINCI/WONE'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WONE'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VINCI'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'VINCI/WONE')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VINCI'),
      rewardPerBlock: '0.07154295267',
      blocks: {
        start: 15942240,
        end: 19830240
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 6,
      order: 6,
      address: '0x577A687abD94830EaB7a9f44b1E632aDB1a695C4',
      poolType: PoolType.LP,
      category: 'community',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'BOOM/WONE'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'BOOM/WONE'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WONE'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'BOOM'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'BOOM/WONE')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'BOOM'),
      rewardPerBlock: '0.00003858024691',
      blocks: {
        start: 16151738,
        end: 20039738
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 7,
      order: 7,
      address: '0xb65d22EbB7e5617AfeF39b506B78cf83A578C2Db',
      poolType: PoolType.LP,
      category: 'community',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'HPLAY/WONE'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'HPLAY/WONE'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WONE'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'HPLAY'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'HPLAY/WONE')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'HPLAY'),
      rewardPerBlock: '0.3858024691',
      blocks: {
        start: 20659919,
        end: 24547919
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 8,
      order: 8,
      address: '0x5D8f5a54F64F25D471495a3BADCED567b56366c4',
      poolType: PoolType.LP,
      category: 'community',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'IMRTL/WONE'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'IMRTL/WONE'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WONE'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'IMRTL'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'IMRTL/WONE')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'IMRTL'),
      rewardPerBlock: '46.84870448',
      blocks: {
        start: 22694635,
        end: 23990635
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    },
    {
      pid: 9,
      order: 9,
      address: '0x2d03Ad80e4876Da9582093fBF98FFf5E3b5f4aE1',
      poolType: PoolType.LP,
      category: 'community',
      stakedTokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'IMRTL/VIPER'),
      stakedTokensReserveOrder: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'IMRTL/VIPER'),
      baseToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
      bgToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'IMRTL'),
      pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'IMRTL/VIPER')),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'IMRTL'),
      rewardPerBlock: '34.52009799',
      blocks: {
        start: 22694635,
        end: 25286635
      },
      withdrawalMethod: 'emergencyWithdraw',
      visible: false
    }
  ]
}

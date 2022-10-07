import { ChainId, Pair } from '@venomswap/sdk'
import getPairTokensWithDefaults from '../../../../utils/getPairTokensWithDefaults'
import { DefaultStakingPoolInfo } from '../../types'

export const HARMONY_MAINNET_POOLS: DefaultStakingPoolInfo[] = [
  {
    pid: 0,
    order: 0,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/BUSD'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/BUSD')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 1,
    order: 100, //increase order to rank it higher than other pools
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 2,
    order: 2,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1ETH'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1ETH')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 3,
    order: 3,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'BUSD/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'BUSD/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 4,
    order: 4,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'BUSD/bscBUSD'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'BUSD/bscBUSD')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 5,
    order: 5,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1USDC'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1USDC')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 6,
    order: 6,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1ROT/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1ROT/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 7,
    order: 7,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1MAGGOT/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1MAGGOT/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 8,
    order: 8,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1WISE/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1WISE/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 9,
    order: 9,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1DSLA/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1DSLA/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 10,
    order: 10,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'LINK/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'LINK/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 11,
    order: 11,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1AAVE/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1AAVE/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 12,
    order: 12,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1SNX/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1SNX/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 13,
    order: 13,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1YFI/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1YFI/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 14,
    order: 14,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '11INCH/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '11INCH/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 15,
    order: 15,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscCAKE/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscCAKE/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 16,
    order: 16,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1SUSHI/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1SUSHI/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 17,
    order: 17,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1UNI/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1UNI/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 18,
    order: 18,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1WISE/1ETH'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1WISE/1ETH')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 19,
    order: 19,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1WBTC'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1WBTC')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 20,
    order: 20,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1MATIC'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1MATIC')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 21,
    order: 21,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JENN/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JENN/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 22,
    order: 22,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/xVIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/xVIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 23,
    order: 23,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscBNB/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscBNB/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 24,
    order: 24,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscDOT/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscDOT/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 25,
    order: 25,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscADA/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscADA/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 26,
    order: 26,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1xSUSHI/xVIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1xSUSHI/xVIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 27,
    order: 27,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1CRV/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1CRV/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 28,
    order: 28,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1COMP/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1COMP/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 29,
    order: 29,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1BAL/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1BAL/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 30,
    order: 30,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1CREAM/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1CREAM/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 31,
    order: 31,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscEPS/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscEPS/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 32,
    order: 32,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscXVS/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscXVS/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 33,
    order: 33,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/UST'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/UST')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 34,
    order: 34,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscZIL/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscZIL/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 35,
    order: 35,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscATOM/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscATOM/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 36,
    order: 36,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1TEL/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1TEL/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 37,
    order: 37,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'LUNA/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'LUNA/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 38,
    order: 97,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscCOBRA/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscCOBRA/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 39,
    order: 39,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'VIPER/UST'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'VIPER/UST')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 40,
    order: 40,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'LUNA/WONE'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'LUNA/WONE')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 41,
    order: 41,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'anyBTC/WONE'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'anyBTC/WONE')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 42,
    order: 98,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'wsWAGMI/WONE'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'wsWAGMI/WONE')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 43,
    order: 99,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'wsWAGMI/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'wsWAGMI/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 44,
    order: 44,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'MAI/WONE'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'MAI/WONE')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 45,
    order: 45,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'MAI/VIPER'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'MAI/VIPER')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 46,
    order: 46,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ONEUSD/WONE'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ONEUSD/WONE')),
    allocPoints: 0,
    active: false
  },
  {
    pid: 47,
    order: 47,
    tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ONEUSD/1USDC'),
    pairAddress: Pair.getAddress(...getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ONEUSD/1USDC')),
    allocPoints: 0,
    active: false
  }
]

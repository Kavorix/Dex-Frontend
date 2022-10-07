import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, JSBI, Percent, Token, WETH, Fraction } from '@venomswap/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { fortmatic, injected, portis, walletconnect, walletlink } from '../connectors'

import getTokenWithDefault from '../utils/getTokenWithDefault'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const ZERO_ONE_ADDRESS = '0x0000000000000000000000000000000000000001'

export const GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'

export const TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC'

export const DISPLAY_TVL = false

export const PIT_SETTINGS: { [chainId in ChainId]: Record<string, string> } = {
  [ChainId.MAINNET]: { name: '', path: '' },
  [ChainId.RINKEBY]: { name: '', path: '' },
  [ChainId.ROPSTEN]: { name: '', path: '' },
  [ChainId.GÖRLI]: { name: '', path: '' },
  [ChainId.KOVAN]: { name: '', path: '' },
  [ChainId.BSC_MAINNET]: { name: 'CobraPit', path: '/cobraPit' },
  [ChainId.BSC_TESTNET]: { name: 'CobraPit', path: '/cobraPit' },
  [ChainId.HARMONY_MAINNET]: { name: 'ViperPit', path: '/viperPit' },
  [ChainId.HARMONY_TESTNET]: { name: 'ViperPit', path: '/viperPit' }
}

export const NEST_SETTINGS: { [chainId in ChainId]: Record<string, string> } = {
  [ChainId.MAINNET]: { name: '', path: '' },
  [ChainId.RINKEBY]: { name: '', path: '' },
  [ChainId.ROPSTEN]: { name: '', path: '' },
  [ChainId.GÖRLI]: { name: '', path: '' },
  [ChainId.KOVAN]: { name: '', path: '' },
  [ChainId.BSC_MAINNET]: { name: 'CobraNest', path: '/single' },
  [ChainId.BSC_TESTNET]: { name: 'CobraNest', path: '/single' },
  [ChainId.HARMONY_MAINNET]: { name: 'ViperNest', path: '/single' },
  [ChainId.HARMONY_TESTNET]: { name: 'ViperNest', path: '/single' }
}

export const EXCHANGE_SUBGRAPHS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.KOVAN]: '',
  [ChainId.BSC_MAINNET]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.HARMONY_MAINNET]: '',
  [ChainId.HARMONY_TESTNET]: ''
}

export const ANALYTICS_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.KOVAN]: '',
  [ChainId.BSC_MAINNET]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.HARMONY_MAINNET]: '',
  [ChainId.HARMONY_TESTNET]: ''
}

export const BRIDGE_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.KOVAN]: '',
  [ChainId.BSC_MAINNET]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.HARMONY_MAINNET]: 'https://bridge.harmony.one',
  [ChainId.HARMONY_TESTNET]: ''
}

export const DOCS_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.KOVAN]: '',
  [ChainId.BSC_MAINNET]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.HARMONY_MAINNET]: '',
  [ChainId.HARMONY_TESTNET]: ''
}

export const WEB_INTERFACES: { [chainId in ChainId]: string[] } = {
  [ChainId.MAINNET]: [''],
  [ChainId.RINKEBY]: [''],
  [ChainId.ROPSTEN]: [''],
  [ChainId.GÖRLI]: [''],
  [ChainId.KOVAN]: [''],
  [ChainId.BSC_MAINNET]: [],
  [ChainId.BSC_TESTNET]: [],
  [ChainId.HARMONY_MAINNET]: [],
  [ChainId.HARMONY_TESTNET]: []
}

export const TOKEN_LOGO_EXCEPTIONS: { [chainId in ChainId]: string[] } = {
  [ChainId.MAINNET]: [],
  [ChainId.RINKEBY]: [],
  [ChainId.ROPSTEN]: [],
  [ChainId.GÖRLI]: [],
  [ChainId.KOVAN]: [],
  [ChainId.BSC_MAINNET]: [
    '0x2C449bA613873e7B980FaF2b686207d7bd205541', // COBRA
    '0x45f785581e0787D3C0C62676ABc6f17783e021f0', // xCOBRA
    '0x7E080699D0F306dbAE458b13EA6fa8BfD0efe752' // 1VIPER
  ],
  [ChainId.BSC_TESTNET]: [],
  [ChainId.HARMONY_MAINNET]: [],
  [ChainId.HARMONY_TESTNET]: []
}

export const POOL_BACKGROUNDS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.KOVAN]: '',
  [ChainId.BSC_MAINNET]: '#c99212',
  [ChainId.BSC_TESTNET]: '#c99212',
  [ChainId.HARMONY_MAINNET]: '#02a2c4',
  [ChainId.HARMONY_TESTNET]: '#02a2c4'
}

export const UNLOCKING_STARTS: { [chainId in ChainId]: number | undefined } = {
  [ChainId.MAINNET]: undefined,
  [ChainId.RINKEBY]: undefined,
  [ChainId.ROPSTEN]: undefined,
  [ChainId.GÖRLI]: undefined,
  [ChainId.KOVAN]: undefined,
  [ChainId.BSC_MAINNET]: 15135850,
  [ChainId.BSC_TESTNET]: 16612200,
  [ChainId.HARMONY_MAINNET]: 22770895,
  [ChainId.HARMONY_TESTNET]: 21195000
}

export { PRELOADED_PROPOSALS } from './proposals'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
export const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const COMP = new Token(ChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound')
export const MKR = new Token(ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker')
export const AMPL = new Token(ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')
export const WBTC = new Token(ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC')

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 13
export const PROPOSAL_LENGTH_IN_BLOCKS = 40_320
export const PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [GOVERNANCE_ADDRESS]: 'Governance',
  [TIMELOCK_ADDRESS]: 'Timelock'
}

export const FALLBACK_GAS_LIMIT = BigNumber.from('6721900')
export const DEFAULT_GAS_PRICE = BigNumber.from('30000000000') // 30 gwei

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e'
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
  [ChainId.BSC_MAINNET]: [WETH[ChainId.BSC_MAINNET]],
  [ChainId.BSC_TESTNET]: [WETH[ChainId.BSC_TESTNET]],
  [ChainId.HARMONY_MAINNET]: [WETH[ChainId.HARMONY_MAINNET]],
  [ChainId.HARMONY_TESTNET]: [WETH[ChainId.HARMONY_TESTNET]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, COMP, MKR, WBTC],
  [ChainId.HARMONY_MAINNET]: [
    ...WETH_ONLY[ChainId.HARMONY_MAINNET],
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'BUSD'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, '1DAI'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, '1USDC'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, '1ETH'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WAGMI')
  ],
  [ChainId.BSC_MAINNET]: [
    ...WETH_ONLY[ChainId.BSC_MAINNET],
    getTokenWithDefault(ChainId.BSC_MAINNET, 'BUSD'),
    getTokenWithDefault(ChainId.BSC_MAINNET, 'USDT'),
    getTokenWithDefault(ChainId.BSC_MAINNET, 'USDC'),
    getTokenWithDefault(ChainId.BSC_MAINNET, 'COBRA')
  ]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
  }
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC],
  [ChainId.HARMONY_MAINNET]: [
    ...WETH_ONLY[ChainId.HARMONY_MAINNET],
    /*getTokenWithDefault(ChainId.HARMONY_MAINNET, '1DAI'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'BUSD'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, '1USDC'),*/
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WAGMI')
  ],
  [ChainId.BSC_MAINNET]: [
    ...WETH_ONLY[ChainId.BSC_MAINNET],
    getTokenWithDefault(ChainId.BSC_MAINNET, 'BUSD'),
    getTokenWithDefault(ChainId.BSC_MAINNET, 'USDT'),
    getTokenWithDefault(ChainId.BSC_MAINNET, 'USDC'),
    getTokenWithDefault(ChainId.BSC_MAINNET, 'COBRA')
  ]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC],
  [ChainId.HARMONY_MAINNET]: [
    ...WETH_ONLY[ChainId.HARMONY_MAINNET],
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'BUSD'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, '1DAI'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, '1USDC'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, '1ETH'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'VIPER'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'xVIPER'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WAGMI')
  ],
  [ChainId.BSC_MAINNET]: [
    ...WETH_ONLY[ChainId.BSC_MAINNET],
    getTokenWithDefault(ChainId.BSC_MAINNET, 'BUSD'),
    getTokenWithDefault(ChainId.BSC_MAINNET, 'USDT'),
    getTokenWithDefault(ChainId.BSC_MAINNET, 'USDC'),
    getTokenWithDefault(ChainId.BSC_MAINNET, 'COBRA'),
    getTokenWithDefault(ChainId.BSC_MAINNET, 'xCOBRA')
  ]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
      new Token(ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin')
    ],
    [USDC, USDT],
    [DAI, USDT]
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmaticIcon.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const JSBI_ZERO = JSBI.BigInt(0)
export const JSBI_ONE = JSBI.BigInt(1)
export const ZERO_FRACTION = new Fraction(JSBI_ZERO, JSBI_ONE)

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C',
  //https://home.treasury.gov/policy-issues/financial-sanctions/recent-actions/20220808
  '0x8589427373D6D84E98730D7795D8f6f8731FDA16',
  '0x722122dF12D4e14e13Ac3b6895a86e84145b6967',
  '0xDD4c48C0B24039969fC16D1cdF626eaB821d3384',
  '0xd90e2f925DA726b50C4Ed8D0Fb90Ad053324F31b',
  '0xd96f2B1c14Db8458374d9Aca76E26c3D18364307',
  '0x4736dCf1b7A3d580672CcE6E7c65cd5cc9cFBa9D',
  '0xD4B88Df4D29F5CedD6857912842cff3b20C8Cfa3',
  '0x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF',
  '0xA160cdAB225685dA1d56aa342Ad8841c3b53f291',
  '0xFD8610d20aA15b7B2E3Be39B396a1bC3516c7144',
  '0xF60dD140cFf0706bAE9Cd734Ac3ae76AD9eBC32A',
  '0x22aaA7720ddd5388A3c0A3333430953C68f1849b',
  '0xBA214C1c1928a32Bffe790263E38B4Af9bFCD659',
  '0xb1C8094B234DcE6e03f10a5b673c1d8C69739A00',
  '0x527653eA119F3E6a1F5BD18fbF4714081D7B31ce',
  '0x58E8dCC13BE9780fC42E8723D8EaD4CF46943dF2',
  '0xD691F27f38B395864Ea86CfC7253969B409c362d',
  '0xaEaaC358560e11f52454D997AAFF2c5731B6f8a6',
  '0x1356c899D8C9467C7f71C195612F8A395aBf2f0a',
  '0xA60C772958a3eD56c1F15dD055bA37AC8e523a0D',
  '0x169AD27A470D064DEDE56a2D3ff727986b15D52B',
  '0x0836222F2B2B24A3F36f98668Ed8F0B38D1a872f',
  '0xF67721A2D8F736E75a49FdD7FAd2e31D8676542a',
  '0x9AD122c22B14202B4490eDAf288FDb3C7cb3ff5E',
  '0x905b63Fff465B9fFBF41DeA908CEb12478ec7601',
  '0x07687e702b410Fa43f4cB4Af7FA097918ffD2730',
  '0x94A1B5CdB22c43faab4AbEb5c74999895464Ddaf',
  '0xb541fc07bC7619fD4062A54d96268525cBC6FfEF',
  '0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc',
  '0x47CE0C6eD5B0Ce3d3A51fdb1C52DC66a7c3c2936',
  '0x23773E65ed146A459791799d01336DB287f25334',
  '0xD21be7248e0197Ee08E0c20D4a96DEBdaC3D20Af',
  '0x610B717796ad172B316836AC95a2ffad065CeaB4',
  '0x178169B423a011fff22B9e3F3abeA13414dDD0F1',
  '0xbB93e510BbCD0B7beb5A853875f9eC60275CF498',
  '0x2717c5e28cf931547B621a5dddb772Ab6A35B701',
  '0x03893a7c7463AE47D46bc7f091665f1893656003',
  '0xCa0840578f57fE71599D29375e16783424023357',
  '0x58E8dCC13BE9780fC42E8723D8EaD4CF46943dF2',
  '0x8589427373D6D84E98730D7795D8f6f8731FDA16',
  '0x722122dF12D4e14e13Ac3b6895a86e84145b6967',
  '0xDD4c48C0B24039969fC16D1cdF626eaB821d3384',
  '0xd90e2f925DA726b50C4Ed8D0Fb90Ad053324F31b',
  '0xd96f2B1c14Db8458374d9Aca76E26c3D18364307',
  '0x4736dCf1b7A3d580672CcE6E7c65cd5cc9cFBa9D'
]

export const ASSET_HOST = 'https://raw.githubusercontent.com/VenomProtocol/assets/main'

export const BLOCKED_TOKENS: string[] = ['0xd6c08040db9d34932ba34c2ce10ed37b4667a96a'] // HRC20 Fortnite Token

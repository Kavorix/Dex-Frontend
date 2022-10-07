import { JSBI, Token, TokenAmount, Fraction } from '@venomswap/sdk'
import { PoolType } from '../../constants/staking/types'

export interface DefaultStakingPool {
  // the pool id (pid) of the pool
  pid: number
  // the pool order
  order: number
  // the tokens involved in this pair
  tokens: [Token, Token]
  // baseToken used for TVL & APR calculations
  baseToken?: Token
  // background token - what token to use for background/design elements
  bgToken?: Token
  // the allocation point for the given pool
  allocPoints: number
  // start block for all the rewards pools
  startBlock: number
  // base rewards per block
  baseRewardsPerBlock?: TokenAmount
  // pool specific rewards per block
  poolRewardsPerBlock?: TokenAmount
  // blocks generated per year
  blocksPerYear: JSBI
  // pool share vs all pools
  poolShare?: Fraction
  // the percentage of rewards locked
  lockedRewardsPercentageUnits: number
  // the percentage of rewards locked
  unlockedRewardsPercentageUnits: number
  // address of lpToken
  pairAddress?: string
  // the total supply of lp tokens in existence
  totalLpTokenSupply?: TokenAmount
  // the amount of currently total staked tokens in the pool
  totalStakedAmount?: TokenAmount
  // the amount of token currently staked, or undefined if no account
  stakedAmount?: TokenAmount
  // the ratio of the user's share of the pool
  stakedRatio?: Fraction
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount?: TokenAmount
  // the amount of reward token earned by the active account, or undefined if no account - which will be locked
  lockedEarnedAmount?: TokenAmount
  // the amount of reward token earned by the active account, or undefined if no account - which will be unlocked
  unlockedEarnedAmount?: TokenAmount
  // value of total staked amount, measured in weth
  valueOfTotalStakedAmountInWeth?: TokenAmount | Fraction
  // value of total staked amount, measured in a USD stable coin (busd, usdt, usdc or a mix thereof)
  valueOfTotalStakedAmountInUsd?: Fraction
  // pool APR
  apr?: Fraction
  // if pool is active
  active: boolean
}

export interface SmartChefStakingPool {
  // the pool id (pid) of the pool
  pid: number

  // the order of the pool
  order: number

  // the contract address of the pool
  address: string
  // the type of the pool
  poolType: PoolType

  // the staked token - if single staking
  stakedToken?: Token

  // the staked tokens - if a lp pair, used for display purposes
  stakedTokens?: [Token, Token]
  // the staked tokens - matching the exact order of the lp pair, used for calculations
  stakedTokensReserveOrder?: [Token, Token]

  // base token - if a lp pair
  baseToken?: Token

  // the reward token
  rewardToken: Token

  // background token - what token to use for background/design elements
  bgToken?: Token

  // The address of the lp pair
  pairAddress?: string

  // The category for the pool
  category?: string

  blocks: {
    // start block for the pool
    start: number
    // end block for the pool
    end: number
    // duration = difference between start and end block
    duration?: number
    // should show block countdown
    shouldShowCountdown?: boolean
    // blocks remaining until pool starts
    untilStart?: number
    // blocks remaining until pool ends
    remaining?: number
    // if pool has started
    started?: boolean
    // if pool has ended
    ended?: boolean
    // blocks to display in the ui
    toDisplay?: number
    // rewards per block
    rewardPerBlock?: TokenAmount
  }

  // the amount of currently total staked tokens in the pool
  totalStakedAmount?: TokenAmount

  // the amount of token currently staked, or undefined if no account
  stakedAmount?: TokenAmount

  // the ratio of the user's share of the pool
  stakedRatio?: Fraction

  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount?: TokenAmount

  // reward token rewards per block
  rewardPerBlock?: TokenAmount

  // blocks generated per year
  blocksPerYear: JSBI

  // value of total staked amount, measured in weth
  valueOfTotalStakedAmountInWeth?: TokenAmount | Fraction

  // value of total staked amount, measured in a USD stable coin (busd, usdt, usdc or a mix thereof)
  valueOfTotalStakedAmountInUsd?: Fraction

  // pool APR
  apr?: Fraction

  // what withdrawal method to use
  withdrawalMethod: string

  // if pool is active
  visible: boolean
}

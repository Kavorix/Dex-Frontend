import { Token } from '@venomswap/sdk'

export enum PoolType {
  Single,
  LP
}

export interface DefaultStakingPoolInfo {
  pid: number
  order: number
  tokens: [Token, Token]
  bgToken?: Token
  pairAddress: string
  allocPoints: number
  active: boolean
}

export interface SmartChefPoolInfo {
  pid: number
  order: number
  address: string
  poolType: PoolType
  stakedToken?: Token // Single staking

  stakedTokens?: [Token, Token] // Lp staking - for display
  stakedTokensReserveOrder?: [Token, Token] // Lp staking - reserve ordering matching the factory
  pairAddress?: string // Lp staking
  baseToken?: Token // Base token for the LP Pair

  category?: string

  rewardToken: Token

  bgToken?: Token

  rewardPerBlock: string
  blocks: {
    start: number
    end: number
  }
  withdrawalMethod: string
  visible: boolean
}

export interface PitInfo {
  pid: number
  tokens: [Token, Token]
}

import { SerializableFraction } from '../serialize'

export interface SerializableGovernanceTokenDetails {
  usdPrice?: SerializableFraction
  totalSupply?: string
  totalCirculatingSupply?: string
  totalMarketCap?: SerializableFraction
  totalCirculatingMarketCap?: SerializableFraction
  totalSupplyInPit?: string
}

export interface SerializableGovernanceTokenUserDetails {
  aggregatedBalance?: string
  unlockedBalance?: string
  lockedBalance?: string
  totalBalance?: string
  claimableUnlocked?: string
  claimableLocked?: string
}

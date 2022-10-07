import { Blockchain } from '@venomswap/sdk'

export default function generateTooltips(blockchain: Blockchain): Record<string, string> {
  const defaultToolTips: Record<string, string> = {
    unlockedRewards:
      'Unlocked pending rewards - 5% of your claimable rewards will be directly accessible upon claiming.',
    lockedRewards:
      'Locked pending rewards - 95% of your claimable rewards will be locked until block number 22770895. They will thereafter gradually unlock until block number 38538895.',
    lockedBalance:
      'Locked balance - Your locked balance will remain locked until block number 22770895. Your locked tokens will thereafter gradually unlock until block number 38538895.'
  }

  switch (blockchain) {
    case Blockchain.HARMONY:
      return defaultToolTips

    case Blockchain.BINANCE_SMART_CHAIN:
      return {
        unlockedRewards:
          'Unlocked pending rewards - 5% of your claimable rewards will be directly accessible upon claiming.',
        lockedRewards:
          'Locked pending rewards - 95% of your claimable rewards will be locked until 00:00:00 February 14th, 2022 (UTC). They will thereafter gradually unlock until February 14th, 2023.',
        lockedBalance:
          'Locked balance - Your locked balance will remain locked until 00:00:00 February 14th, 2022 (UTC). Your locked tokens will thereafter gradually unlock until February 14th, 2023.'
      }

    default:
      return defaultToolTips
  }
}

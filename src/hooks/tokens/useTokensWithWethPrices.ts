import { ChainId, WETH, Token, Blockchain } from '@venomswap/sdk'
import { useMemo } from 'react'
import useGovernanceToken from './useGovernanceToken'
import usePitToken from './usePitToken'
import useTokenWethPrice from '../useTokenWethPrice'
import useBlockchain from '../useBlockchain'
import getToken from '../../utils/getToken'
import { useActiveWeb3React } from '../index'

export default function useTokensWithWethPrices(): Record<string, any> {
  const { chainId } = useActiveWeb3React()
  const blockchain = useBlockchain()

  const weth = chainId && WETH[chainId]

  const govToken = useGovernanceToken()
  const govTokenWETHPrice = useTokenWethPrice(govToken)

  const pitToken = usePitToken()
  const pitTokenWETHPrice = useTokenWethPrice(pitToken)

  const BUSDTicker = chainId !== ChainId.HARMONY_TESTNET ? 'BUSD' : '1BUSD'
  const BUSD: Token | undefined = getToken(chainId, BUSDTicker)
  const BUSDWETHPrice = useTokenWethPrice(BUSD)

  const USDCTicker = blockchain === Blockchain.HARMONY ? '1USDC' : 'USDC'
  const USDC: Token | undefined = getToken(chainId, USDCTicker)
  const USDCWETHPrice = useTokenWethPrice(USDC)

  const DAITicker = blockchain === Blockchain.HARMONY ? '1DAI' : 'DAI'
  const DAI: Token | undefined = getToken(chainId, DAITicker)
  const DAIWETHPrice = useTokenWethPrice(DAI)

  const ONEUSD: Token | undefined = getToken(chainId, 'ONEUSD')
  const ONEUSDWETHPrice = useTokenWethPrice(ONEUSD)

  // Harmony specific tokens
  const bscBUSD: Token | undefined = blockchain === Blockchain.HARMONY ? getToken(chainId, 'bscBUSD') : undefined
  let bscBUSDWETHPrice = useTokenWethPrice(bscBUSD)
  bscBUSDWETHPrice = bscBUSDWETHPrice ? bscBUSDWETHPrice : BUSDWETHPrice

  const bscUSDC: Token | undefined = blockchain === Blockchain.HARMONY ? getToken(chainId, 'bscUSDC') : undefined
  let bscUSDCWETHPrice = useTokenWethPrice(bscUSDC)
  bscUSDCWETHPrice = bscUSDCWETHPrice ? bscUSDCWETHPrice : USDCWETHPrice

  const bscDAI: Token | undefined = blockchain === Blockchain.HARMONY ? getToken(chainId, 'bscDAI') : undefined
  let bscDAIWETHPrice = useTokenWethPrice(bscDAI)
  bscDAIWETHPrice = bscDAIWETHPrice ? bscDAIWETHPrice : DAIWETHPrice

  const bridgedETH: Token | undefined = Blockchain.HARMONY ? getToken(chainId, '1ETH') : undefined
  const bridgedETHWETHPrice = useTokenWethPrice(bridgedETH)

  const bridgedBscETH: Token | undefined = Blockchain.HARMONY ? getToken(chainId, 'bscETH') : undefined
  let bridgedBscETHWETHPrice = useTokenWethPrice(bridgedBscETH)
  bridgedBscETHWETHPrice = bridgedBscETHWETHPrice ? bridgedBscETHWETHPrice : bridgedETHWETHPrice

  const bridgedBTC: Token | undefined = Blockchain.HARMONY ? getToken(chainId, '1WBTC') : undefined
  const bridgedBTCWETHPrice = useTokenWethPrice(bridgedBTC)

  const bridgedBscBTC: Token | undefined = Blockchain.HARMONY ? getToken(chainId, 'bscBTCB') : undefined
  let bridgedBscBTCWETHPrice = useTokenWethPrice(bridgedBscBTC)
  bridgedBscBTCWETHPrice = bridgedBscBTCWETHPrice ? bridgedBscBTCWETHPrice : bridgedBTCWETHPrice

  // BSC
  const bridgedVIPER: Token | undefined = Blockchain.BINANCE_SMART_CHAIN ? getToken(chainId, '1VIPER') : undefined
  const bridgedVIPERWETHPrice = useTokenWethPrice(bridgedVIPER)

  return useMemo(() => {
    return {
      WETH: { token: weth, price: undefined },
      govToken: { token: govToken, price: govTokenWETHPrice },
      pitToken: { token: pitToken, price: pitTokenWETHPrice },
      BUSD: { token: BUSD, price: BUSDWETHPrice },
      USDC: { token: USDC, price: USDCWETHPrice },
      DAI: { token: DAI, price: DAIWETHPrice },
      ONEUSD: { token: ONEUSD, price: ONEUSDWETHPrice },
      bscBUSD: { token: bscBUSD, price: bscBUSDWETHPrice },
      bscUSDC: { token: bscUSDC, price: bscUSDCWETHPrice },
      bscDAI: { token: bscDAI, price: bscDAIWETHPrice },
      bridgedETH: { token: bridgedETH, price: bridgedETHWETHPrice },
      bridgedBscETH: { token: bridgedBscETH, price: bridgedBscETHWETHPrice },
      bridgedBTC: { token: bridgedBTC, price: bridgedBTCWETHPrice },
      bridgedBscBTC: { token: bridgedBscBTC, price: bridgedBscBTCWETHPrice },
      bridgedVIPER: { token: bridgedVIPER, price: bridgedVIPERWETHPrice }
    }
  }, [
    chainId,
    blockchain,
    weth,
    govToken,
    govTokenWETHPrice,
    pitToken,
    pitTokenWETHPrice,
    BUSD,
    BUSDWETHPrice,
    USDC,
    USDCWETHPrice,
    bscBUSD,
    bscBUSDWETHPrice,
    bridgedETH,
    bridgedETHWETHPrice
  ])
}

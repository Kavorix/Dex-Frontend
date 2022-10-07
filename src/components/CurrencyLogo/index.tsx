import { getAddress } from 'ethers/lib/utils'
import { ChainId, Currency, Token, ETHER, HARMONY, BINANCE_COIN, DEFAULT_CURRENCIES, Blockchain } from '@venomswap/sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import HarmonyLogo from '../../assets/images/harmony-logo.png'
import BinanceLogo from '../../assets/images/binance-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'
import baseCurrencies from '../../utils/baseCurrencies'
import useBlockchain from '../../hooks/useBlockchain'
import { ASSET_HOST, TOKEN_LOGO_EXCEPTIONS } from '../../constants'

export function getTokenLogoURL(token: Token): string {
  const address = getAddress(token.address)
  const tokenExceptions = TOKEN_LOGO_EXCEPTIONS[token.chainId]

  switch (token.chainId) {
    case ChainId.BSC_MAINNET:
    case ChainId.BSC_TESTNET:
      return tokenExceptions.includes(address)
        ? `${ASSET_HOST}/tokens/${token.symbol}.png`
        : `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`

    case ChainId.HARMONY_MAINNET:
    case ChainId.HARMONY_TESTNET:
      return `${ASSET_HOST}/tokens/${token.symbol}.png`

    default:
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
  }
}

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const blockchain = useBlockchain()
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency && DEFAULT_CURRENCIES.includes(currency)) return []

    if (currency instanceof Token) {
      const logoUrlLocation = getTokenLogoURL(currency)

      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, logoUrlLocation]
      }
      return [logoUrlLocation]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  } else {
    const wrappedCurrency = currency instanceof Token ? baseCurrencies(currency.chainId)[1] : undefined
    if (currency === HARMONY || currency === (wrappedCurrency && blockchain === Blockchain.HARMONY)) {
      return <StyledEthereumLogo src={HarmonyLogo} size={size} style={style} />
    } else if (
      currency === BINANCE_COIN ||
      (currency === wrappedCurrency && blockchain === Blockchain.BINANCE_SMART_CHAIN)
    ) {
      return <StyledEthereumLogo src={BinanceLogo} size={size} style={style} />
    }
  }
  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}

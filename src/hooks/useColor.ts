import { useState, useLayoutEffect } from 'react'
import { shade } from 'polished'
import Vibrant from 'node-vibrant'
import { hex } from 'wcag-contrast'
import { Token, ChainId } from '@venomswap/sdk'
import uriToHttp from 'utils/uriToHttp'
import { ASSET_HOST, POOL_BACKGROUNDS } from '../constants'
import { useActiveWeb3React } from '../hooks'

async function getColorFromToken(token: Token): Promise<string | null> {
  if (token.chainId === ChainId.RINKEBY && token.address === '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735') {
    return Promise.resolve('#FAAB14')
  }

  const path = [ChainId.BSC_MAINNET, ChainId.BSC_TESTNET, ChainId.HARMONY_MAINNET, ChainId.HARMONY_TESTNET].includes(
    token.chainId
  )
    ? `${ASSET_HOST}/tokens/${token.symbol}.png`
    : `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token.address}/logo.png`

  return Vibrant.from(path)
    .getPalette()
    .then(palette => {
      if (palette?.Vibrant) {
        let detectedHex = palette.Vibrant.hex
        let AAscore = hex(detectedHex, '#FFF')
        while (AAscore < 3) {
          detectedHex = shade(0.005, detectedHex)
          AAscore = hex(detectedHex, '#FFF')
        }
        return detectedHex
      }
      return null
    })
    .catch(() => null)
}

async function getColorFromUriPath(uri: string): Promise<string | null> {
  const formattedPath = uriToHttp(uri)[0]

  return Vibrant.from(formattedPath)
    .getPalette()
    .then(palette => {
      if (palette?.Vibrant) {
        return palette.Vibrant.hex
      }
      return null
    })
    .catch(() => null)
}

export function useColor(token?: Token) {
  const { chainId } = useActiveWeb3React()
  const activeChainId = token?.chainId ?? chainId
  const defaultBackgroundColor = activeChainId ? POOL_BACKGROUNDS[activeChainId] : '#02a2c4'
  const [color, setColor] = useState(defaultBackgroundColor)

  useLayoutEffect(() => {
    let stale = false

    if (token) {
      getColorFromToken(token).then(tokenColor => {
        if (!stale && tokenColor !== null) {
          setColor(tokenColor)
        }
      })
    }

    return () => {
      stale = true
      setColor(defaultBackgroundColor)
    }
  }, [token])

  return color
}

export function useListColor(listImageUri?: string) {
  const [color, setColor] = useState('#02a2c4')

  useLayoutEffect(() => {
    let stale = false

    if (listImageUri) {
      getColorFromUriPath(listImageUri).then(color => {
        if (!stale && color !== null) {
          setColor(color)
        }
      })
    }

    return () => {
      stale = true
      setColor('#02a2c4')
    }
  }, [listImageUri])

  return color
}

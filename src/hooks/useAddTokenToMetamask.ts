import { getTokenLogoURL } from './../components/CurrencyLogo/index'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { Currency, Token } from '@venomswap/sdk'
import { useCallback, useState } from 'react'
import { useActiveWeb3React } from 'hooks'

export default function useAddTokenToMetamask(
  currencyToAdd: Currency | undefined
): { addToken: () => void; success: boolean | undefined } {
  const { library, chainId } = useActiveWeb3React()

  const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)

  const usingMetaMask = (library !== undefined &&
    library.provider.isMetaMask &&
    library.provider.request !== undefined &&
    token !== undefined) as boolean

  const [success, setSuccess] = useState<boolean | undefined>(usingMetaMask)

  const addToken = useCallback(() => {
    if (library && library.provider.isMetaMask && library.provider.request && token) {
      library.provider
        .request({
          method: 'wallet_watchAsset',
          params: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore // need this for incorrect ethers provider type
            type: 'ERC20',
            options: {
              address: token.address,
              symbol: token.symbol,
              decimals: token.decimals,
              image: getTokenLogoURL(token)
            }
          }
        })
        .then(successResponse => {
          setSuccess(successResponse)
        })
        .catch(() => {
          setSuccess(false)
        })
    } else {
      setSuccess(false)
    }
  }, [library, token])

  return { addToken, success }
}

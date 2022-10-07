import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { totalLiquidityUSD } from './queries'

class Client {
  private subgraphUrl: string
  public client: ApolloClient<NormalizedCacheObject>

  constructor(subgraphUrl: string) {
    this.subgraphUrl = subgraphUrl

    this.client = new ApolloClient({
      link: new HttpLink({
        uri: this.subgraphUrl,
        fetch: fetch
      }),
      cache: new InMemoryCache()
    })
  }

  public async totalLiquidity(): Promise<any> {
    try {
      let totalLiqUSD = undefined

      const result = await this.client.query({
        query: totalLiquidityUSD,
        /*variables: {
          factoryAddress: factoryAddress
        },*/
        fetchPolicy: 'cache-first'
      })

      totalLiqUSD = result?.data?.uniswapFactories?.[0]?.totalLiquidityUSD

      return totalLiqUSD
    } catch (error) {
      console.log(error)
    }
  }
}

export default Client

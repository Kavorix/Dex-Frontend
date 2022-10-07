import gql from 'graphql-tag'
export const totalLiquidityUSD = gql`
  query totalLiquidityUSD {
    uniswapFactories(first: 1) {
      totalLiquidityUSD
    }
  }
`

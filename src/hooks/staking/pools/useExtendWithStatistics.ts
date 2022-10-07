import { JSBI, TokenAmount, Pair, Fraction } from '@venomswap/sdk'
import { useMemo } from 'react'
import { useActiveWeb3React } from '../../index'
import { useSingleCallResult, useSingleContractMultipleData } from '../../../state/multicall/hooks'
import { useMasterBreederContract } from '../../useContract'
import { useMultipleContractSingleData } from '../../../state/multicall/hooks'
import { abi as IUniswapV2PairABI } from '@venomswap/core/build/IUniswapV2Pair.json'
import { Interface } from '@ethersproject/abi'
import useTokensWithWethPrices from '../../tokens/useTokensWithWethPrices'
import useBUSDPrice from '../../useBUSDPrice'
import getBlocksPerYear from '../../../utils/getBlocksPerYear'
import calculateWethAdjustedTotalStakedAmount from '../../../utils/calculateWethAdjustedTotalStakedAmount'
import calculateApr from '../../../utils/staking/apr/calculateApr'
import { validCalls } from '../../../utils/validStakingInfo'
import determineBaseToken from '../../../utils/determineBaseToken'
import { DefaultStakingPool } from '../../../state/stake/types'

const PAIR_INTERFACE = new Interface(IUniswapV2PairABI)

export function useExtendWithStatistics(stakingInfos: DefaultStakingPool[]): DefaultStakingPool[] {
  const { chainId, account } = useActiveWeb3React()
  const masterBreederContract = useMasterBreederContract()

  const tokensWithPrices = useTokensWithWethPrices()

  const weth = tokensWithPrices?.WETH?.token
  const wethBusdPrice = useBUSDPrice(weth)
  const govToken = tokensWithPrices?.govToken?.token
  const govTokenWETHPrice = tokensWithPrices?.govToken?.price

  const blocksPerYear = getBlocksPerYear(chainId)

  const pids = useMemo(() => stakingInfos.map(({ pid }) => pid), [stakingInfos])

  const pidAccountMapping = useMemo(
    () => stakingInfos.map(({ pid }) => (account ? [pid, account] : [undefined, undefined])),
    [stakingInfos, account]
  )

  const userInfos = useSingleContractMultipleData(masterBreederContract, 'userInfo', pidAccountMapping)

  const poolInfos = useSingleContractMultipleData(
    masterBreederContract,
    'poolInfo',
    pids.map(pids => [pids])
  )

  const lpTokenAddresses = useMemo(() => {
    return poolInfos.reduce<string[]>((memo, poolInfo) => {
      if (poolInfo && !poolInfo.loading && poolInfo.result) {
        const [lpTokenAddress] = poolInfo.result
        memo.push(lpTokenAddress)
      }
      return memo
    }, [])
  }, [poolInfos])

  const lpTokenTotalSupplies = useMultipleContractSingleData(lpTokenAddresses, PAIR_INTERFACE, 'totalSupply')
  const lpTokenReserves = useMultipleContractSingleData(lpTokenAddresses, PAIR_INTERFACE, 'getReserves')
  const lpTokenBalances = useMultipleContractSingleData(lpTokenAddresses, PAIR_INTERFACE, 'balanceOf', [
    masterBreederContract?.address
  ])

  // getNewRewardPerBlock uses pid = 0 to return the base rewards
  // poolIds have to be +1'd to map to their actual pid
  // also include pid 0 to get the base emission rate
  let adjustedPids = pids.map(pid => pid + 1)
  adjustedPids = [...[0], ...adjustedPids]

  const poolRewardsPerBlock = useSingleContractMultipleData(
    masterBreederContract,
    'getNewRewardPerBlock',
    adjustedPids.map(adjustedPids => [adjustedPids])
  )

  //const poolLength = useSingleCallResult(masterBreederContract, 'poolLength')
  const startBlock = useSingleCallResult(masterBreederContract, 'START_BLOCK')
  const lockRewardsRatio = useSingleCallResult(masterBreederContract, 'PERCENT_LOCK_BONUS_REWARD')
  //const rewardPerBlock = useSingleCallResult(masterBreederContract, 'REWARD_PER_BLOCK')

  return useMemo(() => {
    if (!chainId || !weth || !govToken) return []

    return pids.reduce<DefaultStakingPool[]>((memo, pid, index) => {
      const stakingInfo = stakingInfos[index]
      const tokens = stakingInfo.tokens
      const poolInfo = poolInfos[index]

      const lpTokenTotalSupply = lpTokenTotalSupplies[index]
      const lpTokenReserve = lpTokenReserves[index]
      const lpTokenBalance = lpTokenBalances[index]

      // poolRewardsPerBlock indexes have to be +1'd to get the actual specific pool data
      const baseRewardsPerBlock = poolRewardsPerBlock[0]
      const specificPoolRewardsPerBlock = poolRewardsPerBlock[index + 1]

      if (
        validCalls([
          poolInfo,
          specificPoolRewardsPerBlock,
          lockRewardsRatio,
          lpTokenTotalSupply,
          lpTokenReserve,
          lpTokenBalance,
          startBlock
        ])
      ) {
        const baseBlockRewards = new TokenAmount(govToken, JSBI.BigInt(baseRewardsPerBlock?.result?.[0] ?? 0))

        const poolBlockRewards = specificPoolRewardsPerBlock?.result?.[0]
          ? new TokenAmount(govToken, JSBI.BigInt(specificPoolRewardsPerBlock?.result?.[0] ?? 0))
          : baseBlockRewards

        const poolShare = new Fraction(poolBlockRewards.raw, baseBlockRewards.raw)

        const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))
        const totalStakedAmount = new TokenAmount(
          dummyPair.liquidityToken,
          JSBI.BigInt(lpTokenBalance.result?.[0] ?? 0)
        )

        const totalLpTokenSupply = new TokenAmount(
          dummyPair.liquidityToken,
          JSBI.BigInt(lpTokenTotalSupply.result?.[0] ?? 0)
        )

        const baseToken = determineBaseToken(tokensWithPrices, tokens)

        const totalStakedAmountWETH = calculateWethAdjustedTotalStakedAmount(
          chainId,
          baseToken,
          tokensWithPrices,
          tokens,
          totalLpTokenSupply,
          totalStakedAmount,
          lpTokenReserve?.result
        )

        const totalStakedAmountBUSD =
          wethBusdPrice && totalStakedAmountWETH && totalStakedAmountWETH.multiply(wethBusdPrice?.raw)

        const apr = totalStakedAmountWETH
          ? calculateApr(govTokenWETHPrice, baseBlockRewards, blocksPerYear, poolShare, totalStakedAmountWETH)
          : undefined

        stakingInfo.baseToken = baseToken
        stakingInfo.baseRewardsPerBlock = baseBlockRewards
        stakingInfo.poolRewardsPerBlock = poolBlockRewards
        stakingInfo.blocksPerYear = blocksPerYear
        stakingInfo.poolShare = poolShare
        stakingInfo.totalLpTokenSupply = totalLpTokenSupply
        stakingInfo.totalStakedAmount = totalStakedAmount
        stakingInfo.valueOfTotalStakedAmountInWeth = totalStakedAmountWETH
        stakingInfo.valueOfTotalStakedAmountInUsd = totalStakedAmountBUSD
        stakingInfo.apr = apr

        memo.push(stakingInfo)
      }
      return memo
    }, [])
  }, [
    chainId,
    stakingInfos,
    tokensWithPrices,
    weth,
    govToken,
    govTokenWETHPrice,
    pids,
    poolInfos,
    userInfos,
    lpTokenTotalSupplies,
    lpTokenReserves,
    lpTokenBalances,
    blocksPerYear,
    startBlock,
    lockRewardsRatio,
    poolRewardsPerBlock
  ])
}

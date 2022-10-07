import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Blockchain } from '@venomswap/sdk'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import AddressClaimModal from '../components/claim/AddressClaimModal'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
//import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { ApplicationModal } from '../state/application/actions'
import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import Earn from './Staking/Pools'
import EarnArchived from './Staking/Pools/Archived'
import Manage from './Staking/Pools/Manage'
import SmartChefSingleEarn from './Staking/SmartChef/Single'
import SmartChefSingleEarnArchived from './Staking/SmartChef/Single/Archived'
import SmartChefSingleManage from './Staking/SmartChef/Single/Manage'
import SmartChefLPEarn from './Staking/SmartChef/LiquidityPools'
import SmartChefLPEarnArchived from './Staking/SmartChef/LiquidityPools/Archived'
import SmartChefLPManage from './Staking/SmartChef/LiquidityPools/Manage'
import Pit from './Staking/Pit'
import Unlock from './Staking/Unlock'
import MigrateV1 from './MigrateV1'
import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange'
import RemoveV1Exchange from './MigrateV1/RemoveV1Exchange'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import { OpenClaimAddressModalAndRedirectToSwap, RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import Vote from './Vote'
import VotePage from './Vote/VotePage'
import { PIT_SETTINGS } from '../constants'
import { useActiveWeb3React } from '../hooks'
//import usePlatformName from '../hooks/usePlatformName'
import useBlockchain from '../hooks/useBlockchain'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 100px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  return <AddressClaimModal isOpen={open} onDismiss={toggle} />
}

export default function App() {
  const { chainId } = useActiveWeb3React()
  const blockchain = useBlockchain()
  const pitSettings = chainId ? PIT_SETTINGS[chainId] : undefined
  /*const platformName = usePlatformName()

  useEffect(() => {
    document.title = platformName
  }, [platformName])*/

  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <Popups />
          <Polling />
          <TopLevelModals />
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/swap" component={Swap} />
              <Route exact strict path="/claim" component={OpenClaimAddressModalAndRedirectToSwap} />
              <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
              <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
              <Route exact strict path="/find" component={PoolFinder} />
              <Route exact strict path="/pool" component={Pool} />
              <Route exact strict path="/staking/pools" component={Earn} />
              <Route exact strict path="/staking/pools/archived" component={EarnArchived} />
              {[Blockchain.HARMONY, Blockchain.BINANCE_SMART_CHAIN].includes(blockchain) && (
                <Route exact strict path="/staking/single" component={SmartChefSingleEarn} />
              )}
              {[Blockchain.HARMONY, Blockchain.BINANCE_SMART_CHAIN].includes(blockchain) && (
                <Route exact strict path="/staking/single/archived" component={SmartChefSingleEarnArchived} />
              )}
              {blockchain === Blockchain.HARMONY && (
                <Route exact strict path="/staking/bridge" render={props => <SmartChefLPEarn category={'bridge'} />} />
              )}
              {blockchain === Blockchain.HARMONY && (
                <Route
                  exact
                  strict
                  path="/staking/bridge/archived"
                  render={props => <SmartChefLPEarnArchived category={'bridge'} />}
                />
              )}
              {blockchain === Blockchain.HARMONY && (
                <Route
                  exact
                  strict
                  path="/staking/community"
                  render={props => <SmartChefLPEarn category={'community'} />}
                />
              )}
              {blockchain === Blockchain.HARMONY && (
                <Route
                  exact
                  strict
                  path="/staking/community/archived"
                  render={props => <SmartChefLPEarnArchived category={'community'} />}
                />
              )}
              <Route exact strict path={'/staking' + pitSettings?.path} component={Pit} />
              <Route exact strict path="/staking/unlock" component={Unlock} />
              {blockchain === Blockchain.ETHEREUM && <Route exact strict path="/vote" component={Vote} />}
              <Route exact strict path="/create" component={RedirectToAddLiquidity} />
              <Route exact path="/add" component={AddLiquidity} />
              <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact path="/create" component={AddLiquidity} />
              <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact strict path="/remove/v1/:address" component={RemoveV1Exchange} />
              <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
              <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
              <Route exact strict path="/migrate/v1" component={MigrateV1} />
              <Route exact strict path="/migrate/v1/:address" component={MigrateV1Exchange} />
              <Route exact strict path="/staking/pools/:currencyIdA/:currencyIdB" component={Manage} />
              {[Blockchain.HARMONY, Blockchain.BINANCE_SMART_CHAIN].includes(blockchain) && (
                <Route exact strict path="/staking/single/:address" component={SmartChefSingleManage} />
              )}
              {blockchain === Blockchain.HARMONY && (
                <Route exact strict path="/staking/:category/:address" component={SmartChefLPManage} />
              )}
              {blockchain === Blockchain.ETHEREUM && <Route exact strict path="/vote/:id" component={VotePage} />}
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  )
}

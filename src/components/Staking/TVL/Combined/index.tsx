import React from 'react'
import { useActiveWeb3React } from '../../../../hooks'
import useOptimizedTotalCombinedTVL from '../../../../hooks/tvl/useOptimizedTotalCombinedTVL'
import { CustomMouseoverTooltip } from '../../../Tooltip/custom'
import { PIT_SETTINGS, NEST_SETTINGS, DISPLAY_TVL } from '../../../../constants'
import { TYPE } from '../../../../theme'
import useFilterSmartChefStakingPoolInfos from '../../../../hooks/staking/smartChef/useFilterSmartChefStakingPoolInfos'
//import { DefaultStakingPool } from '../../state/stake/types'

/*interface CombinedTVLProps {
  stakingInfos: DefaultStakingPool[]
}*/

export default function CombinedTVL({}) {
  const { chainId } = useActiveWeb3React()
  const pitSettings = chainId ? PIT_SETTINGS[chainId] : undefined
  const nestSettings = chainId ? NEST_SETTINGS[chainId] : undefined
  const singleStakingPools = useFilterSmartChefStakingPoolInfos(chainId, 'single', true)
  const TVLs = useOptimizedTotalCombinedTVL(chainId)
  const singleStakingTVLEnabled = singleStakingPools.length > 0
  const displayTVL =
    DISPLAY_TVL &&
    TVLs &&
    TVLs.stakingPoolTVL?.greaterThan('0') &&
    TVLs.totalPitTVL?.greaterThan('0') &&
    TVLs.totalCombinedTVL?.greaterThan('0') &&
    ((singleStakingTVLEnabled && TVLs?.totalNestTVL?.greaterThan('0')) || !singleStakingTVLEnabled)

  /*const [shouldDisplay, setShouldDisplay] = useState(false)

  const waitBeforeDisplaying = 3000

  useEffect(() => {
    setTimeout(() => {
      setShouldDisplay(true)
    }, waitBeforeDisplaying)
  }, [waitBeforeDisplaying])*/

  return (
    <>
      {TVLs && displayTVL && (
        <TYPE.black style={{ marginTop: '0.5rem' }}>
          <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
            🏆
          </span>

          <CustomMouseoverTooltip
            element={
              <>
                {TVLs.stakingPoolTVL?.greaterThan('0') && (
                  <>
                    <b>LP Pools:</b> $
                    {TVLs.stakingPoolTVL.toSignificant(8, {
                      groupSeparator: ','
                    })}
                    <br />
                  </>
                )}
                {TVLs.totalNestTVL?.greaterThan('0') && (
                  <>
                    <b>{nestSettings?.name}:</b> ${TVLs.totalNestTVL.toSignificant(8, { groupSeparator: ',' })}
                    <br />
                  </>
                )}
                {TVLs.totalPitTVL?.greaterThan('0') && (
                  <>
                    <b>{pitSettings?.name}:</b> ${TVLs.totalPitTVL.toSignificant(8, { groupSeparator: ',' })}
                    <br />
                  </>
                )}
                {TVLs.totalCombinedTVL?.greaterThan('0') && (
                  <>
                    <b>Total:</b> ${TVLs.totalCombinedTVL.toSignificant(8, { groupSeparator: ',' })}
                  </>
                )}
              </>
            }
          >
            <>TVL: ${TVLs.totalCombinedTVL.toSignificant(8, { groupSeparator: ',' })}</>
          </CustomMouseoverTooltip>
        </TYPE.black>
      )}
    </>
  )
}

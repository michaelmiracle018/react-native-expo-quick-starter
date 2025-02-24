/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react'
import {useNonReactiveCallback} from '~/hooks/useNonReactiveCallback'
import {Orederprops, WithdrawalChargesProps} from '~/types'

export interface ClearCacheModal {
  name: 'clear-cache-modal'
}

export interface LogoutModal {
  name: 'logout-modal'
}

export interface OfflinePayModal {
  name: 'offline-pay-modal'
  singleOrderData: Orederprops | null
  _id: string
  refetchSingleOrder: () => void
}

export interface WithdrawalInformationModal {
  name: 'withdrawal-information-modal'
  newCalculatedCharges: WithdrawalChargesProps
  watchAmount: string | undefined
  walletId: string
  amount: string | undefined
  reset: () => void
  watchPaymentMethod: string
}

export type Modal =
  | ClearCacheModal
  | LogoutModal
  | OfflinePayModal
  | WithdrawalInformationModal

const DetachModalContext = React.createContext<{
  isModalActive: boolean
  activeModals: Modal[]
}>({
  isModalActive: false,
  activeModals: [],
})

const DetachModalControlContext = React.createContext<{
  openDetachModal: (modal: Modal) => void
  closeDetachModal: () => boolean
  closeAllDetachModals: () => boolean
}>({
  openDetachModal: () => {},
  closeDetachModal: () => false,
  closeAllDetachModals: () => false,
})

/**
 * @deprecated DO NOT USE THIS unless you have no other choice.
 */
export let unstable__openModal: (modal: Modal) => void = () => {
  throw new Error(`DetachModalContext is not initialized`)
}

/**
 * @deprecated DO NOT USE THIS unless you have no other choice.
 */
export let unstable__closeModal: () => boolean = () => {
  throw new Error(`DetachModalContext is not initialized`)
}

export function Provider({children}: React.PropsWithChildren<{}>) {
  const [activeModals, setActiveModals] = React.useState<Modal[]>([])

  const openDetachModal = useNonReactiveCallback((modal: Modal) => {
    setActiveModals(modals => [...modals, modal])
  })

  const closeDetachModal = useNonReactiveCallback(() => {
    let wasActive = activeModals.length > 0
    setActiveModals(modals => {
      return modals.slice(0, -1)
    })
    return wasActive
  })

  const closeAllDetachModals = useNonReactiveCallback(() => {
    let wasActive = activeModals.length > 0
    setActiveModals([])
    return wasActive
  })

  unstable__openModal = openDetachModal
  unstable__closeModal = closeDetachModal

  const state = React.useMemo(
    () => ({
      isModalActive: activeModals.length > 0,
      activeModals,
    }),
    [activeModals],
  )

  const methods = React.useMemo(
    () => ({
      openDetachModal,
      closeDetachModal,
      closeAllDetachModals,
    }),
    [openDetachModal, closeDetachModal, closeAllDetachModals],
  )

  return (
    <DetachModalContext.Provider value={state}>
      <DetachModalControlContext.Provider value={methods}>
        {children}
      </DetachModalControlContext.Provider>
    </DetachModalContext.Provider>
  )
}

export function useDetachModals() {
  return React.useContext(DetachModalContext)
}

export function useDetachModalControls() {
  return React.useContext(DetachModalControlContext)
}

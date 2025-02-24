/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react'
import {useNonReactiveCallback} from '~/hooks/useNonReactiveCallback'
import {NumberDecimal, Orederprops, WithdrawalChargesProps} from '~/types'

export interface LanguageSettingsModal {
  name: 'language-settings-modal'
}

export interface OfflineUpdateSenderNameOrderModal {
  name: 'update-sender-name-order-modal'
  setUpdatedData: (value: Orederprops) => void
  refetchSingleOrder: () => void
  _id: string
}

export interface TransactionHistoryModal {
  name: 'transaction-history-modal'
}

export interface MessageModal {
  name: 'message-modal'
}

export interface ConfirmOrderPaymentModal {
  name: 'confirm-order-payment-modal'
  singleOrderData: Orederprops | null
  _id: string
  refetchSingleOrder: () => void
}
export interface ClearCacheModal {
  name: 'clear-cache-modal'
}

export interface LockModal {
  name: 'lock-modal'
}

export interface BalanceModal {
  name: 'balance-modal'
  showBalance: boolean
  _id: string
  currency: string
  currentBalance: NumberDecimal | any
  flagEmoji: string
  currencyShortHand: string
  loginUserID: string
  accountType: string
  symbol: string
  walletType: string
  toWalletId?: string
  fromWalletId?: string
}

export interface SingleQuoteModal {
  name: 'single-quote-modal'
  id: string
  handleEditAdvert: () => void
  refetch: () => void
}

export interface VerifyUserModal {
  name: 'verify-user-modal'
}

export interface SetAppPinModal {
  name: 'set-app-modal'
  userID: string | undefined
}

export type Modal =
  // languages
  | LanguageSettingsModal
  | SingleQuoteModal
  | BalanceModal
  | LockModal
  | TransactionHistoryModal
  | ConfirmOrderPaymentModal
  | ClearCacheModal
  | OfflineUpdateSenderNameOrderModal
  | VerifyUserModal
  | SetAppPinModal
  | MessageModal

const ModalContext = React.createContext<{
  isModalActive: boolean
  activeModals: Modal[]
}>({
  isModalActive: false,
  activeModals: [],
})

const ModalControlContext = React.createContext<{
  openModal: (modal: Modal) => void
  closeModal: () => boolean
  closeAllModals: () => boolean
}>({
  openModal: () => {},
  closeModal: () => false,
  closeAllModals: () => false,
})

/**
 * @deprecated DO NOT USE THIS unless you have no other choice.
 */
export let unstable__openModal: (modal: Modal) => void = () => {
  throw new Error(`ModalContext is not initialized`)
}

/**
 * @deprecated DO NOT USE THIS unless you have no other choice.
 */
export let unstable__closeModal: () => boolean = () => {
  throw new Error(`ModalContext is not initialized`)
}

export function Provider({children}: React.PropsWithChildren<{}>) {
  const [activeModals, setActiveModals] = React.useState<Modal[]>([])

  const openModal = useNonReactiveCallback((modal: Modal) => {
    setActiveModals(modals => [...modals, modal])
  })

  const closeModal = useNonReactiveCallback(() => {
    let wasActive = activeModals.length > 0
    setActiveModals(modals => {
      return modals.slice(0, -1)
    })
    return wasActive
  })

  const closeAllModals = useNonReactiveCallback(() => {
    let wasActive = activeModals.length > 0
    setActiveModals([])
    return wasActive
  })

  unstable__openModal = openModal
  unstable__closeModal = closeModal

  const state = React.useMemo(
    () => ({
      isModalActive: activeModals.length > 0,
      activeModals,
    }),
    [activeModals],
  )

  const methods = React.useMemo(
    () => ({
      openModal,
      closeModal,
      closeAllModals,
    }),
    [openModal, closeModal, closeAllModals],
  )

  return (
    <ModalContext.Provider value={state}>
      <ModalControlContext.Provider value={methods}>
        {children}
      </ModalControlContext.Provider>
    </ModalContext.Provider>
  )
}

export function useModals() {
  return React.useContext(ModalContext)
}

export function useModalControls() {
  return React.useContext(ModalControlContext)
}

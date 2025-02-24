import {useCallback} from 'react'
import {useModalControls} from '~/context/BottomModal'
import {useDetachModalControls} from '~/context/DetachModal'
import {magicModal} from '~/magicModal'

export function useCloseAnyActiveElement() {
  const {closeAllModals} = useModalControls()
  const {closeAllDetachModals} = useDetachModalControls()

  return useCallback(() => {
    if (closeAllDetachModals()) {
      return true
    }
    if (closeAllModals()) {
      return true
    }
    return false
  }, [closeAllModals, closeAllDetachModals])
}

export function useCloseAllActiveElements() {
  const {closeAllModals} = useModalControls()
  const {closeAllDetachModals} = useDetachModalControls()

  return useCallback(() => {
    closeAllDetachModals()
    closeAllModals()
    magicModal.hideAll()
  }, [closeAllModals, closeAllDetachModals])
}

import {Fragment, useEffect, useRef} from 'react'
import {StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import BottomSheet from '@discord/bottom-sheet/src'

import {FullWindowOverlay} from '~/components/FullWindowOverlay'
import {createCustomBackdrop} from '~/utils/BottomSheetCustomBackdrop'
import {useDetachModalControls, useDetachModals} from '~/context/DetachModal'
import {Text} from '~/components/ui/text'

const DEFAULT_SNAPPOINTS = ['90%']
const HANDLE_HEIGHT = 24
const DEFAULT_PAN_DOWN_TO_CLOSE = true
const DEFAULT_DEACTIVATE_BACKDROP = false
const DEFAULT_DETACH = true
const DEFAULT_BOTTOM_INSET = 15
const DEFAULT_MARGIN_HORIZONTAL = 15

export function DetachModalsContainer() {
  const {isModalActive, activeModals} = useDetachModals()
  const {closeDetachModal} = useDetachModalControls()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const activeModal = activeModals[activeModals.length - 1]

  const onBottomSheetChange = async (snapPoint: number) => {
    if (snapPoint === -1) {
      closeDetachModal()
    }
  }

  const onClose = () => {
    bottomSheetRef.current?.close()
    closeDetachModal()
  }

  useEffect(() => {
    if (isModalActive) {
      bottomSheetRef.current?.snapToIndex(0)
    } else {
      bottomSheetRef.current?.close()
    }
  }, [isModalActive, bottomSheetRef, activeModal?.name])

  let detach: boolean = DEFAULT_DETACH
  let snapPoints: (string | number)[] = DEFAULT_SNAPPOINTS
  let enablePanDownToClose: boolean = DEFAULT_PAN_DOWN_TO_CLOSE
  let deactivateBackDrop: boolean = DEFAULT_DEACTIVATE_BACKDROP
  let bottonInset: number = DEFAULT_BOTTOM_INSET
  let marginHorizontal: number = DEFAULT_MARGIN_HORIZONTAL
  let element
  if (activeModal?.name === 'clear-cache-modal') {
    ;<Text>DETACH MODAL</Text>
  } else {
    return null
  }

  if (snapPoints[0] === 'fullscreen') {
    return (
      <SafeAreaView
        style={[styles.fullscreenContainer, {backgroundColor: '#fff'}]}>
        {element}
      </SafeAreaView>
    )
  }

  const Container = activeModal ? FullWindowOverlay : Fragment

  return (
    <Container>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleHeight={HANDLE_HEIGHT}
        index={isModalActive ? 0 : -1}
        enablePanDownToClose={enablePanDownToClose}
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior="restore"
        backdropComponent={
          deactivateBackDrop
            ? createCustomBackdrop()
            : isModalActive
              ? createCustomBackdrop(onClose)
              : undefined
        }
        detached={detach}
        bottomInset={bottonInset}
        style={{marginHorizontal: marginHorizontal}}
        handleIndicatorStyle={{backgroundColor: '#000', marginTop: 7}}
        handleStyle={[styles.handle]}
        onChange={onBottomSheetChange}>
        {element}
      </BottomSheet>
    </Container>
  )
}

const styles = StyleSheet.create({
  handle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

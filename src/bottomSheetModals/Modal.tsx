import {Fragment, useEffect, useRef} from 'react'
import {StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import BottomSheet from '@discord/bottom-sheet/src'

import * as LanguageSettingsModal from './LanguageSettingsModal'

import {useModalControls, useModals} from '~/context/BottomModal'
import {FullWindowOverlay} from '~/components/FullWindowOverlay'
import {createCustomBackdrop} from '~/utils/BottomSheetCustomBackdrop'

const DEFAULT_SNAPPOINTS = ['90%']
const HANDLE_HEIGHT = 24
const DEFAULT_PAN_DOWN_TO_CLOSE = true
const DEFAULT_DEACTIVATE_BACKDROP = false

export function ModalsContainer() {
  const {isModalActive, activeModals} = useModals()
  const {closeModal} = useModalControls()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const activeModal = activeModals[activeModals.length - 1]

  const onBottomSheetChange = async (snapPoint: number) => {
    if (snapPoint === -1) {
      closeModal()
    }
  }

  const onClose = () => {
    bottomSheetRef.current?.close()
    closeModal()
  }

  useEffect(() => {
    if (isModalActive) {
      bottomSheetRef.current?.snapToIndex(0)
    } else {
      bottomSheetRef.current?.close()
    }
  }, [isModalActive, bottomSheetRef, activeModal?.name])

  let snapPoints: (string | number)[] = DEFAULT_SNAPPOINTS
  let enablePanDownToClose: boolean = DEFAULT_PAN_DOWN_TO_CLOSE
  let deactivateBackDrop: boolean = DEFAULT_DEACTIVATE_BACKDROP
  let element
  if (activeModal?.name === 'language-settings-modal') {
    snapPoints = LanguageSettingsModal.snapPoints
    element = <LanguageSettingsModal.Component />
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
        keyboardBehavior="interactive"
        backdropComponent={
          deactivateBackDrop
            ? createCustomBackdrop()
            : isModalActive
              ? createCustomBackdrop(onClose)
              : undefined
        }
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

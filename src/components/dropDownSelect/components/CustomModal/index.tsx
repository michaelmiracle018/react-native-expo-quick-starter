import {PropsWithChildren, ReactElement} from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import {colors} from '../../styles/colors'
import {TCustomModalControls} from '../../types/index.types'

// In iOS, `SafeAreaView` does not automatically account on keyboard.
// Therefore, for iOS we need to wrap the content in `KeyboardAvoidingView`.
const ModalContentWrapper = ({children}: PropsWithChildren): ReactElement => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView style={[{flex: 1}]} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  ) : (
    <>{children}</>
  )
}

const CustomModal = ({
  visible,
  modalControls,
  children,
  modalOptionsContainerStyle,
  onRequestClose,
}: TCustomModalControls & ModalProps) => {
  return (
    <Modal
      visible={visible}
      testID="react-native-input-select-modal"
      transparent={true}
      animationType="fade"
      {...modalControls?.modalProps}>
      {/*Used to fix the select with search box behavior in iOS*/}
      <ModalContentWrapper>
        <TouchableOpacity
          onPress={onRequestClose}
          style={[
            styles.modalContainer,
            styles.modalBackgroundStyle,
            modalControls?.modalBackgroundStyle,
          ]}
          aria-label="close modal">
          {/* Added this `TouchableWithoutFeedback` wrapper because of the closing modal on expo web */}
          <TouchableWithoutFeedback accessible={false}>
            <SafeAreaView
              style={[
                styles.modalOptionsContainer,
                modalControls?.modalOptionsContainerStyle ||
                  modalOptionsContainerStyle,
              ]}
              testID="react-native-input-select-modal-body">
              {children}
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </ModalContentWrapper>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackgroundStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
  modalOptionsContainer: {
    maxHeight: '50%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 5,
  },
})

export default CustomModal

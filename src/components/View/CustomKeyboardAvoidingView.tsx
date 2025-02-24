import React from 'react'
import {KeyboardAvoidingView, KeyboardAvoidingViewProps} from 'react-native'
import {isIOS} from '~/lib/platform/detection'

interface CustomKeyboardAvoidingViewProps extends KeyboardAvoidingViewProps {
  children: React.ReactNode
}

const CustomKeyboardAvoidingView: React.FC<CustomKeyboardAvoidingViewProps> = ({
  children,
  ...props
}) => {
  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} {...props}>
      {children}
    </KeyboardAvoidingView>
  )
}

export default CustomKeyboardAvoidingView

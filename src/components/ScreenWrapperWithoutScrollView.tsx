import {View, SafeAreaView} from 'react-native'
import React from 'react'

export default function ScreenWrapperWithoutScrollView({
  children,
  ...props
}: {
  children: React.ReactNode
}) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View {...props}>{children}</View>
    </SafeAreaView>
  )
}

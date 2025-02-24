import {View} from 'react-native'
import React from 'react'
import {RoutesContainer, TabsNavigator} from '~/navigation'

export default function ShellInner() {
  return (
    <View className="h-full">
      <TabsNavigator />
    </View>
  )
}

export const Shell: React.FC = function ShellImpl() {
  return (
    <View testID="mobileShellView" className="h-full">
      <RoutesContainer>
        <ShellInner />
      </RoutesContainer>
    </View>
  )
}

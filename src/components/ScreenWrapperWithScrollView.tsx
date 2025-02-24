import {ScrollView, SafeAreaView} from 'react-native'
import React from 'react'
import {isAndroid} from '~/lib/platform/detection'
import {getStatusBarHeight} from '~/lib/platform/statusBarHeight'
import {cn} from '~/lib/utils'

export default function ScreenWrapperWithScrollView({
  children,
  isStatusBarHeight = true,
  ...props
}: {
  children: React.ReactNode
  isStatusBarHeight?: boolean
}) {
  const statusBarHeight = getStatusBarHeight(false)

  return (
    <SafeAreaView
      style={{paddingTop: isStatusBarHeight ? statusBarHeight : 0}}
      className={cn('bg-white flex-1')}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={isAndroid ? 'handled' : 'never'}
        {...props}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

import {View, ActivityIndicator} from 'react-native'
import React, {memo} from 'react'
import Colors from '~/constants/Colors'
import {RenderLoaderProps} from '~/types'
import {Trans} from '@lingui/macro'
import {Text} from './ui/text'

function RenderLoader({
  isLoadingPage,
  isFetchingNextPageInfo,
  hasNextPageInfo,
  itemLenght,
}: RenderLoaderProps) {
  return (
    <View className="mt-6">
      {isLoadingPage ? (
        <View className="flex-center">
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : isFetchingNextPageInfo ? (
        <View className="flex-center mt-3">
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : !hasNextPageInfo && itemLenght ? (
        <Text className="text-center my-4 text-lg font-normal">
          <Trans>No more data</Trans>
        </Text>
      ) : null}
    </View>
  )
}

export default memo(RenderLoader)

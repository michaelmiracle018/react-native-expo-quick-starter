import {Image, View} from 'react-native'
import React from 'react'

export default function ScreenLoader() {
  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={require('../../assets/images/preloader.gif')}
        className="w-20 h-20"
      />
    </View>
  )
}

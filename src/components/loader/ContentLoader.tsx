import {View, ActivityIndicator} from 'react-native'
import React from 'react'
import Colors from '~/constants/Colors'

export default function ContentLoader({...props}) {
  return (
    <View>
      <ActivityIndicator {...props} size="large" color={Colors.primary} />
    </View>
  )
}

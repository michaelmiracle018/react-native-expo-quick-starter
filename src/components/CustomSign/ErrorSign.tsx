import {View} from 'react-native'
import React from 'react'
import Colors from '~/constants/Colors'
import {X} from '~/lib/icons/X'
import {cn} from '~/lib/utils'

export default function ErrorSign() {
  return (
    <View className="w-24 h-24 rounded-full justify-center items-center bg-red-100">
      <View
        className={cn('w-20 h-20 rounded-full justify-center items-center')}
        style={{backgroundColor: Colors.danger}}>
        <X className="text-white" size={44} />
      </View>
    </View>
  )
}

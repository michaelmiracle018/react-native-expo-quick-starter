import {View} from 'react-native'
import React from 'react'
import Colors from '~/constants/Colors'
import {Check} from '~/lib/icons/Check'
import {cn} from '~/lib/utils'

export default function SuccessSign() {
  return (
    <View className="w-24 h-24 rounded-full justify-center items-center bg-green-100">
      <View
        className={cn('w-20 h-20 rounded-full justify-center items-center')}
        style={{backgroundColor: Colors.light_green}}>
        <Check className="text-white" size={44} />
      </View>
    </View>
  )
}

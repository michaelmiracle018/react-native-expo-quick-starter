import {TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Card} from './ui/card'
import {ArrowLeft} from '../lib/icons/ArrowLeft'
import {buttonTextVariants} from './ui/button'
import {Text} from './ui/text'

type UserBackIconTypes = {
  text?: string
  onPress: () => void
}

export default function BackIcon({text, onPress}: UserBackIconTypes) {
  return (
    <View className="flex-row items-center gap-3">
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Card className="w-11 h-10 rounded-md flex-center">
          <ArrowLeft
            className={buttonTextVariants({
              variant: 'secondary',
              className: 'opacity-100',
            })}
          />
        </Card>
      </TouchableOpacity>
      <Text className="native:text-md font-bold">{text}</Text>
    </View>
  )
}

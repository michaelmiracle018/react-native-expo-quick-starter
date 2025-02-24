import {View} from 'react-native'
import React from 'react'
import {Text} from '../ui/text'
import {Trans} from '@lingui/macro'

type Props = {
  currentPosition: number
  stepCount: number
}

export default function StepperCount({currentPosition, stepCount}: Props) {
  return (
    <View className="flex-row items-center justify-start gap-1">
      <Text className="native:text-lg font-bold">
        <Trans>Step</Trans>
      </Text>
      <Text className="native:text-lg font-bold">{currentPosition}</Text>
      <Text className="native:text-lg font-bold">
        <Trans>of</Trans>
      </Text>
      <Text className="native:text-lg font-bold">{stepCount}</Text>
    </View>
  )
}

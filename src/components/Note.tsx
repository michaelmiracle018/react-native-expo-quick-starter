import {View} from 'react-native'
import React from 'react'
import {Trans} from '@lingui/macro'
import Colors from '~/constants/Colors'
import {AntDesign} from '@expo/vector-icons'
import {Text} from './ui/text'

export default function Note() {
  return (
    <View>
      <Text>
        <AntDesign
          name="checkcircleo"
          size={14}
          color={Colors.primary}
          className="mt-1"
        />{' '}
        <Trans>Click</Trans>{' '}
        <Text className="font-bold">
          <Trans>Transfer Completed</Trans>
        </Text>
        <Text>after payment is made.</Text>
      </Text>
    </View>
  )
}

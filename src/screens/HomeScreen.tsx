import React from 'react'
import { View } from 'react-native'
import { ThemeToggle } from '~/components/ThemeToggle'
import { Text } from '~/components/ui/text'
import { statusBarHeight } from '~/lib/platform/detection'
import * as Layout from '~/components/layout'
import { tabBarHeight } from '~/hooks/useBottomBarHeight'
import { useLingui } from '@lingui/react'

import { Button } from '~/components/ui/button'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '~/lib/routes/types'

export default function HomeScreen() {
  const { _ } = useLingui()
  const navigation = useNavigation<NavigationProp>()

  const onPressToast = React.useCallback(() => {
    navigation.navigate('ToastScreen')
  }, [navigation])

  return (
    <Layout.Content
      className="bg-background spacing-1"
      style={{ marginTop: statusBarHeight, marginBottom: tabBarHeight }}>
      <Text className="text-3xl">COMPONENTS</Text>
      <View>
        <Button variant={'link'} onPress={onPressToast} className="mt-0">
          <Text className="text-2xl">Toastify</Text>
        </Button>

        <Button
          variant={'link'}
          onPress={() => navigation.navigate('InputScreen')}
          className="mt-0">
          <Text className="text-2xl">Input</Text>
        </Button>
        <Button
          variant={'link'}
          onPress={() => navigation.navigate('FlatListScreen')}
          className="mt-0">
          <Text className="text-2xl">Flat List</Text>
        </Button>
        <Button
          variant={'link'}
          onPress={() => navigation.navigate('DropDownScreen')}
          className="mt-0">
          <Text className="text-2xl">Drop Down</Text>
        </Button>

        <Button
          variant={'link'}
          onPress={() => navigation.navigate('TimerScreen')}
          className="mt-0">
          <Text className="text-2xl">Timer</Text>
        </Button>
        <ThemeToggle />
      </View>
    </Layout.Content>
  )
}

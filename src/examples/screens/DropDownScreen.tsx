import {View} from 'react-native'
import {useToast} from 'react-native-toast-notifications'
import {Button} from '~/components/ui/button'
import {Text} from '~/components/ui/text'
import * as Layout from '~/components/layout'
import {statusBarHeight} from '~/lib/platform/detection'
import {tabBarHeight} from '~/hooks/useBottomBarHeight'
import {ThemeToggle} from '~/components/ThemeToggle'
import {msg, t, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'

export default function DropDownScreen() {
  const Toast = useToast()
  const {i18n} = useLingui()

  return (
    <Layout.Content
      className="bg-background spacing-1"
      style={{marginTop: statusBarHeight, marginBottom: tabBarHeight}}>
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl">
            <Trans>DropDown</Trans>
          </Text>
          <ThemeToggle />
        </View>
      </View>
    </Layout.Content>
  )
}

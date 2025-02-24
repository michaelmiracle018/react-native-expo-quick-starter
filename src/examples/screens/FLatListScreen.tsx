import { View } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import * as Layout from '~/components/layout'
import { statusBarHeight } from '~/lib/platform/detection'
import { tabBarHeight } from '~/hooks/useBottomBarHeight'
import { ThemeToggle } from '~/components/ThemeToggle'
import { msg, t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

export default function FlatListScreen() {
    const Toast = useToast()
    const { i18n } = useLingui()

    return (
        <Layout.Content
            className="bg-background spacing-1"
            style={{ marginTop: statusBarHeight, marginBottom: tabBarHeight }}>
            <View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-3xl">
                        <Trans>FlatList</Trans>
                    </Text>
                    <ThemeToggle />
                </View>
            </View>
        </Layout.Content>
    )
}

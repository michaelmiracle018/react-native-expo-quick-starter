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


export default function ToastScreen() {
    const Toast = useToast()
    const { i18n } = useLingui()


    const handleToast = (normalColor: string) => {
        Toast.hideAll()
        Toast.show(t(i18n)`An error occurred, please try again!`, {
            data: {
                title: "Customized toast",
            },
            type: "custom_toast_with_title",
            animationDuration: 300,
            normalColor,
            placement: 'bottom',
        })
    }
    return (
        <Layout.Content className='bg-background spacing-1' style={{ marginTop: statusBarHeight, marginBottom: tabBarHeight }}>

            <View>
                <View className='flex-row justify-between items-center'>
                    <Text className='text-3xl'>
                        <Trans>

                            Toast Screen
                        </Trans>
                    </Text>
                    <ThemeToggle />

                </View>
                <Button variant={"link"} onPress={() => handleToast('error')} className='mt-0'>
                    <Text className='text-xl text-red-400'>Error Toast</Text>
                </Button>
                <Button variant={"link"} onPress={() => handleToast('success')} className='mt-0'>
                    <Text className='text-xl text-green-400'>Success Toast</Text>
                </Button>
                <Button variant={"link"} onPress={() => handleToast('normal')} className='mt-0'>
                    <Text className='text-xl text-gray-400'>Normal Toast</Text>
                </Button>
            </View>
        </Layout.Content>
    )
}
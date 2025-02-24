import { View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import * as Layout from '~/components/layout'
import { statusBarHeight } from '~/lib/platform/detection'
import { tabBarHeight } from '~/hooks/useBottomBarHeight'
import { ThemeToggle } from '~/components/ThemeToggle'
import { t, Trans } from '@lingui/macro'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import { Controller, useForm } from 'react-hook-form'
import { useLingui } from '@lingui/react'
import { Input } from '~/components/ui/input'
import InputErrorMessage from '~/components/inputErrorMessage/InputErrorMessage'
import { useToast } from 'react-native-toast-notifications'

export default function InputScreen() {
    const Toast = useToast()

    const { i18n } = useLingui()
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<{ senderName: string }>({
        defaultValues: {
            senderName: '',
        },
    })

    const onSubmit = async (value: { senderName: string }) => {
        Toast.hideAll()
        Toast.show(t(i18n)` ${value.senderName} submitted successfully`, {
            type: "custom_toast_without_title",
            animationDuration: 300,
            normalColor: "success",
            placement: 'bottom',
        })
        reset()

    }


    return (
        <Layout.Content className='bg-background spacing-1' style={{ marginTop: statusBarHeight, marginBottom: tabBarHeight }}>

            <View>
                <View className='flex-row justify-between items-center'>
                    <Text className='text-3xl'>
                        <Trans>
                            Input Screen
                        </Trans>
                    </Text>
                    <ThemeToggle />
                </View>


                <View className="mt-10">
                    <View className="bg-transparent/5 p-2 rounded-2xl w-full mb-2">
                        <Label className={cn('pb-2 native:pb-1 pl-0.5')}>
                            <Trans>Name</Trans>
                        </Label>
                        <View className="relative">
                            <Controller
                                control={control}
                                rules={{
                                    required: t(i18n)`This field is required.`,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        onBlur={onBlur}
                                        onChangeText={text => onChange(text)}
                                        value={value}
                                        placeholder={t(i18n)`Enter your name`}
                                        className={cn({
                                            'border-destructive':
                                                errors.senderName?.type === 'required',
                                        })}
                                    />
                                )}
                                name="senderName"
                            />
                        </View>
                        <InputErrorMessage errors={errors} name="senderName" />
                    </View>
                </View>

                <Button onPress={handleSubmit(onSubmit)} className='mt-10'>
                    <Text className='text-xl'>Submit</Text>
                </Button>

            </View>
        </Layout.Content>
    )
}
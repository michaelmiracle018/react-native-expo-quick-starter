import {View} from 'react-native'
import React from 'react'
import {ToastProvider} from 'react-native-toast-notifications'
import {cn} from '~/lib/utils'
import Colors from '~/constants/Colors'
import {Text} from '../ui/text'

// export const ToastMessage = Toast

export default function Toastify({children}: {children: React.ReactNode}) {
  return (
    <ToastProvider
      offset={10}
      // Custom type example
      renderType={{
        custom_toast_with_title: toast => (
          <View
            className={cn(
              'w-[95%] px-4 py-5 drop-shadow-xl shadow-lg rounded-md border-l-8 p-4 flex items-center',
              toast.normalColor === 'success'
                ? 'bg-toast_background'
                : toast.normalColor === 'error'
                  ? 'bg-err_toast_background'
                  : 'bg-normal_toast_background',
            )}
            style={{
              borderLeftColor:
                toast.normalColor === 'success'
                  ? Colors.darkMint
                  : toast.normalColor === 'error'
                    ? Colors.danger
                    : Colors.paraColor,
            }}>
            <Text className="text-sm font-medium">{toast.data.title}</Text>
            <Text className="text-sm font-normal mr-2 ">{toast.message}</Text>
          </View>
        ),
        custom_toast_without_title: toast => (
          <View
            className={cn(
              'w-[95%] px-4 py-5 shadow-md rounded-sm  border-l-4 p-4 flex items-center',
              toast.normalColor === 'success'
                ? 'bg-toast_background'
                : toast.normalColor === 'error'
                  ? 'bg-err_toast_background'
                  : 'bg-normal_toast_background',
            )}
            style={{
              borderLeftColor:
                toast.normalColor === 'success'
                  ? Colors.light_green
                  : toast.normalColor === 'error'
                    ? Colors.danger
                    : Colors.paraColor,
            }}>
            <Text className="text-sm font-normal mr-2">{toast.message}</Text>
          </View>
        ),
      }}>
      {children}
    </ToastProvider>
  )
}

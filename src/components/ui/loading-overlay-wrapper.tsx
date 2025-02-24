/* eslint-disable react/display-name */
import {Modal, View} from 'react-native'
import React from 'react'
import {cn} from '~/lib/utils'
import ContentLoader from '../loader/ContentLoader'

const LoadingOverlayWrapper = React.forwardRef<
  React.ElementRef<typeof Modal>,
  React.ComponentPropsWithoutRef<typeof Modal> & {
    isLoading: boolean
  }
>(
  (
    {className, children, visible, isLoading, animationType = 'fade', ...props},
    ref,
  ) => {
    return (
      <>
        <>{children}</>
        {isLoading && (
          <Modal
            ref={ref}
            animationType={animationType}
            transparent={true}
            visible={isLoading}
            statusBarTranslucent
            {...props}>
            <View
              className={cn(
                'flex-1 justify-center items-center p-2',
                animationType !== 'slide' &&
                  'bg-gray-200/70 dark:bg-zinc-900/80',
              )}>
              <View
                className={cn(
                  ' rounded-md p-8  w-20 h-20 flex-center bg-white',
                  className,
                )}>
                <ContentLoader />
              </View>
            </View>
          </Modal>
        )}
      </>
    )
  },
)

export default LoadingOverlayWrapper

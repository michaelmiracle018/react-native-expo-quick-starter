import React from 'react'
import * as Device from 'expo-device'
import {impactAsync, ImpactFeedbackStyle} from 'expo-haptics'
// import * as Toast from '#/view/com/util/Toast'
import {isIOS, isWeb} from '~/lib/platform/detection'
// import {useHapticsDisabled} from '~/state/prefences/disable-haptics'

export function useHaptics() {
  // const isHapticsDisabled = useHapticsDisabled()

  return React.useCallback(
    (strength: 'Light' | 'Medium' | 'Heavy' = 'Medium') => {
      // Users said the medium impact was too strong on Android; see APP-537s
      const style = isIOS
        ? ImpactFeedbackStyle[strength]
        : ImpactFeedbackStyle.Light
      impactAsync(style)

      // DEV ONLY - show a toast when a haptic is meant to fire on simulator
      if (__DEV__ && !Device.isDevice) {
        // Toast.show(`Buzzz!`)
      }
    },
    [],
  )
}

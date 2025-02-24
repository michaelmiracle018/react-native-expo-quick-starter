import {useCallback, useEffect, useState} from 'react'
import Animated, {
  BounceOutDown,
  FadeOut,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import * as SplashScreen from 'expo-splash-screen'
import {View} from 'react-native'
import {useModalControls} from '~/context/BottomModal'
import {useFonts} from 'expo-font'

SplashScreen.preventAutoHideAsync()

export default function Splash({children}: any) {
  const [fontsLoaded] = useFonts({
    NotoSansBold: require('../../assets/font/NotoSans-Bold.ttf'),
    NotoSansLight: require('../../assets/font/NotoSans-Light.ttf'),
    NotoSansMedium: require('../../assets/font/NotoSans-Medium.ttf'),
    NotoSansRegular: require('../../assets/font/NotoSans-Regular.ttf'),
    NotoSansSemiBold: require('../../assets/font/NotoSans-SemiBold.ttf'),
    NotoSansThin: require('../../assets/font/NotoSans-Thin.ttf'),
  })

  const isAnimationCompleteForQui = useSharedValue(false)
  const isAllAnimationComplete = useSharedValue(false)
  const [isAppReady, setAppReady] = useState(false)
  const {openModal} = useModalControls()

  const onImageLoaded = useCallback(async () => {
    await SplashScreen.hideAsync()
    setTimeout(() => {
      setAppReady(true)
    }, 3000)
  }, [fontsLoaded])

  const backgroundColor = 'white'

  const offset = useSharedValue(0)
  const opacityK = useSharedValue(0)
  const offsetK = useSharedValue(0)
  const backgroundColorOffset = useSharedValue('#000')

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withDelay(
            1000,
            withTiming(
              offset.value,

              {
                duration: 400,
              },
              () => {
                isAnimationCompleteForQui.value = true
              },
            ),
          ),
        },
      ],
    }
  })
  const animatedStylesK = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacityK.value),
      transform: [
        {
          translateX: withTiming(
            offsetK.value,

            {},
            () => {
              isAllAnimationComplete.value = true
            },
          ),
        },
      ],
    }
  })
  const animateBackgroundEntryStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColorOffset.value, {
        duration: 2000,
      }),
    }
  })

  useEffect(() => {
    offset.value = -40
    backgroundColorOffset.value = backgroundColor
  }, [backgroundColor])

  function callback() {
    'worklet'
    runOnJS(onImageLoaded)()
  }

  useAnimatedReaction(
    () => {
      return isAnimationCompleteForQui.value
    },
    result => {
      if (result) {
        opacityK.value = 1
        offsetK.value = -40
      }
    },
  )
  useAnimatedReaction(
    () => {
      return isAllAnimationComplete.value
    },
    result => {
      if (result) {
        callback()
      }
    },
  )

  return (
    <View className="flex-1">
      {isAppReady && children}
      {!isAppReady && (
        <Animated.View
          exiting={FadeOut.duration(800)}
          pointerEvents="none"
          style={[
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor,
            },
            animateBackgroundEntryStyle,
          ]}>
          <Animated.View
            exiting={BounceOutDown.duration(800)}
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',

              alignItems: 'center',
              width: '100%',
              aspectRatio: 1278 / 2278,
              flexDirection: 'row',
            }}>
            <Animated.Text
              className="text-blue-600 font-bold"
              style={[
                {
                  fontSize: 30,
                  paddingLeft: 60,
                  textAlign: 'center',
                },
                animatedStyles,
              ]}>
              Social
            </Animated.Text>
            <Animated.Text
              className="text-blue-200 font-bold"
              style={[
                {
                  fontSize: 40,

                  textAlign: 'center',
                },
                animatedStylesK,
              ]}>
              Connect
            </Animated.Text>
          </Animated.View>
          <Animated.View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
              marginBottom: 20,
            }}></Animated.View>
        </Animated.View>
      )}
    </View>
  )
}

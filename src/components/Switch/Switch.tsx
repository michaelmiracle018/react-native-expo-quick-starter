import React from 'react'
import {Pressable, StyleSheet, ViewStyle} from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Colors from '~/constants/Colors'
interface TrackerColor {
  on: string
  off: string
}

interface Props {
  value?: any
  onPress?: () => void
  style?: ViewStyle
  duration?: 400
  trackColors?: TrackerColor
}

const Switch = ({
  value,
  onPress,
  style,
  duration = 400,
  trackColors = {on: 'rgba(72,189,126,0.8)', off: Colors.secondary},
}: Props) => {
  const height = useSharedValue(0)
  const width = useSharedValue(0)

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      value.value,
      [0, 1],
      [trackColors.off, trackColors.on],
    )
    const colorValue = withTiming(color, {duration})

    return {
      backgroundColor: colorValue,
      borderRadius: height.value / 2,
    }
  })

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      Number(value.value),
      [0, 1],
      [0, width.value - height.value],
    )
    const translateValue = withTiming(moveValue, {duration})

    return {
      transform: [{translateX: translateValue}],
      borderRadius: height.value / 2,
    }
  })
  return (
    <Pressable onPress={onPress}>
      <Animated.View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height
          width.value = e.nativeEvent.layout.width
        }}
        style={[switchStyles.track, style, trackAnimatedStyle]}>
        <Animated.View
          style={[switchStyles.thumb, thumbAnimatedStyle]}></Animated.View>
      </Animated.View>
    </Pressable>
  )
}
export default Switch

const switchStyles = StyleSheet.create({
  track: {
    alignItems: 'flex-start',
    width: 100,
    height: 40,
    padding: 5,
  },
  thumb: {
    height: '100%',
    aspectRatio: 1,
    backgroundColor: 'white',
  },
})

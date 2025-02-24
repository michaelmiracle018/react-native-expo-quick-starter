import {StyleSheet, View, ViewStyle} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface Props {
  isExpanded: {value: false} | any
  children: JSX.Element[] | JSX.Element
  viewKey?: string
  duration?: number
  style?: ViewStyle
}
// ? THIS ACCORDION CONFLICT WITH THE MODAL BE CAUTION.
export function AccordionItem({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 500,
}: Props) {
  const height = useSharedValue(0)

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    }),
  )
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }))

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}>
      <View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height
        }}
        style={styles.wrapper}>
        {children}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parent: {
    width: 200,
  },
  wrapper: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
  },
  animatedView: {
    width: '100%',
    overflow: 'hidden',
  },
  box: {
    height: 120,
    width: 120,
    color: '#f8f9ff',
    backgroundColor: '#b58df1',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

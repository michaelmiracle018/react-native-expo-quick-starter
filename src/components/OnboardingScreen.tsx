import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewToken,
} from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import {data, type Data} from '../../assets/data'
import Colors from '~/constants/Colors'
import {OnboardingButton} from '~/components/onboarding/OnboardingButton'
import {OnboardingPagination} from '~/components/onboarding/OnboardingPagination'
import {Text} from './ui/text'

const RenderItem = ({
  item,
  index,
  x,
}: {
  item: Data
  index: number
  x: SharedValue<number>
}) => {
  const {width: SCREEN_WIDTH} = useWindowDimensions()

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP,
    )

    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolate.CLAMP,
    )

    return {
      width: SCREEN_WIDTH * 0.8,
      height: SCREEN_WIDTH * 0.8,
      opacity: opacityAnimation,
      transform: [{translateY: translateYAnimation}],
    }
  })

  const textAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP,
    )

    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolate.CLAMP,
    )

    return {
      opacity: opacityAnimation,
      transform: [{translateY: translateYAnimation}],
    }
  })

  return (
    <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
      <Animated.Image source={item.image} style={imageAnimatedStyle} />

      <Animated.View style={textAnimatedStyle}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemText}>{item.text}</Text>
      </Animated.View>
    </View>
  )
}

export default function Screen() {
  const {width: SCREEN_WIDTH} = useWindowDimensions()
  const flatListRef = useAnimatedRef<FlatList>()

  const flatListIndex = useSharedValue(0)
  const x = useSharedValue(0)

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[]
  }) => {
    flatListIndex.value = viewableItems[0].index ?? 0
  }

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x
    },
  })

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef as any}
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => (
          <RenderItem index={index} item={item} x={x} />
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
      />

      <View style={styles.footerContainer}>
        <OnboardingPagination data={data} screenWidth={SCREEN_WIDTH} x={x} />

        <OnboardingButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  itemTitle: {
    color: Colors.textColor,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  itemText: {
    color: Colors.textColor,
    textAlign: 'center',
    lineHeight: 20,
    marginHorizontal: 30,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
  },
})

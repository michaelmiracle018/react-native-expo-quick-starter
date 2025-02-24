import {MaterialIcons} from '@expo/vector-icons'
import React, {memo, useRef, useState} from 'react'
import {
  Animated,
  FlatListProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Colors from '~/constants/Colors'
import {useCustomFlatListHook} from '~/hooks/useStickyHeaderFlatList'
import {isIOS} from '~/lib/platform/detection'

type CustomFlatListProps<T> = Omit<FlatListProps<T>, 'ListHeaderComponent'> & {
  /**
   * An element that is above all
   *
   * Hides when scrolling
   */
  HeaderComponent: JSX.Element
  /**
   * An element that is above the list but lower than {@link Props.HeaderComponent HeaderComponent} and has the property sticky
   *
   * When scrolling is fixed on top
   */
  StickyElementComponent: JSX.Element
  /**
   * An element that is higher than the list but lower than {@link Props.HeaderComponent HeaderComponent} and {@link Props.StickyElementComponent StickyElementComponent}
   *
   * Hides when scrolling
   */
  TopListElementComponent?: JSX.Element
}

/**
 *
 */
function StickyHeaderFlashList<T>({
  style,
  ...props
}: CustomFlatListProps<T>): React.ReactElement {
  const [
    scrollY,
    styles,
    onLayoutHeaderElement,
    onLayoutTopListElement,
    onLayoutStickyElement,
  ] = useCustomFlatListHook()
  const [contentVerticalOffset, setContentVerticalOffset] = useState<
    any | unknown
  >(0)
  const listRef = useRef<any>(null)
  const scrollTopHandler = () => {
    if (listRef.current) {
      listRef.current.scrollToOffset({offset: 0, animated: true})
    }
  }
  return (
    <View style={style}>
      <Animated.View // <-- Sticky Component
        style={[
          styles.stickyElement,
          {paddingTop: isIOS ? 0 : 0, backgroundColor: '#fff', zIndex: 1},
        ]}
        onLayout={onLayoutStickyElement}>
        {props.StickyElementComponent}
      </Animated.View>

      <Animated.View // <-- Top of List Component
        style={styles.topElement}
        onLayout={onLayoutTopListElement}>
        {props.TopListElementComponent}
      </Animated.View>

      <Animated.FlatList<any>
        contentContainerStyle={{
          paddingBottom: isIOS ? 50 : 200,
          // paddingTop: isIOS ? 0 : statusBarHeight,
        }}
        {...props}
        ref={listRef}
        ListHeaderComponent={
          // <-- Header Component
          <Animated.View onLayout={onLayoutHeaderElement} className="z-99">
            {props.HeaderComponent}
          </Animated.View>
        }
        ListHeaderComponentStyle={[
          props.ListHeaderComponentStyle,
          styles.header,
        ]}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            listener: (event: any) => {
              setContentVerticalOffset(event.nativeEvent.contentOffset.y)
            },
            useNativeDriver: true,
          },
        )}
      />
      {contentVerticalOffset > 300 && (
        <TouchableOpacity
          onPress={scrollTopHandler}
          style={creatStyles.scrollTopButton}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}>
            <MaterialIcons
              name="keyboard-double-arrow-up"
              size={30}
              color="white"
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default memo(StickyHeaderFlashList)

const creatStyles = StyleSheet.create({
  scrollTopButton: {
    position: 'absolute',
    bottom: isIOS ? 100 : 90,
    right: 10,
    backgroundColor: Colors.grayDark,
    width: isIOS ? 50 : 40,
    height: isIOS ? 50 : 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
})

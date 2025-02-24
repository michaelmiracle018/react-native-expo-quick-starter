import React, {useContext, useMemo} from 'react'
import {StyleSheet, View, ViewProps, ViewStyle} from 'react-native'
import {StyleProp} from 'react-native'
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-controller'
import Animated, {
  AnimatedScrollViewProps,
  useAnimatedProps,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {isWeb} from '~/lib/platform/detection'
import {useShellLayout} from '~/state/shell-layout'
import {ScrollbarOffsetContext} from './context'
import {useBreakpoints} from '~/alf/breakpoints'

// import {atoms as a, useBreakpoints, useTheme, web} from '#/alf'

export type ScreenProps = React.ComponentProps<typeof View> & {
  style?: StyleProp<ViewStyle>
  noInsetTop?: boolean
}

/**
 * Outermost component of every screen
 */
export const Screen = React.memo(function Screen({
  style,
  noInsetTop,
  ...props
}: ScreenProps) {
  const {top} = useSafeAreaInsets()
  return (
    <>
      {isWeb && <WebCenterBorders />}
      <View style={[{paddingTop: noInsetTop ? 0 : top}, style]} {...props} />
    </>
  )
})

export type ContentProps = AnimatedScrollViewProps & {
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
}

/**
 * Default scroll view for simple pages
 */
export const Content = React.memo(function Content({
  children,
  style,
  contentContainerStyle,
  ...props
}: ContentProps) {
  const {footerHeight} = useShellLayout()
  const animatedProps = useAnimatedProps(() => {
    return {
      scrollIndicatorInsets: {
        bottom: footerHeight.get(),
        top: 0,
        right: 1,
      },
    } satisfies AnimatedScrollViewProps
  })

  return (
    <Animated.ScrollView
      id="content"
      automaticallyAdjustsScrollIndicatorInsets={false}
      // sets the scroll inset to the height of the footer
      animatedProps={animatedProps}
      style={[scrollViewStyles.common, style]}
      contentContainerStyle={[
        scrollViewStyles.contentContainer,
        contentContainerStyle,
      ]}
      {...props}>
      {children}
    </Animated.ScrollView>
  )
})

const scrollViewStyles = StyleSheet.create({
  common: {
    width: '100%',
  },
  contentContainer: {
    paddingBottom: 100,
  },
})

export type KeyboardAwareContentProps = KeyboardAwareScrollViewProps & {
  children: React.ReactNode
  contentContainerStyle?: StyleProp<ViewStyle>
}

/**
 * Default scroll view for simple pages.
 *
 * BE SURE TO TEST THIS WHEN USING, it's untested as of writing this comment.
 */
export const KeyboardAwareContent = React.memo(function LayoutScrollView({
  children,
  style,
  contentContainerStyle,
  ...props
}: KeyboardAwareContentProps) {
  return (
    <KeyboardAwareScrollView
      style={[scrollViewStyles.common, style]}
      contentContainerStyle={[
        scrollViewStyles.contentContainer,
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      {...props}>
      {isWeb ? <Center>{children}</Center> : children}
    </KeyboardAwareScrollView>
  )
})

/**
 * Utility component to center content within the screen
 */
export const Center = React.memo(function LayoutContent({
  children,
  style,
  ...props
}: ViewProps) {
  const {isWithinOffsetView} = useContext(ScrollbarOffsetContext)
  const {gtMobile} = useBreakpoints()
  const ctx = useMemo(() => ({isWithinOffsetView: true}), [])
  return (
    <View
      className="mx-auto w-full"
      style={[
        gtMobile && {
          maxWidth: 600,
        },
        style,
      ]}
      {...props}>
      <ScrollbarOffsetContext.Provider value={ctx}>
        {children}
      </ScrollbarOffsetContext.Provider>
    </View>
  )
})

/**
 * Only used within `Layout.Screen`, not for reuse
 */
const WebCenterBorders = React.memo(function LayoutContent() {
  const {gtMobile} = useBreakpoints()
  return gtMobile ? <View /> : null
})

import React, { memo } from 'react'
import { RefreshControl, ViewToken } from 'react-native'
import {
  FlatListPropsWithLayout,
  runOnJS,
  useSharedValue,
} from 'react-native-reanimated'
import { updateActiveVideoViewAsync } from '@haileyok/bluesky-video'
import { useAnimatedScrollHandler } from '~/hooks/useAnimatedScrollHandler_FIXED.web'
import { useDedupe } from '~/hooks/useDedupe'
import { useScrollHandlers } from '~/lib/ScrollContext'
// import {addStyle} from '~/strings/styles'
import { isAndroid, isIOS } from '~/lib/platform/detection'
// import {useLightbox} from '~/shell/lightbox'
import { FlatList_INTERNAL } from './Views'
import { addStyle } from '~/strings/styles'

export type ListMethods = FlatList_INTERNAL
export type ListProps<ItemT = any> = Omit<
  FlatListPropsWithLayout<ItemT>,
  | 'onMomentumScrollBegin' // Use ScrollContext instead.
  | 'onMomentumScrollEnd' // Use ScrollContext instead.
  | 'onScroll' // Use ScrollContext instead.
  | 'onScrollBeginDrag' // Use ScrollContext instead.
  | 'onScrollEndDrag' // Use ScrollContext instead.
  | 'refreshControl' // Pass refreshing and/or onRefresh instead.
  | 'contentOffset' // Pass headerOffset instead.
  | 'progressViewOffset' // Can't be an animated value
> & {
  onScrolledDownChange?: (isScrolledDown: boolean) => void
  headerOffset?: number
  refreshing?: boolean
  onRefresh?: () => void
  onItemSeen?: (item: ItemT) => void
  desktopFixedHeight?: number | boolean
  // Web only prop to contain the scroll to the container rather than the window
  disableFullWindowScroll?: boolean
  sideBorders?: boolean
  progressViewOffset?: number
}
export type ListRef = React.MutableRefObject<FlatList_INTERNAL | null>

const SCROLLED_DOWN_LIMIT = 200

let List = React.forwardRef<ListMethods, ListProps>(
  (
    {
      onScrolledDownChange,
      refreshing,
      onRefresh,
      onItemSeen,
      headerOffset,
      style,
      progressViewOffset,
      automaticallyAdjustsScrollIndicatorInsets = false,
      ...props
    },
    ref,
  ): React.ReactElement => {
    const isScrolledDown = useSharedValue(false)
    const dedupe = useDedupe(400)
    // const {activeLightbox} = useLightbox()

    function handleScrolledDownChange(didScrollDown: boolean) {
      onScrolledDownChange?.(didScrollDown)
    }

    // Intentionally destructured outside the main thread closure.
    // See https://github.com/bluesky-social/social-app/pull/4108.
    const {
      onBeginDrag: onBeginDragFromContext,
      onEndDrag: onEndDragFromContext,
      onScroll: onScrollFromContext,
      onMomentumEnd: onMomentumEndFromContext,
    } = useScrollHandlers()
    const scrollHandler = useAnimatedScrollHandler({
      onBeginDrag(e, ctx) {
        onBeginDragFromContext?.(e, ctx)
      },
      // onEndDrag(e, ctx) {
      //   runOnJS(updateActiveVideoViewAsync)()
      //   onEndDragFromContext?.(e, ctx)
      // },
      onScroll(e, ctx) {
        onScrollFromContext?.(e, ctx)

        const didScrollDown = e.contentOffset.y > SCROLLED_DOWN_LIMIT
        if (isScrolledDown.get() !== didScrollDown) {
          isScrolledDown.set(didScrollDown)
          if (onScrolledDownChange != null) {
            runOnJS(handleScrolledDownChange)(didScrollDown)
          }
        }

        // if (isIOS) {
        //   runOnJS(dedupe)(updateActiveVideoViewAsync)
        // }
      },
      // Note: adding onMomentumBegin here makes simulator scroll
      // lag on Android. So either don't add it, or figure out why.
      // onMomentumEnd(e, ctx) {
      //   runOnJS(updateActiveVideoViewAsync)()
      //   onMomentumEndFromContext?.(e, ctx)
      // },
    })

    const [onViewableItemsChanged, viewabilityConfig] = React.useMemo(() => {
      if (!onItemSeen) {
        return [undefined, undefined]
      }
      return [
        (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
          for (const item of info.changed) {
            if (item.isViewable) {
              onItemSeen(item.item)
            }
          }
        },
        {
          itemVisiblePercentThreshold: 40,
          minimumViewTime: 0.5e3,
        },
      ]
    }, [onItemSeen])

    let refreshControl
    if (refreshing !== undefined || onRefresh !== undefined) {
      refreshControl = (
        <RefreshControl
          refreshing={refreshing ?? false}
          onRefresh={onRefresh}
          // tintColor={t.atoms.text.color}
          // titleColor={t.atoms.text.color}
          progressViewOffset={progressViewOffset ?? headerOffset}
        />
      )
    }

    let contentOffset
    if (headerOffset != null) {
      style = addStyle(style, {
        paddingTop: headerOffset,
      })
      contentOffset = { x: 0, y: headerOffset * -1 }
    }

    return (
      <FlatList_INTERNAL
        {...props}
        automaticallyAdjustsScrollIndicatorInsets={
          automaticallyAdjustsScrollIndicatorInsets
        }
        scrollIndicatorInsets={{
          top: headerOffset,
          right: 1,
          ...props.scrollIndicatorInsets,
        }}
        contentOffset={contentOffset}
        refreshControl={refreshControl}
        onScroll={scrollHandler}
        // scrollsToTop={!activeLightbox}
        scrollEventThrottle={1}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        showsVerticalScrollIndicator={!isAndroid}
        style={style}
        ref={ref}
      />
    )
  },
)
List.displayName = 'List'

List = memo(List)
export { List }

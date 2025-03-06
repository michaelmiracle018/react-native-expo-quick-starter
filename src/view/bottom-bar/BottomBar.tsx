import React, { ComponentProps } from 'react'
import { GestureResponderEvent, View } from 'react-native'
import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { StackActions } from '@react-navigation/native'
import { House } from '~/lib/icons/House'
import { MessageCircle } from '~/lib/icons/MessageCircle'
import { Search } from '~/lib/icons/Search'
import { User } from '~/lib/icons/User'
import { Bell } from '~/lib/icons/Bell'
import { styles } from './BottomBarStyles'
import { Text } from '~/components/ui/text'
import { useNavigationTabState } from '~/hooks/useNavigationTabState'
import { getTabState, TabState } from '~/lib/routes/helpers'
import { emitSoftReset } from '~/events/events'
import { useDedupe } from '~/hooks/useDedupe'
import { useHomeBadge } from '~/state/home-badge'
import { PressableScale } from '~/lib/custome-animations/PressableScale'

type TabOptions =
  | 'Home'
  | 'Search'
  | 'Notifications'
  | 'MyProfile'
  | 'Feeds'
  | 'Messages'

export function BottomBar({ navigation }: BottomTabBarProps) {
  const hasSession = true

  const { _ } = useLingui()
  const { isAtHome, isAtSearch, isAtNotifications, isAtMyProfile, isAtMessages } =
    useNavigationTabState()
  const dedupe = useDedupe()
  const hasHomeBadge = useHomeBadge()

  // const showSignIn = React.useCallback(() => {
  //   closeAllActiveElements()
  //   requestSwitchToAccount({ requestedAccount: 'none' })
  // }, [])

  // const showCreateAccount = React.useCallback(() => {
  //   closeAllActiveElements()
  //   requestSwitchToAccount({ requestedAccount: 'new' })
  //   // setShowLoggedOut(true)
  // }, [requestSwitchToAccount, closeAllActiveElements])

  const onPressTab = React.useCallback(
    (tab: TabOptions) => {
      const state = navigation.getState()
      const tabState = getTabState(state, tab)
      if (tabState === TabState.InsideAtRoot) {
        emitSoftReset()
      } else if (tabState === TabState.Inside) {
        dedupe(() => navigation.dispatch(StackActions.popToTop()))
      } else {
        dedupe(() => navigation.navigate(`${tab}Tab`))
      }
    },
    [navigation, dedupe],
  )
  const onPressHome = React.useCallback(() => onPressTab('Home'), [onPressTab])
  const onPressSearch = React.useCallback(
    () => onPressTab('Search'),
    [onPressTab],
  )
  const onPressNotifications = React.useCallback(
    () => onPressTab('Notifications'),
    [onPressTab],
  )
  const onPressProfile = React.useCallback(() => {
    onPressTab('MyProfile')
  }, [onPressTab])
  const onPressMessages = React.useCallback(() => {
    onPressTab('Messages')
  }, [onPressTab])

  // const onLongPressProfile = React.useCallback(() => {
  //   playHaptic()
  //   accountSwitchControl.open()
  // }, [accountSwitchControl, playHaptic])

  return (
    <>
      {/* <SwitchAccountDialog control={accountSwitchControl} /> */}

      <View className="absolute bottom-0  border-t border-gray-300 flex-row justify-between items-center w-full z-50 bg-background">
        <Btn
          testID="bottomBarHomeBtn"
          icon={
            isAtHome ? (
              <House className="text-primary" size={30} />
            ) : (
              <House className="text-foreground" size={30} />
            )
          }
          hasNew={hasHomeBadge}
          onPress={onPressHome}
          accessibilityRole="tab"
          accessibilityLabel={_(msg`Home`)}
          accessible={undefined}
          accessibilityHint={undefined}
        />

        <Btn
          testID="bottomBarMessageCircleBtn"
          icon={
            isAtMessages ? (
              <MessageCircle className="text-primary" size={30} />
            ) : (
              <MessageCircle className="text-foreground" size={30} />
            )
          }
          hasNew={hasHomeBadge}
          onPress={onPressMessages}
          accessibilityRole="tab"
          accessibilityLabel={_(msg`Message`)}
          accessible={undefined}
          accessibilityHint={undefined}
        />

        <Btn
          testID="bottomBarUserBtn"
          icon={
            isAtMyProfile ? (
              <User className="text-primary" size={30} />
            ) : (
              <User className="text-foreground" size={30} />
            )
          }
          hasNew={hasHomeBadge}
          onPress={onPressProfile}
          accessibilityRole="tab"
          accessibilityLabel={_(msg`User`)}
          accessible={undefined}
          accessibilityHint={undefined}
        />

        <Btn
          testID="bottomBarSearchBtn"
          icon={
            isAtSearch ? (
              <Search className="text-primary" size={30} />
            ) : (
              <Search className="text-foreground" size={30} />
            )
          }
          hasNew={hasHomeBadge}
          onPress={onPressSearch}
          accessibilityRole="tab"
          accessibilityLabel={_(msg`Search`)}
          accessible={undefined}
          accessibilityHint={undefined}
        />
        <Btn
          testID="bottomBarBellhBtn"
          icon={
            isAtNotifications ? (
              <Bell className="text-primary" size={30} />
            ) : (
              <Bell className="text-foreground" size={30} />
            )
          }
          hasNew={hasHomeBadge}
          onPress={onPressNotifications}
          accessibilityRole="tab"
          accessibilityLabel={_(msg`Bell`)}
          accessible={undefined}
          accessibilityHint={undefined}
        />
      </View>
    </>
  )
}

interface BtnProps
  extends Pick<
    ComponentProps<typeof PressableScale>,
    | 'accessible'
    | 'accessibilityRole'
    | 'accessibilityHint'
    | 'accessibilityLabel'
  > {
  testID?: string
  icon: JSX.Element
  notificationCount?: string
  hasNew?: boolean
  onPress?: (event: GestureResponderEvent) => void
  onLongPress?: (event: GestureResponderEvent) => void
}

function Btn({
  testID,
  icon,
  hasNew,
  notificationCount,
  onPress,
  onLongPress,
  accessible,
  accessibilityHint,
  accessibilityLabel,
}: BtnProps) {
  return (
    <PressableScale
      testID={testID}
      style={[styles.ctrl]}
      className="flex-1"
      onPress={onPress}
      onLongPress={onLongPress}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      targetScale={0.8}>
      {icon}
      {notificationCount ? (
        <View style={[styles.notificationCount]}>
          <Text style={styles.notificationCountLabel}>{notificationCount}</Text>
        </View>
      ) : hasNew ? (
        <View style={[styles.hasNewBadge]} />
      ) : null}
    </PressableScale>
  )
}

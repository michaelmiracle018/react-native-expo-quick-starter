import * as React from 'react'
import { JSX } from 'react/jsx-runtime'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native'

import {
  AllNavigatorParams,
  BottomTabNavigatorParams,
  HomeTabNavigatorParams,
  MessagesTabNavigatorParams,
  MyProfileTabNavigatorParams,
  NotificationsTabNavigatorParams,
  SearchTabNavigatorParams,
} from '~/lib/routes/types'
import HomeScreen from '~/screens/HomeScreen'
import { createNativeStackNavigatorWithAuth } from '~/view/shell/createNativeStackNavigatorWithAuth'
import { BottomBar } from '~/view/bottom-bar/BottomBar'
import { Text } from '~/components/ui/text'
import SearchScreen from '~/screens/SearchScreen'
import NotificationScreen from '~/screens/NotificationScreen'
import ProfileScreen from '~/screens/ProfileScreen'
import MessageScreen from '~/screens/MessageScreen'

// Examples Components
import ToastScreen from '~/examples/screens/ToastScreen'
import InputScreen from '~/examples/screens/InputScreen'

const navigationRef = createNavigationContainerRef<AllNavigatorParams>()

const HomeTab = createNativeStackNavigatorWithAuth<HomeTabNavigatorParams>()
const SearchTab = createNativeStackNavigatorWithAuth<SearchTabNavigatorParams>()
const NotificationsTab =
  createNativeStackNavigatorWithAuth<NotificationsTabNavigatorParams>()
const MyProfileTab =
  createNativeStackNavigatorWithAuth<MyProfileTabNavigatorParams>()
const MessagesTab =
  createNativeStackNavigatorWithAuth<MessagesTabNavigatorParams>()
const Tab = createBottomTabNavigator<BottomTabNavigatorParams>()

/**
 * These "common screens" are reused across stacks.
 */
function commonScreens(Stack: typeof HomeTab, unreadCountLabel?: string) {
  return <>
    <Stack.Screen
      name="ToastScreen"
      getComponent={() => ToastScreen}
      options={{ requireAuth: true }}
    />
    <Stack.Screen
      name="InputScreen"
      getComponent={() => InputScreen}
      options={{ requireAuth: true }}
    />
  </>
}

/**
 * The TabsNavigator is used by native mobile to represent the routes
 * in 3 distinct tab-stacks with a different root screen on each.
 */
function TabsNavigator() {
  const tabBar = React.useCallback(
    (props: JSX.IntrinsicAttributes & BottomTabBarProps) => (
      <BottomBar {...props} />
    ),
    [],
  )

  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeTab"
        backBehavior="initialRoute"
        screenOptions={{ headerShown: false, lazy: true }}
        tabBar={tabBar}>
        <Tab.Screen name="HomeTab" getComponent={() => HomeTabNavigator} />
        <Tab.Screen name="SearchTab" getComponent={() => SearchTabNavigator} />
        <Tab.Screen
          name="NotificationsTab"
          getComponent={() => NotificationTabNavigator}
        />
        <Tab.Screen
          name="MyProfileTab"
          getComponent={() => MyProfileTabNavigator}
        />
        <Tab.Screen
          name="MessagesTab"
          getComponent={() => MessagesTabNavigator}
        />
      </Tab.Navigator>
    </>
  )
}

function HomeTabNavigator() {
  return (
    <HomeTab.Navigator
      screenOptions={{
        animationDuration: 285,
        gestureEnabled: true,
        fullScreenGestureEnabled: false,
        headerShown: false,
      }}>
      <HomeTab.Screen name="Home" getComponent={() => HomeScreen} />
      <HomeTab.Screen name="Start" getComponent={() => HomeScreen} />
      {commonScreens(HomeTab)}
    </HomeTab.Navigator>
  )
}

function SearchTabNavigator() {
  return (
    <HomeTab.Navigator
      screenOptions={{
        animationDuration: 285,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        headerShown: false,
      }}>
      <SearchTab.Screen name="Search" getComponent={() => SearchScreen} />
      {commonScreens(SearchTab as typeof HomeTab)}
    </HomeTab.Navigator>
  )
}

function NotificationTabNavigator() {
  return (
    <HomeTab.Navigator
      screenOptions={{
        animationDuration: 285,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        headerShown: false,
      }}>
      <NotificationsTab.Screen
        name="Notifications"
        getComponent={() => NotificationScreen}
      />
      {commonScreens(NotificationsTab as typeof HomeTab)}
    </HomeTab.Navigator>
  )
}

function MyProfileTabNavigator() {
  return (
    <MyProfileTab.Navigator
      screenOptions={{
        animationDuration: 285,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        headerShown: false,
      }}>
      <MyProfileTab.Screen
        // @ts-ignore // TODO: fix this broken type in ProfileScreen
        name="MyProfile"
        getComponent={() => ProfileScreen}
      />
      {commonScreens(MyProfileTab as typeof HomeTab)}
    </MyProfileTab.Navigator>
  )
}

function MessagesTabNavigator() {
  return (
    <MessagesTab.Navigator
      screenOptions={{
        animationDuration: 285,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        headerShown: false,
      }}>
      <MessagesTab.Screen
        name="Messages"
        getComponent={() => MessageScreen}
        options={({ route }) => ({
          requireAuth: true,
          animationTypeForReplace: route.params?.animation ?? 'push',
        })}
      />
      {commonScreens(MessagesTab as typeof HomeTab)}
    </MessagesTab.Navigator>
  )
}

/**
 * The RoutesContainer should wrap all components which need access
 * to the navigation context.
 */

function RoutesContainer({ children }: React.PropsWithChildren<{}>) {
  const prevLoggedRouteName = React.useRef<string | undefined>(undefined)

  function onReady() {
    prevLoggedRouteName.current = getCurrentRouteName()
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      //   linking={LINKING}
      //   theme={theme}
      onReady={() => {
        onReady()
      }}>
      {children}
    </NavigationContainer>
  )
}

function getCurrentRouteName() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name
  } else {
    return undefined
  }
}

/**
 * These helpers can be used from outside of the RoutesContainer
 * (eg in the state models).
 */

export { RoutesContainer, TabsNavigator }

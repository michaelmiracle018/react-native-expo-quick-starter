import { NavigationState, PartialState } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type { NativeStackScreenProps } from '@react-navigation/native-stack'

export type CommonNavigatorParams = {
  ToastScreen: undefined
  Start: undefined
  InputScreen: undefined
  FlatListScreen: undefined
  DropDownScreen: undefined
  TimerScreen: undefined
}

export type BottomTabNavigatorParams = CommonNavigatorParams & {
  HomeTab: undefined
  SearchTab: undefined
  NotificationsTab: undefined
  MyProfileTab: undefined
  MessagesTab: undefined
}

export type HomeTabNavigatorParams = CommonNavigatorParams & {
  Home: undefined
}

export type SearchTabNavigatorParams = CommonNavigatorParams & {
  Search: { q?: string }
}

export type NotificationsTabNavigatorParams = CommonNavigatorParams & {
  Notifications: undefined
}

export type MyProfileTabNavigatorParams = CommonNavigatorParams & {
  MyProfile: undefined
}

export type MessagesTabNavigatorParams = CommonNavigatorParams & {
  Messages: { pushToConversation?: string; animation?: 'push' | 'pop' }
}

export type FlatNavigatorParams = CommonNavigatorParams & {
  Home: undefined
  Search: { q?: string }
  Feeds: undefined
  Notifications: undefined
  Hashtag: { tag: string; author?: string }
  Topic: { topic: string }
  Messages: { pushToConversation?: string; animation?: 'push' | 'pop' }
}

export type AllNavigatorParams = CommonNavigatorParams & {
  HomeTab: undefined
  Home: undefined
  SearchTab: undefined
  NotificationsTab: undefined
  MyProfileTab: undefined
  MessagesTab: undefined
  ToastScreen: undefined
  Start: undefined
  InputScreen: undefined
  FlatListScreen: undefined
  DropDownScreen: undefined
  TimerScreen: undefined

}

// NOTE
// this isn't strictly correct but it should be close enough
// a TS wizard might be able to get this 100%
// -prf
export type NavigationProp = NativeStackNavigationProp<AllNavigatorParams>

export type State =
  | NavigationState
  | Omit<PartialState<NavigationState>, 'stale'>

export type RouteParams = Record<string, string>
export type MatchResult = { params: RouteParams }
export type Route = {
  match: (path: string) => MatchResult | undefined
  build: (params: RouteParams) => string
}

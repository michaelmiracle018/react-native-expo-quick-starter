// import "#/platform/polyfills";
import { LogBox } from 'react-native'

import App from '~/App'
import { registerRootComponent } from 'expo'

const IS_TEST = true

if (IS_TEST) {
    LogBox.ignoreAllLogs(); // suppress all logs 
} else {
    LogBox.ignoreLogs(["Require cycle:"]); // suppress require-cycle warnings, it's fine
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)

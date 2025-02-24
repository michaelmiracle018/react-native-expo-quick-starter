import {View, ActivityIndicator} from 'react-native'

export default function CircleLoading({...props}) {
  return (
    <View>
      <ActivityIndicator {...props} size={30} />
    </View>
  )
}

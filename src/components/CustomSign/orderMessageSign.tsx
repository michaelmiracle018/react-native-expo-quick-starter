import {Image, View} from 'react-native'
import Colors from '~/constants/Colors'
import {cn} from '~/lib/utils'
import {Check} from '~/lib/icons/Check'
import {CircleDashed} from '~/lib/icons/CircleDashed'
import {X} from '~/lib/icons/X'
import images from '~/constants/images'

const OrderMessageSuccessSign = () => {
  return (
    <View className="w-7 h-7 rounded-full justify-center items-center bg-green-100">
      <View
        className={cn('w-5 h-5 rounded-full justify-center items-center')}
        style={{backgroundColor: Colors.light_green}}>
        <Check className="text-white" size={15} />
      </View>
    </View>
  )
}
const OrderMessageApprovedSign = () => {
  return (
    <View className="w-7 h-7 rounded-full justify-center items-center bg-blue-100">
      <View
        className={cn('w-5 h-5 rounded-full justify-center items-center')}
        style={{backgroundColor: Colors.primary}}>
        <Check className="text-white" size={15} />
      </View>
    </View>
  )
}

const OrderMessagePendingSign = () => {
  return (
    <View className="w-7 h-7 rounded-full justify-center items-center bg-yellow-100">
      <View
        className={cn('w-5 h-5 rounded-full justify-center items-center')}
        style={{backgroundColor: Colors.warning}}>
        <CircleDashed className="text-white" size={15} />
      </View>
    </View>
  )
}

const OrderMessageProcessingSign = () => {
  return (
    <View className="w-7 h-7 rounded-full justify-center items-center bg-pink-100">
      <View
        className={cn('w-5 h-5 rounded-full justify-center items-center')}
        style={{backgroundColor: Colors.pink_clr}}>
        <Image
          source={images.processing}
          className="h-4 w-4"
          style={{tintColor: '#FFF'}}
        />
      </View>
    </View>
  )
}

const OrderMessageErrorSign = () => {
  return (
    <View className="w-7 h-7 rounded-full justify-center items-center bg-red-100">
      <View
        className={cn('w-5 h-5 rounded-full justify-center items-center')}
        style={{backgroundColor: Colors.danger}}>
        <X className="text-white" size={15} />
      </View>
    </View>
  )
}

export {
  OrderMessageSuccessSign,
  OrderMessagePendingSign,
  OrderMessageProcessingSign,
  OrderMessageErrorSign,
  OrderMessageApprovedSign,
}

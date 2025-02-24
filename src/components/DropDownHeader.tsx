import {View} from 'react-native'

export default function DropDownHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <View className="spacing-1 sticky -mt-1">
      <View>
        <View className="flex-center">
          <View className="h-1 w-8 bg-black/80 rounded-md" />
        </View>
        {children}
      </View>
    </View>
  )
}

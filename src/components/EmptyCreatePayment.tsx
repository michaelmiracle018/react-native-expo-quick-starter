import {View, TouchableOpacity} from 'react-native'
import {Text} from './ui/text'
import {cn} from '~/lib/utils'
import {ChevronRight} from '~/lib/icons/ChevronRight'
import {Trans} from '@lingui/macro'

type Props = {
  handleCreatePayment: () => void
  selectPaymentMethodError: any
}

export default function EmptyCreatePayment({
  handleCreatePayment,
  selectPaymentMethodError,
}: Props) {
  return (
    <View>
      <View>
        <Text className="text-black font-[500] text-lg mb-1">
          <Trans>Recipient Account</Trans>
        </Text>

        <TouchableOpacity
          onPress={handleCreatePayment}
          activeOpacity={1}
          className={cn(
            'bg-stone-200 py-4 rounded-[6px] px-3',
            selectPaymentMethodError ? 'border-destructive border' : '',
          )}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text className="text-black font-[500] text-lg">
                Create a recipient account
              </Text>
            </View>
            <View>
              <ChevronRight size={25} className="text-black mr-2" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

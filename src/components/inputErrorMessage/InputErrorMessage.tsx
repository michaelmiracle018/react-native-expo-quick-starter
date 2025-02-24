import {View, Text} from 'react-native'
import {ErrorMessage} from '@hookform/error-message'
import {FieldErrors} from 'react-hook-form'

type Props = {
  errors: FieldErrors<any>
  name: string
}

export default function InputErrorMessage({errors, name}: Props) {
  return (
    <View>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({message}) => (
          <Text className="text-destructive">{message}</Text>
        )}
      />
    </View>
  )
}

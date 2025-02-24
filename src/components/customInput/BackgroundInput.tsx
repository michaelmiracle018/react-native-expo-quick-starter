import {TouchableOpacity, View} from 'react-native'
import {useState} from 'react'
import {Input} from '../ui/input'
import {Controller, FieldErrors, FieldValues} from 'react-hook-form'
import {cn} from '~/lib/utils'
import {Label} from '../ui/label'
import {ErrorMessage} from '@hookform/error-message'
import {Text} from '../ui/text'
import {Eye} from '../../lib/icons/Eye'
import {EyeOff} from '../../lib/icons/EyeOff'

type TextInputProps = {
  control?: any
  name: string
  patterValue?: any
  patterMessage?: any
  label?: string
  placeholder?: string
  nativeID?: string
  errors?: FieldErrors<any>
  inputErr: any
  secureTextEntry?: boolean
  trimText?: boolean
  validate?: any | FieldValues
  required?: string | boolean
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url'
}

export default function BackgroundInput({
  control,
  name,
  patterValue,
  patterMessage,
  placeholder,
  nativeID,
  label,
  errors,
  inputErr,
  secureTextEntry,
  trimText,
  validate,
  required,
  keyboardType,
  ...props
}: TextInputProps) {
  const [showPassowrd, setShowPassword] = useState(false)
  return (
    <View className="bg-transparent/5 p-2 rounded-2xl w-full mb-2">
      <Label className={cn('pb-2 native:pb-1 pl-0.5')} nativeID={nativeID}>
        {label}
      </Label>
      <View className="relative">
        <Controller
          control={control}
          rules={{
            required: required,
            pattern: {
              value: patterValue,
              message: patterMessage,
            },
            validate: validate,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder={placeholder}
              value={value}
              onChangeText={text => {
                // eslint-disable-next-line no-unused-expressions
                trimText ? onChange(text.trim()) : onChange(text)
              }}
              onBlur={onBlur}
              className={cn({'border-destructive': inputErr})}
              secureTextEntry={secureTextEntry ? !showPassowrd : showPassowrd}
              keyboardType={keyboardType}
              {...props}
            />
          )}
          name={name}
        />
        {secureTextEntry && (
          <TouchableOpacity
            className="absolute top-4 right-4"
            onPress={() => setShowPassword(!showPassowrd)}>
            {showPassowrd ? (
              <Eye className="text-info" size={24} />
            ) : (
              <EyeOff className="text-info" size={24} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({message}) => (
          <Text className="text-destructive pt-1">{message}</Text>
        )}
      />
    </View>
  )
}

import React, {useCallback, useEffect, useState} from 'react'
import {
  FlatList,
  Image,
  ImageURISource,
  View,
  TextStyle,
  ImageStyle,
  ViewStyle,
} from 'react-native'
import styles from './styles'
import {
  checkValidationRules,
  debounce,
  getDefaultRuleLabel,
  getValidation,
} from './validator'
import {RuleType} from './types'
import {Text} from '../ui/text'

type Props = {
  newPassword: string
  confirmPassword?: string
  onPasswordValidateChange: (data: boolean) => void
  validationRules: RuleType[]
  iconSuccessSource?: ImageURISource
  iconErrorSource?: ImageURISource
  containerStyle?: ViewStyle
  labelStyle?: TextStyle
  iconStyle?: ImageStyle
}

type CustomRuleType = RuleType & {validation: boolean; label: string}

const PasswordValidateCheck: React.FC<Props> = ({
  newPassword,
  confirmPassword,
  onPasswordValidateChange,
  validationRules,
  iconSuccessSource = require('../../../assets/images/success-1.png'),
  iconErrorSource = require('../../../assets/images/error.png'),
  containerStyle = {},
  labelStyle = {},
  iconStyle = {},
}) => {
  const [rulesList, setRulesList] = useState<CustomRuleType[]>([])

  const validatePasswords = (list: CustomRuleType[]) => {
    //  check if any field is false
    const allSuccess =
      list.some(object => object.validation === false) === false

    onPasswordValidateChange(allSuccess)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceValidationCheckFunc = useCallback(
    debounce(validatePasswords),
    [],
  )

  useEffect(() => {
    if (checkValidationRules(validationRules)) {
      setFieldsList()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPassword, confirmPassword, validationRules])

  const setFieldsList = () => {
    const list: CustomRuleType[] = []

    validationRules.forEach(rule => {
      const object = {
        ...rule,
        validation: getValidation(rule, newPassword, confirmPassword!),
        label: rule.label || getDefaultRuleLabel(rule.key, rule.ruleValue || 0),
      }

      list.push(object)
    })

    setRulesList(list)

    debounceValidationCheckFunc(list)
  }

  const renderItem = ({item}: {item: CustomRuleType}) => (
    <View style={styles.field}>
      {item.validation ? (
        <Image style={[styles.icon, iconStyle]} source={iconSuccessSource} />
      ) : (
        <Image style={[styles.icon, iconStyle]} source={iconErrorSource} />
      )}

      <Text style={[styles.label, labelStyle]} className="text-sm">
        {item.label}
      </Text>
    </View>
  )

  const keyExtractor = (item: any, index: number) => `${index}`

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <FlatList
        data={rulesList}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  )
}

export default PasswordValidateCheck

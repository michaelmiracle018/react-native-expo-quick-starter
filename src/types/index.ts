import {ViewStyle} from 'react-native'

export type SendEmailProp = {
  email: string
}

export type CurrecncySelector = {
  flag: string
  currency: string
  label: string
  value: string
}

export type ProfileFootercardProps = {
  verified: boolean
  title: string
  toolTipMsg: string
  toolTipMsgTitle?: string
}

// interface CurrencyProps {
//   currency: string
//   label: string
//   value: string
// }

export type MarketOrderInputProps = {
  amount: ''
  firstCurrency: null | {
    label: string
    value: string
    id: number
  }
  secondCurrency: null | {
    label: string
    value: string
    id: number
  }
  paymentMethod: any
}
export type MarketOrderInputPropss = {
  amount: ''
  firstCurrency: string
  secondCurrency: string
  paymentMethod: any
}

export interface PropsFromDropDown {
  label: string
  value: string
}

export type CreatePaymentTypeProps = {
  currency: string | any
  paymentType: string | null | any
  accountName: any
  accountNumber: any
  bankName: any
  countryCFACode: any
  address: any
}

export type AllPaymentDetailsProps = {
  accountName: string
  accountNumber: string
  address: string
  bankBranch: string
  bankCode: string
  bankName: string
  countryCode: string
  currency: string
  _id: string
}

export interface AllPaymentDetailsInterface {
  accountName: string
  accountNumber: string
  address: string
  bankBranch: string
  bankCode: string
  bankName: string
  countryCode: string
  currency: string
  _id: string
}

export interface ChangePasswordProps {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface LanguageProps {
  code2: string
  name: string
  type: string
}

export interface EditQuoteProps {
  firstRate: string
  secondRate: string
  firstAmountRange: string
  secondAmountRange: string
  amountRangeCurrency: any
  paymentMethod: any
}

export interface OrderHistoryFIlterProps {
  id: string
  title: string
  select: string
}

export interface OrderAmountInfoProps {
  currency?: string
  amount?: number | string
  title?: string
  withCurrency?: boolean
  style?: ViewStyle
  canCopyText?: boolean
}

export interface CollectionCedisFormProps {
  accountName: string
  accountNumber: string
  bankCode: string
}

export interface MakePaymentInfoProps {
  title?: string
  text?: string
  style?: ViewStyle
  isLoading?: boolean
  copyItem?: boolean
}

export interface MakePaymentXOFInfoProps {
  country: string
  accountNumber: string
  accountName: string
  bankCode: string
}

export interface MarketGetAllCurrencypairProps {
  tradingType: string
  tradingCurrency: string | undefined
  targetCurrency: string | undefined
  pageParam: number
}
interface CurrencyPairProps {
  targetCurrency?: string
  tradingCurrency?: string
}

interface UserCurrencyPairProps {
  email?: string | undefined
  firstName?: string
  lastName?: string
  fullname?: string
  _id?: string
}
export interface NumberDecimal {
  $numberDecimal: string | number
}

interface RateCurrencyPairProps {
  tradingCurrencyRate?: NumberDecimal
  targetCurrencyRate?: NumberDecimal
}

interface TradingAmountRangeProps {
  min?: NumberDecimal
  max?: NumberDecimal
}

export interface MarketGetAllCurrencypairInfoProps {
  currencyPair: CurrencyPairProps | null
  user: UserCurrencyPairProps | null
  rate: RateCurrencyPairProps | null
  tradingAmountRange: TradingAmountRangeProps
  amountRangeCurrency: string
  _id: string
  businessInfo: {name: string}
}

export interface RenderLoaderProps {
  isLoadingPage: boolean
  isFetchingNextPageInfo: boolean
  hasNextPageInfo: boolean
  itemLenght: number | undefined
}

export interface ChangePasswordInterface {
  oldPassword: string
  newPassword: string
}

//QUOTE PROPS
interface QuoteCurrencyProps {
  tradingCurrency: string
  targetCurrency: string
}

export interface QuoteProps {
  _id: string
  currencyPair: QuoteCurrencyProps | null
  rate: RateCurrencyPairProps | null
  tradingType: string
  isActive: boolean
  paymentDetails: string
  amountRangeCurrency: string
  createdAt: string
  tradingAmountRange: TradingAmountRangeProps
}

//QUOTE PROPS

// ORDER PROPS

export interface alternativeAmountProps {
  alternativeAmountRange: TradingAmountRangeProps
  _id: string
  alternativeAmountRangeCurrency: string
  amountRangeCurrency: string
  createdAt: string
  currencyPair: CurrencyPairProps
  isActive: boolean
  paymentDetails: CreatePaymentTypeProps
  rate: RateCurrencyPairProps
  tradingType: string
  user: string
}

export interface VirtualWalletProps {
  status: string
  amountPaid: NumberDecimal
  amount: NumberDecimal
  paymentSource: string
}

export interface UserOrderProps {
  firstName: string
  lastName: string
  _id: string
  fullName: string
}

export interface Orederprops {
  amountToBePaidByCustomer: NumberDecimal
  amountToBePaidByTrader: NumberDecimal
  createdAt: string
  currencyPair: alternativeAmountProps
  customerAmountToTransact: NumberDecimal
  customerVirtualWallet: VirtualWalletProps
  isApproved: boolean
  orderDepositStatus: string
  orderNumber: string
  paymentDetails: CreatePaymentTypeProps
  status: string
  tradeInAmount: NumberDecimal
  tradeInCurrency: string
  traderAmountToTransact: NumberDecimal
  traderCurrency: string
  traderPayoutStatus: string
  traderReferenceId: string
  traderSendafrikaCharges: NumberDecimal
  traderVirtualWallet: VirtualWalletProps
  tradingType: string
  user: UserOrderProps
  _id: string
  customerCurrency: string
  confirmOrderPayment: boolean
  updatedAt: string
  senderName: string
  approvedAt: string
}

export interface RouteDataProps {
  customerCurrency: string
  id: string
  user: string
  loginUserID: string
  traderTradingType: string
  customerTradingType: string
  tradingCurrency: string
  targetCurrency: string
  traderCurrency: string
}

export interface MakeOrderProps {
  tradeInAmount: number
  tradeInCurrency: string
  currencyPair: string
  // paymentDetails: string
}

// SIGN UP PROPS
interface AccountTypeProps {
  accountName: string
  businessType: string
}
interface BusinessProps {
  incorporationType: string
  incorporationCountry: string
  registrationNumber: string
  name: string
  website: string
}

export interface SignUpSumbmitProps {
  firstName: string
  lastName: string
  otherNames: string
  email: string
  password: string
  confirmPassword: string
  countryCode: string
  country: string
  phoneNumber: string
  dialCode: string
  isEmailVerified: boolean
  isPhoneNumberVerified: boolean
  accountType: AccountTypeProps
  business: BusinessProps
}

export interface AccountBalanceProps {
  _id: string
  currency: string
  currentBalance: NumberDecimal | any
  flagEmoji: string
  currencyShortHand: string
  symbol: string
  walletType: string
}

interface PaymentWithdrawalProps {
  accountNumber: string
  accountName: string
  bankName: string
  currency: string
}

interface CalculatedChargesProps {
  amountToTransact: number
  sendAfrikaCharges: number
  totalCharges: number
}
export interface WithdrawalChargesProps {
  payment: PaymentWithdrawalProps
  calculatedCharges: CalculatedChargesProps
  totalAmount: number
}

export interface TransactionsHistoryFlashListProps {
  transactionId: string
  amount: number
  currency: string
  transactionType: string
  status: string
  createdAt: string
  _id: string
}

interface PaymentDetailsProps {
  accountNumber: string
  accountName: string
  bankName: string
}

export interface SpecificTransactionsHistoryProps {
  transactionId: string
  amount: number
  currency: string
  transactionType: string
  status: string
  createdAt: string
  _id: string
  paymentDetails: PaymentDetailsProps
  additionalCharges: string
  totalAmount: string
}

export interface AddFundGHSInfoProps {
  accountName: string
  accountNumber: string
  bankName: string
  currency: string
  _id: string
  merchantId: string
  createdAt: string
  paymentType: string
  amount: string
}

export interface DropdownSelectHandle {
  open: () => void
  close: () => void
}

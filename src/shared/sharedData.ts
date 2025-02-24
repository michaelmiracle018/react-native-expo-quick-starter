export const forgetFormSteps = [
  {
    id: 'Step 1',
    name: 'email',
    fields: ['email'],
  },
  {
    id: 'Step 2',
    name: 'token',
    fields: ['token'],
  },
  {
    id: 'Step 3',
    name: 'password',
    fields: ['password', 'confirmPassword'],
  },
]

export const signUpFormSteps = [
  {
    id: 'Step 1',
    name: 'accountName',
    fields: ['accountName'],
  },
  {
    id: 'Step 2',
    name: 'email',
    fields: ['email', 'isEmailVerified'],
  },
  {
    id: 'Step 3',
    name: 'phoneNumber',
    fields: [
      'phoneNumber',
      'isPhoneNumberVerified',
      'country',
      'dialCode',
      'countryCode',
    ],
  },
  {
    id: 'Step 4',
    name: 'personal information',
    fields: ['firstName', 'lastName', 'otherNames'],
  },
  {
    id: 'Step 5',
    name: 'business information',
    fields: [
      'businessType',
      'businessName',
      'incorporationType',
      'incorporationCountry',
      'registrationNumber',
      'website',
    ],
  },
  {
    id: 'Step 6',
    name: 'password information',
    fields: ['password', 'confirmPassword'],
  },
]

export const businessType = [
  {
    label: `REGISTERED BUSINESS`,
    value: 'REGISTERED',
  },
  {
    label: `NON REGISTERED BUSINESS`,
    value: 'NON REGISTERED',
  },
]

export const incorporationItems = [
  {
    label: 'Sole Proprietorship',
    value: 'sole_proprietorship',
  },
  {
    label: 'Private Limited Company',
    value: 'private_limited_company',
  },
  {
    label: 'Public Limited Company',
    value: 'public_limited_company',
  },
  {
    label: 'Limited Partnership',
    value: 'limited_partnership',
  },
  {
    label: 'Holding Company',
    value: 'holding_company',
  },
  {
    label: 'Non Government Organisation',
    value: 'non_government_organisation',
  },
  {
    label: 'Statutory Company',
    value: 'statutory_company',
  },
  {
    label: 'Subsidiary Company',
    value: 'subsidiary_company',
  },
  {
    label: 'Unlimited Partnership',
    value: 'unlimited_partnership',
  },
  {
    label: 'Charitable Incorporated Organisation',
    value: 'charitable_incorporated_organisation',
  },
  {
    label: 'Chartered Company',
    value: 'chartered_company',
  },
]

export const newCurrencyData = [
  {
    label: 'NGN',
    value: 'NGN',
  },
  {
    label: 'GHS',
    value: 'GHS',
  },
  {
    label: 'XOF',
    value: 'XOF',
  },
]

export const paymentFormSteps = [
  {
    id: 'Step 1',
    name: 'country & currency',
    fields: ['currency'],
  },
  {
    id: 'Step 2',
    name: 'payment type',
    fields: ['paymentType', 'countryXOFCode'],
  },
  {
    id: 'Step 3',
    name: 'account details',
    fields: ['accountName', 'accountNumber', 'bankName', 'address'],
  },
]

export const countriesXOFCurrency = [
  {
    label: "Cote D'Ivoire",
    value: 'CI',
  },
  {
    label: 'Senegal',
    value: 'SN',
  },
  {
    label: 'Benin',
    value: 'BJ',
  },
  {
    label: 'Togo',
    value: 'TG',
  },
  {
    label: 'Burkina Faso',
    value: 'BF',
  },
]
export const countriesXAFCurrency = [
  {
    label: 'Cameroon',
    value: 'CM',
  },
]

export const paymentDataInfo = [
  {
    countryCode: 'GH',
    currency: 'GHS',
    mobile_money_data: 'MOBILE_MONEY',
    bank_data: 'BANK',
    paymentType: [
      {
        label: 'Mobile Money',
        value: 'MOMO',
      },
      {
        label: 'Bank',
        value: 'BANK',
      },
    ],
  },
  {
    countryCode: 'NG',
    mobile_money_data: 'MOBILE_MONEY',
    bank_data: 'BANK',
    currency: 'NGN',
    paymentType: [
      {
        label: 'Bank',
        value: 'BANK',
      },
    ],
  },
]

export const paymentTypeForXOFCountries = [
  {label: 'Mobile Money', value: 'MOBILE_MONEY'},
]

export const paymentTypeByXOFCountries = [
  {
    country: "Cote D'Ivoire",
    countryCode: 'CI',
    paymentTypes: [
      {
        label: 'Orange Money',
        value: 'orange-Orange Money',
      },
      {
        label: 'MTN',
        value: 'mtn-MTN',
      },
      {
        label: 'Moov Money',
        value: 'moov-Moov Money',
      },
      {
        label: 'Wave Money',
        value: 'wave-Wave Money',
      },
    ],
  },
  {
    country: 'Senegal',
    countryCode: 'SN',
    paymentTypes: [
      {
        label: 'Orange Money',
        value: 'orange-Orange Money',
      },
      {
        label: 'Free Money',
        value: 'free-Free Money',
      },
      {
        label: 'Wave Money',
        value: 'wave-Wave Money',
      },
    ],
  },
  {
    country: 'Benin',
    countryCode: 'BJ',
    paymentTypes: [
      {
        label: 'MTN Money',
        value: 'mtn-MTN Money',
      },
      {
        label: 'Moov Money',
        value: 'moov-Moov Money',
      },
    ],
  },
  {
    country: 'Togo',
    countryCode: 'TG',
    paymentTypes: [
      {
        label: 'TMoney',
        value: 'tmoney-TMoney',
      },
      {
        label: 'Moov Money',
        value: 'moov-Moov Money',
      },
    ],
  },
  {
    country: 'Burkina Faso',
    countryCode: 'BF',
    paymentTypes: [
      {
        label: 'Orange Money',
        value: 'orange-Orange Money',
      },
      {
        label: 'Moov Money',
        value: 'moov-Moov Money',
      },
    ],
  },
]

export const paymentTypeByXAFCountries = [
  {
    country: 'Cameroon',
    countryCode: 'CM',
    paymentTypes: [
      {
        label: 'Orange Money',
        value: 'orange-Orange Money',
      },
    ],
  },
]

export const paymentTypeForXAFCountries = [
  {label: 'Mobile Money', value: 'MOBILE_MONEY'},
]

export const mobile_money = [
  {
    label: 'Telecel',
    value: 'VOD',
  },
  {
    label: 'MTN',
    value: 'MTN',
  },
  {
    label: 'AirtelTigo',
    value: 'ATM',
  },
]

export const paymentXOFStep = [
  {
    id: 'Step 1',
    name: 'country',
    fields: ['country'],
  },
  {
    id: 'Step 2',
    name: 'payment type',
    fields: ['bankCode'],
  },
  {
    id: 'Step 3',
    name: 'account details',
    fields: ['accountNumber', 'accountName'],
  },
]

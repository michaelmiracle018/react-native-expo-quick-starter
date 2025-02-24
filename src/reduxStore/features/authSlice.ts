import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getDataFromStorage, removeDataFromStorage} from '~/utils/storageData'
import {ACCOUNT_TYPE, STORAGE_KEY} from '~/api/common/secretKeys'
import {responseToBooleanForObject} from '~/utils/checkValueForStorage'
import {responseInfo} from '~/utils/responseData'

export const authenticateUser = createAsyncThunk<any>(
  'auth/authenticate',
  async () => {
    try {
      const res = await getDataFromStorage(STORAGE_KEY)
      const requiredKeys = ['refreshToken', 'accessToken']
      const newRes = responseToBooleanForObject(res, requiredKeys)
      return newRes
    } catch (err) {
      throw false
    }
  },
)
export const logUserOut = createAsyncThunk('users/logOut', async () => {
  try {
    const res = await removeDataFromStorage(STORAGE_KEY)
    const requiredKeys = ['refreshToken', 'accessToken']
    const newRes = responseToBooleanForObject(res, requiredKeys)
    return newRes
  } catch (error) {
    throw error
  }
})

export const removeUserAccountType = createAsyncThunk(
  'users/userAccount',
  async () => {
    try {
      const response = await removeDataFromStorage(ACCOUNT_TYPE)
      const data = responseInfo(response)
      return data
    } catch (error) {
      throw error
    }
  },
)

export const userAccountType = createAsyncThunk(
  'users/accountType',
  async () => {
    try {
      const response = await getDataFromStorage(ACCOUNT_TYPE)
      return response
    } catch (error) {
      return error
    }
  },
)
type AccountType = {
  accountType: string
}

// Define a type for the slice state
interface AuthState {
  value: number
  isLoadingAuth: boolean
  isUserAuthenticated: boolean
  getUserAccountType: null | AccountType
  isLoadingUserAccount: boolean
  showMainModal: boolean
  isUserVerified: boolean
  isSessionExpired: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
  value: 0,
  isLoadingAuth: false,
  isUserAuthenticated: false,
  getUserAccountType: null,
  isLoadingUserAccount: false,
  showMainModal: false,
  isUserVerified: false,
  isSessionExpired: false,
}

export const authSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleShowModal: state => {
      state.showMainModal = false
    },
    toggleUserVerificationAndSessionModal: (state, {payload}) => {
      if (payload.userKycVerified) {
        state.showMainModal = payload.showMainModal
        state.isUserVerified = payload.userKycVerified
      }
      if (payload.sessionExpired) {
        state.showMainModal = payload.showMainModal
        state.isSessionExpired = payload.sessionExpired
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authenticateUser.pending, state => {
        state.isLoadingAuth = true
      })
      .addCase(authenticateUser.fulfilled, (state, {payload}) => {
        state.isLoadingAuth = false
        state.isUserAuthenticated = payload
      })
      .addCase(authenticateUser.rejected, state => {
        state.isLoadingAuth = false
      })
    builder
      .addCase(userAccountType.pending, state => {
        state.isLoadingUserAccount = true
      })
      .addCase(userAccountType.fulfilled, (state, {payload}) => {
        state.isLoadingUserAccount = false
        state.getUserAccountType = payload
      })
      .addCase(userAccountType.rejected, state => {
        state.isLoadingUserAccount = false
      })
    builder
      .addCase(logUserOut.pending, state => {
        state.isLoadingAuth = true
      })
      .addCase(logUserOut.fulfilled, (state, {payload}) => {
        state.isLoadingAuth = false
        state.isUserAuthenticated = payload
      })
      .addCase(logUserOut.rejected, state => {
        state.isLoadingAuth = false
      })
    builder
      .addCase(removeUserAccountType.pending, state => {
        state.isLoadingUserAccount = true
      })
      .addCase(removeUserAccountType.fulfilled, (state, {payload}) => {
        state.isLoadingUserAccount = false
        state.getUserAccountType = payload
      })
      .addCase(removeUserAccountType.rejected, state => {
        state.isLoadingUserAccount = false
      })
  },
})

export const {toggleUserVerificationAndSessionModal, toggleShowModal} =
  authSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default authSlice.reducer

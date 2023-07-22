import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'
import { User, UserSchema } from '../types/user'
import { setFeatureFlag } from '@/shared/lib/features'
import { saveJsonSettings } from '../services/saveJsonSettings'
import { JsonSettings } from '../types/jsonSettings'

const initialState: UserSchema = {
  _inited: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
      setFeatureFlag(action.payload.features)
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (user) {
        const json = JSON.parse(user) as User
        state.authData = json
        setFeatureFlag(json.features)
      }
      state._inited = true
    },
    logout: (state) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, action: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = action.payload
        }
      },
    )
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice

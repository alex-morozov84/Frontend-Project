import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Profile } from '@/entities/Profile'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import { ProfileSchema } from '../types/editableProfileCardSchema'

const initialState: ProfileSchema = {
  isLoading: false,
  readonly: true,
  error: undefined,
  data: undefined,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    serReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload
    },
    cancelEdit: (state) => {
      state.readonly = true
      state.validateErrors = undefined
      state.form = state.data
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state, action) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false
          state.data = action.payload
          state.form = action.payload
        },
      )
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(updateProfileData.pending, (state, action) => {
        state.validateErrors = undefined
        state.isLoading = true
      })
      .addCase(
        updateProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false
          state.data = action.payload
          state.form = action.payload
          state.readonly = true
          state.validateErrors = undefined
        },
      )
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.validateErrors = action.payload
      })
  },
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice

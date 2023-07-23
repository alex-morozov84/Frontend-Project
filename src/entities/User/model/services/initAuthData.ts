import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { User } from '../types/user'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'
import { getUserDataByIdQuery } from '../../api/userApi'

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (newJsonSettings, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI

    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY)

    if (!userId) {
      return rejectWithValue('')
    }

    try {
      return await dispatch(getUserDataByIdQuery(userId)).unwrap()
    } catch (e) {
      console.log(e)
      return rejectWithValue('')
    }
  },
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { User } from '../types/user'
import {LOCAL_STORAGE_LAST_DESIGN_KEY, USER_LOCALSTORAGE_KEY} from '@/shared/const/localStorage'
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
      // @ts-ignore
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap()
      localStorage.setItem(LOCAL_STORAGE_LAST_DESIGN_KEY, response.features?.isAppRedesigned ? 'new' : 'old')
      return response
    } catch (e) {
      console.log(e)
      return rejectWithValue('')
    }
  },
)

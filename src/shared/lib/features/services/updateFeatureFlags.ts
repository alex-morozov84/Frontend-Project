import {createAsyncThunk} from "@reduxjs/toolkit";
import {FeatureFlags} from "@/shared/types/featureFlags";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {updateFeatureFlagsMutation} from '../api/featureFlagsApi';
import {getAllFeatureFlags, setFeatureFlag} from '../lib/setGetFeatures';

interface UpdateFeatureFlagsOptions {
  userId: string
  newFeatures: Partial<FeatureFlags>
}

// При изменении флага в клиенте, отправляем новое значение на бэкенд
export const updateFeatureFlags = createAsyncThunk<
  void,
  UpdateFeatureFlagsOptions,
  ThunkConfig<string>
  >( 'features/updateFeatureFlag', async ({userId, newFeatures}, thunkApi) => {
    const {rejectWithValue, dispatch} = thunkApi

  const allFeatures = {
    ...getAllFeatureFlags(),
    ...newFeatures
  }

  try {
      await dispatch(
        updateFeatureFlagsMutation({
          userId,
          features: allFeatures
        })
      )

    setFeatureFlag(allFeatures)

    // Hack!! Т.к. фичи не хранятся в стейте, то при изменении флага в клиенте, отправляем новое состояние на сервер и жёстко перезагружаем страницу. Так лучше не делать, но в принципе можно, т.к. в реальных проектах фичи не меняются в рамках одной сессии
    // Позднее вместо этого использовали ForceUpdate Provider (урок 148)
    // window.location.reload()
    return
  } catch (e) {
    console.log(e)
    rejectWithValue('')
  }
})
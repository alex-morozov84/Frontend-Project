import { buildSelector } from '@/shared/lib/store'
import { JsonSettings } from '../types/jsonSettings'

const defaultJsonSettings: JsonSettings = {}

export const [useJsonSettings, getJsonSettings] = buildSelector(
  (state) => state.user?.authData?.jsonSettings ?? defaultJsonSettings,
)

// export const [useJsonSettingByKey, getJsonSettingByKey] = buildSelector(
//   (state, key: keyof JsonSettings) => state.user?.authData?.jsonSettings?.[key],
// )

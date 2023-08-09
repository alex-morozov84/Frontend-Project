import { FeatureFlags } from '@/shared/types/featureFlags'

let featureFlags: FeatureFlags = {}

export function setFeatureFlag(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  return featureFlags[flag]
}

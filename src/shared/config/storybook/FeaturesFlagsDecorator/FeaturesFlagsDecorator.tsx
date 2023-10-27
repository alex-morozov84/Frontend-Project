import {Story} from "@storybook/react";
import {FeatureFlags} from "@/shared/types/featureFlags";
import {setFeatureFlag} from "@/shared/lib/features";

export const FeaturesFlagsDecorator = (features: FeatureFlags) => (StoryComponent: Story) => {
  setFeatureFlag(features)
  return (
    <StoryComponent/>
  )
}
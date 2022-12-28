import { Story } from '@storybook/react'
import { Theme } from '@/shared/const/theme'
// eslint-disable-next-line path-checker/layer-imports

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
  <StoryComponent />

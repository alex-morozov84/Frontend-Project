import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Button } from './Button'
import { Theme } from '@/shared/const/theme'

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Text',
}

export const Clear = Template.bind({})
Clear.args = {
  children: 'Text',
  variant: 'clear',
}

export const Outline = Template.bind({})
Outline.args = {
  children: 'Text',
  variant: 'outline',
}

export const OutlineDark = Template.bind({})
OutlineDark.args = {
  children: 'Text',
  variant: 'outline',
}
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Square = Template.bind({})
Square.args = {
  children: '>',
  variant: 'outline',
  square: true,
}

export const SquareSizeL = Template.bind({})
SquareSizeL.args = {
  children: '>',
  variant: 'outline',
  square: true,
  size: 'l',
}

export const SquareSizeXL = Template.bind({})
SquareSizeXL.args = {
  children: '>',
  variant: 'outline',
  square: true,
  size: 'xl',
}

export const OutlineSizeL = Template.bind({})
OutlineSizeL.args = {
  children: 'Text',
  variant: 'outline',
  size: 'l',
}

export const OutlineSizeXL = Template.bind({})
OutlineSizeXL.args = {
  children: 'Text',
  variant: 'outline',
  size: 'xl',
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Text',
  variant: 'outline',
  disabled: true,
}

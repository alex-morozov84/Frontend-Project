import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { CountrySelect } from '../CountrySelect/CountrySelect'

export default {
  title: 'entities/CountrySelect',
  component: CountrySelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof CountrySelect>

const Template: ComponentStory<typeof CountrySelect> = (args) => (
  <CountrySelect {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}

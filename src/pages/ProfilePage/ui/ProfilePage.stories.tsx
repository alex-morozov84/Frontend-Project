import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import ProfilePage from './ProfilePage'
import { Country } from '../../../entities/Country'
import { Currency } from '../../../entities/Currency'
import { Theme } from '@/shared/const/theme'

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
  StoreDecorator({
    profile: {
      form: {
        username: 'admin',
        first: 'Александр',
        lastname: 'Морозов',
        country: Country.Russia,
        age: 38,
        currency: Currency.RUB,
        city: 'Санкт-Петербург',
      },
    },
  }),
]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      form: {
        username: 'admin',
        first: 'Александр',
        lastname: 'Морозов',
        country: Country.Russia,
        age: 38,
        currency: Currency.RUB,
        city: 'Санкт-Петербург',
      },
    },
  }),
]

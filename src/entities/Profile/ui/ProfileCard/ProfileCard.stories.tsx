import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Country} from '@/entities/Country'
import {Currency} from '@/entities/Currency'
import avatar from '@/shared/assets/tests/Avatar.jpg'
import {ProfileCard} from './ProfileCard'
import {NewDesignDecorator} from "@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator";

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
)

const primaryArgs = {
  data: {
    username: 'admin',
    first: 'Александр',
    lastname: 'Морозов',
    country: Country.Russia,
    age: 38,
    currency: Currency.RUB,
    city: 'Санкт-Петербург',
    avatar,
  },
}

export const Primary = Template.bind({})
Primary.args = primaryArgs

export const PrimaryRedesigned = Template.bind({})
PrimaryRedesigned.args = primaryArgs
PrimaryRedesigned.decorators = [NewDesignDecorator]

export const withError = Template.bind({})
withError.args = {
  error: 'true',
}

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true,
}

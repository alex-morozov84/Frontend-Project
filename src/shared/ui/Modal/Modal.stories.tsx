import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Modal } from './Modal';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium dolorem dolores eos et iusto nesciunt odio provident qui sed. Ad architecto distinctio doloribus exercitationem laboriosam neque rem repudiandae ut velit!',
};

export const Dark = Template.bind({});
Dark.args = {
  isOpen: true,
  children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium dolorem dolores eos et iusto nesciunt odio provident qui sed. Ad architecto distinctio doloribus exercitationem laboriosam neque rem repudiandae ut velit!',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

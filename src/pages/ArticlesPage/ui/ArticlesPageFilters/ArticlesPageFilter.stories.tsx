import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticlesPageFilter } from './ArticlesPageFilter';

export default {
  title: 'pages/Article/ArticlesPageFilter',
  component: ArticlesPageFilter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesPageFilter>;

const Template: ComponentStory<typeof ArticlesPageFilter> = (args) => <ArticlesPageFilter {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

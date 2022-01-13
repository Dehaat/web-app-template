import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import HomeComponent from 'routes/Home'

export default {
  title: 'Template/Routes',
  component: HomeComponent,
} as ComponentMeta<typeof HomeComponent>

const Template: ComponentStory<typeof HomeComponent> = () => <HomeComponent />

export const Home = Template.bind({})

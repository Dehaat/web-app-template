import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ImageComponent from 'components/Image'

export default {
  title: 'Template/Components',
  component: ImageComponent,
} as ComponentMeta<typeof ImageComponent>

const Template: ComponentStory<typeof ImageComponent> = () => <ImageComponent />

export const Image = Template.bind({})

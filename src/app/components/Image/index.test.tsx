import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './index.stories'

const { Image } = composeStories(stories)

describe('<Image />', () => {
  test('should load image', () => {
    render(<Image />)
    const imageElement = screen.getByAltText('react-icon')
    expect(imageElement).toBeDefined()
  })
})

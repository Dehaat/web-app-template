import React from 'react'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import * as stories from '../index.stories'

const { Home } = composeStories(stories)

describe('<Home />', () => {
  test('should render correctly', () => {
    render(<Home />)
    expect(screen.getByText('This is home page!')).toBeInTheDocument()
  })
})

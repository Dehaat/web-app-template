import React from 'react'
import renderWithRouter from 'utils/renderWithRouter'

import { screen } from '@testing-library/react'

import App from './App'

test('full app rendering/navigating', () => {
  renderWithRouter(<App />)
  expect(screen.getByText(/This is home page!/i)).toBeDefined()
})

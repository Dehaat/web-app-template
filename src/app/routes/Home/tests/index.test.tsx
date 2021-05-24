import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Home from '..'

describe('<Home />', () => {
  test('should render correctly', () => {
    render(<Home />)
    expect(screen.getByText('This is home page!')).toBeInTheDocument()
  })
})

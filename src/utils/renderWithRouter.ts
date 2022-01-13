import { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { render } from '@testing-library/react'

/**
 * A test utililty function
 *
 * This function can be used mock the routing logic for
 * the jest test cases.
 *
 * **Example:**
 * - renderWithRouter(<App />) => would load the page with default router '/'
 * - renderWithRouter(<App />, { route: '/home' }) => would load the page with '/home' route
 */
const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })
}

export default renderWithRouter

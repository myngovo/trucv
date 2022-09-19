import React from 'react'
import { MantineProvider, ColorSchemeProvider } from '@mantine/core'

import LayoutInner from './components/LayoutInner'

const App = ({ children, location }) => {
  return (
    <>
      <ColorSchemeProvider>
        <div>
          <LayoutInner location={location}>{children}</LayoutInner>
        </div>
      </ColorSchemeProvider>
    </>
  )
}

export default App

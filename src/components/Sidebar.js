import React, { useState } from 'react'
import { Navbar } from '@mantine/core'
import MainLinks from './MainLinks'

const Sidebar = () => {
  const [opened] = useState(false)
  return (
    <>
      <Navbar
        p='md'
        hiddenBreakpoint='sm'
        hidden={!opened}
        width={{ sm: 200, lg: 200 }}
      >
        <Navbar.Section grow mt='xs'>
          <MainLinks />
        </Navbar.Section>
      </Navbar>
    </>
  )
}

export default Sidebar

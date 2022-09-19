import React from 'react'
import { Loader as Load, Center } from '@mantine/core'

const Loader = () => {
  return (
    <Center>
      <Load color='teal' variant='dots' size='xl' />
    </Center>
  )
}

export default Loader

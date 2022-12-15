import React from 'react'
import { Link } from 'react-router-dom'
import PageSection from '../../PageSection/PageSection'
import { Button, Center } from '@mantine/core'

const Section = () => {
  return (
    <PageSection
      title='The perfect CV for knowledge workers'
      description='Elevate your CV and standout from the sea of CVs. Tru CV builder has a powerful and intuitive interface built for the modern job market.'
    >
      <Center p='xl'>
        <Button
          color='orange'
          size='lg'
          compact
          component={Link}
          to='/products/builder/build'
        >
          Create my CV
        </Button>
      </Center>
    </PageSection>
  )
}

export default Section

import React from 'react'
import { Link } from 'react-router-dom'
import PageSection from '../../PageSection/PageSection'
import { Button, Center, Image } from '@mantine/core'

const Header = () => {
  return (
    <PageSection
      title='The Best Free Online CV Builder in Kenya'
      description='Create professional CVs and download in PDF with Tru CV Builder- to land that dream job. Create CVs that beat the CV scanner in 5 minutes'
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
      <div style={{ width: 400, marginLeft: 'auto', marginRight: 'auto' }}>
        <Image
          radius='md'
          src='https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=896&q=80'
          alt='Random unsplash image'
        />
      </div>
    </PageSection>
  )
}

export default Header

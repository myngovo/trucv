import React from 'react'
import { Link } from 'react-router-dom'
import PageSection from '../../PageSection/PageSection'
import { Button, Center, Image } from '@mantine/core'

const Header = () => {
  return (
    <PageSection
      title='Less stressful job search'
      description='Search and download the best reviewed CVs across job roles and industries- tweak them and multiply chances of getting that job'
    >
      <Center p='xl'>
        <Button
          color='orange'
          size='lg'
          compact
          component={Link}
          to='/products/samples/library'
        >
          Access CV Library
        </Button>
      </Center>
      <div style={{ width: 550, marginLeft: 'auto', marginRight: 'auto' }}>
        <Image
          radius='md'
          src='https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'
          alt='Random unsplash image'
        />
      </div>
    </PageSection>
  )
}

export default Header

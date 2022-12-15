import React from 'react'
import { Link } from 'react-router-dom'
import PageSection from '../../PageSection/PageSection'
import { Button, Center, Image } from '@mantine/core'

const Header = () => {
  return (
    <>
      <PageSection
        title='Our Write ‘n’ Earn program pays you for helping us grow our sample CV library'
        description='Ever wished you could get paid writing CVs? Wish no more . . .'
      >
        <Center p='xl'>
          <Button
            color='orange'
            size='lg'
            compact
            component={Link}
            to='/products/write-n-earn/join'
          >
            Join the program
          </Button>
        </Center>
        <div style={{ width: 500, marginLeft: 'auto', marginRight: 'auto' }}>
          <Image
            radius='md'
            src='https://images.unsplash.com/photo-1536762733888-d86cc96c10b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
            alt='Random unsplash image'
          />
        </div>
      </PageSection>
      <PageSection title='Our aim is to make this program transparent and profitable for our community. Check out a few FAQs below'></PageSection>
    </>
  )
}

export default Header

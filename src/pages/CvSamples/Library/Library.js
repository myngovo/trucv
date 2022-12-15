import React from 'react'
import { Link } from 'react-router-dom'
import PageSection from '../../PageSection/PageSection'
import { Button, Center, Image, Stack } from '@mantine/core'
import { IconArrowBarToRight } from '@tabler/icons'

const Library = () => {
  return (
    <>
      <PageSection title='Check our full CV library'>
        <div style={{ width: 550, marginLeft: 'auto', marginRight: 'auto' }}>
          <Image
            radius='md'
            src='https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=628&q=80'
            alt='cv library image'
          />
        </div>
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
      </PageSection>
      <PageSection
        title='Anxious how your CV will be perceived?'
        description='Worry no more. We’ve got a library of sample CVs that solve your problem.
Access industry-optimized and take the pain out of your job application process.
'
      >
        <Stack align='center' spacing='md' pt='xl'>
          <Button
            variant='subtle'
            color='orange'
            size='md'
            component={Link}
            to='/products/builder'
            rightIcon={<IconArrowBarToRight />}
          >
            Create your CV for free
          </Button>
          <Button
            variant='subtle'
            color='orange'
            size='md'
            component={Link}
            to='/products/review'
            rightIcon={<IconArrowBarToRight />}
          >
            Get your CV reviewed
          </Button>
        </Stack>
      </PageSection>
    </>
  )
}

export default Library

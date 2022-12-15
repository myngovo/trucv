import { Button, Center, Stack } from '@mantine/core'
import { Link } from 'react-router-dom'
import React from 'react'
import PageSection from '../../PageSection/PageSection'
import { IconArrowBarToRight } from '@tabler/icons'

const Earn = () => {
  return (
    <>
      <PageSection
        title='Ready to earn?'
        description='Let’s get you started and join our growing community.'
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
      </PageSection>
      <Stack align='center' spacing='md' pt='xl'>
        <Button
          variant='subtle'
          color='orange'
          size='md'
          component={Link}
          to='/products/builder'
          rightIcon={<IconArrowBarToRight />}
        >
          Free CV Builder
        </Button>
        <Button
          variant='subtle'
          color='orange'
          size='md'
          component={Link}
          to='/products/review'
          rightIcon={<IconArrowBarToRight />}
        >
          CV Review AI
        </Button>
        <Button
          variant='subtle'
          color='orange'
          size='md'
          component={Link}
          to='/products/samples'
          rightIcon={<IconArrowBarToRight />}
        >
          Sample CVs
        </Button>
      </Stack>
    </>
  )
}

export default Earn

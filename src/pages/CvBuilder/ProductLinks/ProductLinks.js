import React from 'react'
import { Link } from 'react-router-dom'
import PageSection from '../../PageSection/PageSection'
import { Stack, Button } from '@mantine/core'
import { IconArrowBarToRight } from '@tabler/icons'

const ProductLinks = () => {
  return (
    <PageSection title='Experience the full power of a free CV generator that delivers without hindering your progress, no BS!'>
      <Stack align='center' spacing='md' pt='xl'>
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
        <Button
          variant='subtle'
          color='orange'
          size='md'
          component={Link}
          to='/products/samples'
          rightIcon={<IconArrowBarToRight />}
        >
          Access sample CVs
        </Button>
      </Stack>
    </PageSection>
  )
}

export default ProductLinks

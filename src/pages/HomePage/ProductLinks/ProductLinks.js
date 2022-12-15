import React from 'react'
import { Link } from 'react-router-dom'
import PageSection from '../../PageSection/PageSection'
import { Stack, Button } from '@mantine/core'
import { IconArrowBarToRight } from '@tabler/icons'

const ProductLinks = () => {
  return (
    <PageSection
      title='Get your confidence back with Tru CV'
      description='You can now access sample CVs, create ATS-friendly CVs and review the strength of your CV objectively with Tru CV.'
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
    </PageSection>
  )
}

export default ProductLinks

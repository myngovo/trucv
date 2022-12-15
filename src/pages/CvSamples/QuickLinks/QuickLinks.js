import React from 'react'
import Feature from './Feature'
import { SimpleGrid } from '@mantine/core'
import { data } from './data'
import PageSection from '../../PageSection/PageSection'

const QuickLinks = () => {
  const items = data.map((item) => <Feature {...item} key={item.title} />)
  return (
    <PageSection title='Quick Access'>
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        spacing={50}
      >
        {items}
      </SimpleGrid>
    </PageSection>
  )
}

export default QuickLinks

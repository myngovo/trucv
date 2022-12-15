import React, { useState, useEffect } from 'react'
import { NativeSelect, SimpleGrid, Stack } from '@mantine/core'
import PageSection from '../../PageSection/PageSection'
import { data } from './data'
import SampleCard from './SampleCard'

const Sample = () => {
  const [value, setValue] = useState('')
  const [year, setYear] = useState('')

  const titleJob = data.filter((c) => c.jobTitle.includes(value))

  return (
    <PageSection title='Sample CVs For You'>
      {' '}
      <Stack>
        <NativeSelect
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          data={[
            'Accounting',
            'Business Development',
            'Customer Success',
            'Data Analytics',
            'Finance',
            'Legal',
            'Marketing',
            'People and HR',
            'Product Sample',
            'Sales',
            'IT',
            'Software Engineering',
          ]}
          placeholder='select'
          label='Job Title'
        />
        <NativeSelect
          value={year}
          onChange={(event) => setYear(event.currentTarget.year)}
          data={['0-1', '1-4']}
          placeholder='select'
          label='Experience'
        />
      </Stack>
      <SimpleGrid
        pt='lg'
        cols={4}
        spacing='lg'
        breakpoints={[
          { maxWidth: 'md', cols: 3, spacing: 'md' },
          { maxWidth: 'sm', cols: 2, spacing: 'sm' },
          { maxWidth: 'xs', cols: 1, spacing: 'sm' },
        ]}
      >
        {titleJob.map((sample) => (
          <SampleCard key={sample.id} data={sample} />
        ))}
      </SimpleGrid>
    </PageSection>
  )
}

export default Sample

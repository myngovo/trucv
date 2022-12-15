import { Image } from '@mantine/core'
import React from 'react'
import PageSection from '../../PageSection/PageSection'
import image from './resume.svg'

const GetAhead = () => {
  return (
    <PageSection
      title='Get ahead of your competition'
      description='Never get caught short again on your CV. No more CV dead-ends and mysterious no-shows by recruiters.'
    >
      <div
        style={{
          width: 400,
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingTop: 30,
        }}
      >
        <Image radius='md' src={image} alt='hiring' />
      </div>
    </PageSection>
  )
}

export default GetAhead

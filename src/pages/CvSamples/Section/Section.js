import React from 'react'
import PageSection from '../../PageSection/PageSection'
import { Image } from '@mantine/core'
import image from './job_hunt.svg'

const Section = () => {
  return (
    <>
      <PageSection
        title='Finding a job is hard enough already'
        description='Get access to a library of the best reviewed CVs to use as inspiration for your next job application.'
      >
        <div
          style={{
            width: 550,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 40,
          }}
        >
          <Image radius='md' src={image} alt='Random unsplash image' />
        </div>
      </PageSection>
      <PageSection
        title='Create a great CV and impress'
        description='You can use real world examples from the best reviewed CVs available as an example for your own CV.'
      ></PageSection>
    </>
  )
}

export default Section

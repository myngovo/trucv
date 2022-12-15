import React from 'react'
import { Box } from '@mantine/core'
import Waves from './Waves/Waves'
import Jumbotron from './Jumbotron/Jumbotron'
import Workings from './Workings/Workings'
import Section from './Sections/Section'
import { SectionData } from './Sections/SectionData'
import GetReviewed from './GetReviewed/GetReviewed'
import { Helmet } from 'react-helmet'

const LandingPage = () => {
  return (
    <div>
      <Helmet>
        <title>Online CV Review – Score your CV in One Minute| TRU CVs</title>
        <meta
          name='description'
          content='Online CV Review allows you to gauge the strength of your CV and make the necessary improvements to land more interviews. Get a CV score and personalized report.'
        />
      </Helmet>
      <Box
        sx={(theme) => ({
          position: 'relative',
          zIndex: 1,
          boxShadow: theme.shadows.sm,
        })}
      >
        <Jumbotron />
        <Waves height={40} width={150} />
        <Workings />
        <Waves height={42} width={220} flip alt />
        <Section
          image={SectionData.image1}
          title={SectionData.title1}
          description={SectionData.Description1}
        />
        <Waves height={28} width={200} flip />
        <Section
          image={SectionData.image2}
          title={SectionData.title2}
          description={SectionData.Description2}
        />
        <Waves height={36} width={110} alt />
        <Section
          image={SectionData.image3}
          title={SectionData.title3}
          description={SectionData.Description3}
        />
        <Waves height={44} width={148} />
        <GetReviewed />
      </Box>
    </div>
  )
}

export default LandingPage

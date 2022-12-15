import React from 'react'
import { Box } from '@mantine/core'
import Waves from '../CvReview/Waves/Waves'
import Header from './Header/Header'
import Section from './Section/Section'
import QuickLinks from './QuickLinks/QuickLinks'
import Library from './Library/Library'
import { Helmet } from 'react-helmet'

const LandingPageSamples = () => {
  return (
    <>
      <Helmet>
        <title>
          Get Sample CVs -Search and Download Sample CVs in Any Industry|TRU CV
        </title>
        <meta
          name='description'
          content='Search and download sample CVs from any industry in one place. Tweak sample CVs in your industry and land more interviews today.'
        />
      </Helmet>
      <Box
        sx={(theme) => ({
          position: 'relative',
          zIndex: 1,
          boxShadow: theme.shadows.sm,
        })}
      >
        <Header />
        <Waves height={44} width={148} />
        <Section />
        <Waves height={36} width={110} alt />
        <QuickLinks />
        <Waves height={28} width={200} flip />
        <Library />
      </Box>
    </>
  )
}

export default LandingPageSamples

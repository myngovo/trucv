import React from 'react'
import { Box } from '@mantine/core'
import Waves from '../CvReview/Waves/Waves'
import Header from './Header/Header'
import GetAhead from './GetAhead/GetAhead'
import Features from './Features/Features'
import Section from './Sectiom/Section'
import ProductLinks from './ProductLinks/ProductLinks'
import { Helmet } from 'react-helmet'

const LandingPageBuilder = () => {
  return (
    <>
      <Helmet>
        <title>Create a Free CV – Online CV Builder in Kenya| TRU CV</title>
        <meta
          name='description'
          content='Free online CV builder, allows you to create an ATS-friendly CV and download as PDF. Create your CV and download immediately with step by step guidance and get more interviews.'
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
        <Waves height={42} width={150} alt />
        <GetAhead />
        <Waves height={22} width={120} flip />
        <Features />
        <Waves height={44} width={148} />
        <Section />
        <Waves height={30} width={134} alt />
        <ProductLinks />
      </Box>
    </>
  )
}

export default LandingPageBuilder

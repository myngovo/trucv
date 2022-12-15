import React from 'react'
import { Box } from '@mantine/core'
import Waves from '../CvReview/Waves/Waves'
import Header from './Header/Header'
import FAQ from './FAQ/FAQ'
import Earn from './Earn/Earn'
import { Helmet } from 'react-helmet'

const LandingPageWriteAndEarn = () => {
  return (
    <>
      <Helmet>
        <title>Get Paid Online- Write Sample CVs and Get Paid</title>
        <meta
          name='description'
          content='Earn money writing sample CVs today and get some extra cash online. Write, submit and get a payout as many times as you can.'
        />
      </Helmet>{' '}
      <Box
        sx={(theme) => ({
          position: 'relative',
          zIndex: 1,
          boxShadow: theme.shadows.sm,
        })}
      >
        <Header />
        <Waves height={42} width={150} alt />
        <FAQ />
        <Waves height={22} width={120} flip />
        <Earn />
        <Waves height={44} width={148} />
      </Box>
    </>
  )
}

export default LandingPageWriteAndEarn

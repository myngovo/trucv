import React from 'react'
import { Box } from '@mantine/core'
import Waves from '../CvReview/Waves/Waves'
import Features from './Features/Features'
import Header from './Header/Header'
import ProductLinks from './ProductLinks/ProductLinks'
import Products from './Products/Products'
import Section from './Section/Section'

const HomePage = () => {
  return (
    <div>
      <Box
        sx={(theme) => ({
          position: 'relative',
          zIndex: 1,
          boxShadow: theme.shadows.sm,
        })}
      >
        <Header />
        <Waves height={40} width={150} />
        <Products />
        <Waves height={42} width={220} flip alt />
        <Section />
        <Waves height={28} width={200} flip />
        <Features />
        <Waves height={36} width={110} alt />
        <ProductLinks />
      </Box>
    </div>
  )
}

export default HomePage

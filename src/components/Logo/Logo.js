import React from 'react'
import { Link } from 'react-router-dom'
import useStyles from './Logo.styles'
import { Image } from '@mantine/core'
import img from '../../logo.png'

const Logo = () => {
  const { classes } = useStyles()
  return (
    <Link to='/' className={classes.logo} aria-label='Mantine'>
      <Image width={150} height={60} radius='md' src={img} alt='myNGOVO logo' />
    </Link>
  )
}

export default Logo

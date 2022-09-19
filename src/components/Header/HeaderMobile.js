import React from 'react'
import { Burger } from '@mantine/core'
import ColorSchemeControl from '../HeaderControl/ColorSchemeControl'
import Logo from '../Logo/Logo'
import useStyles from './HeaderMobile.styles'

const HeaderMobile = ({ navbarOpened, toggleNavbar }) => {
  const { classes } = useStyles()

  return (
    <div className={classes.header}>
      <div className={classes.inner}>
        <Burger
          opened={navbarOpened}
          size='sm'
          onClick={toggleNavbar}
          aria-label='Toggle navbar'
        />
        <div className={classes.logo}>
          <Logo size={26} />
        </div>
        <ColorSchemeControl />
      </div>
    </div>
  )
}

export default HeaderMobile

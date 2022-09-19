import React from 'react'
import { Code } from '@mantine/core'
import HeaderControls from '../HeaderControl/HeaderControls'
import Logo from '../Logo/Logo'
import useStyles from './HeaderDesktop.styles'

const HeaderDesktop = () => {
  const { classes } = useStyles()
  return (
    <div className={classes.header}>
      <div className={classes.mainSection}>
        <div className={classes.logoWrapper}>
          <div className={classes.logo}>
            <Logo />
          </div>

          <div className={classes.version}>
            <Code>v 1.0</Code>
          </div>
        </div>
      </div>

      <HeaderControls pr='md' />
    </div>
  )
}

export default HeaderDesktop

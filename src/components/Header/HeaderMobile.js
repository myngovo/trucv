import React from 'react'
import { Burger } from '@mantine/core'
import ColorSchemeControl from '../HeaderControl/ColorSchemeControl'
import FeatureControl from '../HeaderControl/FeatureControl'
import Logo from '../Logo/Logo'
import useStyles from './HeaderMobile.styles'
import { useSelector } from 'react-redux'

const HeaderMobile = ({ navbarOpened, toggleNavbar }) => {
  const { classes } = useStyles()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

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
          <Logo size={24} />
        </div>
        {userInfo && (
          <>
            {' '}
            <FeatureControl />
            {userInfo.name}
          </>
        )}
      </div>
    </div>
  )
}

export default HeaderMobile

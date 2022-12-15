import React from 'react'
import { ScrollArea } from '@mantine/core'
import NavbarMainLink from './NavbarMainLink/NavbarMainLink'
import mainLinks from './main-links'
import useStyles from './Navbar.styles'
import adminLinks from './admin-links'
import { useDispatch, useSelector } from 'react-redux'
import { IconLogout } from '@tabler/icons'
import { logout } from '../../actions/userActions'

const Navbar = ({ data, opened, onClose }) => {
  const { classes, cx } = useStyles()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const admin = adminLinks.map((item) => (
    <NavbarMainLink
      key={item.to}
      to={item.to}
      color={item.color}
      icon={<item.icon size={item.rawIcon ? 30 : 18} stroke={2.2} />}
      onClick={onClose}
      rawIcon={item.rawIcon}
    >
      {item.label}
    </NavbarMainLink>
  ))

  const logoutHandler = () => {
    dispatch(logout())
    console.log('clicked')
  }

  const main = mainLinks.map((item) => (
    <NavbarMainLink
      key={item.to}
      to={item.to}
      color={item.color}
      icon={<item.icon size={item.rawIcon ? 30 : 18} stroke={2.2} />}
      onClick={item.label === 'Logout' ? logoutHandler : onClose}
      rawIcon={item.rawIcon}
    >
      {item.label}
    </NavbarMainLink>
  ))

  return (
    <nav className={cx(classes.navbar, { [classes.opened]: opened })}>
      <div className={classes.body}>
        {main}

        {userInfo && userInfo.isAdmin && <>{admin}</>}
      </div>
    </nav>
  )
}

export default Navbar

import React from 'react'
import { ScrollArea } from '@mantine/core'
import NavbarMainLink from './NavbarMainLink/NavbarMainLink'
import mainLinks from './main-links'
import useStyles from './Navbar.styles'

const Navbar = ({ data, opened, onClose }) => {
  const { classes, cx } = useStyles()

  const main = mainLinks.map((item) => (
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
  return (
    <nav className={cx(classes.navbar, { [classes.opened]: opened })}>
      <div className={classes.body}>{main}</div>
    </nav>
  )
}

export default Navbar

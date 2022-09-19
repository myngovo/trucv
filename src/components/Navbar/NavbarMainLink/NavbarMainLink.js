import React from 'react'
import { Link } from 'react-router-dom'
import { ThemeIcon, useMantineTheme } from '@mantine/core'
import useStyles from './NavbarMainLink.styles'

const NavbarMainLink = ({
  to,
  className,
  icon,
  children,
  color,
  onClick,
  rawIcon,
}) => {
  const { classes, cx } = useStyles()
  const theme = useMantineTheme()

  const Component = to.startsWith('https') ? 'a' : Link
  const linkProps = to.startsWith('https')
    ? { href: to }
    : { to, activeclassname: classes.active }
  return (
    <Component
      className={cx(classes.mainLink, className)}
      onClick={onClick}
      {...linkProps}
    >
      {rawIcon ? (
        icon
      ) : (
        <ThemeIcon
          size={30}
          sx={{ backgroundColor: color, color: theme.white }}
          radius='lg'
        >
          {icon}
        </ThemeIcon>
      )}

      <div className={classes.body}>{children}</div>
    </Component>
  )
}

export default NavbarMainLink

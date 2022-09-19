import React from 'react'
import { Link } from 'react-router-dom'
import { Text } from '@mantine/core'
import useStyles from './LinksGroup.style'

const LinksGroup = ({ data, title }) => {
  const { classes } = useStyles()
  const links = data.map((link, index) => {
    const props =
      link.type === 'gatsby' ? { to: link.link } : { href: link.link }
    return (
      <Text
        className={classes.link}
        component={link.type === 'gatsby' ? Link : 'a'}
        {...props}
        key={index}
      >
        {link.label}
      </Text>
    )
  })
  return (
    <div className={classes.wrapper}>
      <Text className={classes.title}>{title}</Text>
      {links}
    </div>
  )
}

export default LinksGroup

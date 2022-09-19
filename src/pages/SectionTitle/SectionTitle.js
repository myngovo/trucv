import React from 'react'
import useStyles from './SectionTitle.styles'

const SectionTitle = ({ children, className, type = 'default', ...others }) => {
  const { classes, cx } = useStyles()
  return (
    <h4 className={cx(classes.title, classes[type], className)} {...others}>
      {children}
    </h4>
  )
}

export default SectionTitle

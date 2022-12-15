import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Space, Text } from '@mantine/core'
import useStyles from './QuickLinks.styles'

const Feature = ({
  icon: Icon,
  title,
  description,
  button,
  className,
  ...others
}) => {
  const { classes, cx } = useStyles()
  return (
    <div className={cx(classes.feature, className)} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={38} className={classes.icon} stroke={1.5} />
        <Text weight={700} size='lg' mb='xs' mt={5} className={classes.title}>
          {title}
        </Text>
        <Text color='dimmed' size='sm'>
          {description}
        </Text>
      </div>
      <Space h='xl' />
      <Button
        component={Link}
        to='/products/samples/library'
        compact
        color='orange'
      >
        {button}
      </Button>
    </div>
  )
}

export default Feature

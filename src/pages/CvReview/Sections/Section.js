import React from 'react'
import useStyles from './Section.styles'
import { Card, Container, Overlay, Space, Text, Title } from '@mantine/core'

const Section = ({ title, description, image }) => {
  const { classes, theme, cx } = useStyles()
  return (
    <Container className={classes.wrapper}>
      {' '}
      <Title className={classes.title}>{title}</Title>
      <Container p={0} pb='xl'>
        <Text size='sm' className={classes.description}>
          {description}
        </Text>
      </Container>
      <Space h='xl' />
      <Card
        radius='md'
        style={{ backgroundImage: `url(${image})` }}
        className={cx(classes.card)}
      >
        <Overlay
          gradient={`linear-gradient(105deg, ${theme.black} 20%, #312f2f 50%, ${theme.colors.gray[4]} 100%)`}
          opacity={0.55}
          zIndex={0}
        />
      </Card>
    </Container>
  )
}

export default Section

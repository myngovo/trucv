import React from 'react'
import useStyles from './FAQ.styles'
import { Container, Title, Accordion } from '@mantine/core'
import { data } from './data'

const FAQ = () => {
  const { classes } = useStyles()

  const faq = data.map((item) => (
    <Accordion variant='separated' key={item.title}>
      <Accordion.Item className={classes.item} value={item.title}>
        <Accordion.Control>{item.title}</Accordion.Control>
        <Accordion.Panel>{item.body}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ))
  return (
    <Container size='sm' className={classes.wrapper}>
      <Title align='center' className={classes.title}>
        Frequently Asked Questions
      </Title>
      {faq}
    </Container>
  )
}

export default FAQ

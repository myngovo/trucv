import React from 'react'
import { Link } from 'react-router-dom'
import { Dots } from './Dots'
import { Title, Text, Button, Container, Center } from '@mantine/core'
import useStyles from './GetReviewed.styles'

const GetReviewed = () => {
  const { classes } = useStyles()
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Let’s help you get
          <Text component='span' className={classes.highlight} inherit>
            {' '}
            ahead in
          </Text>{' '}
          your job search
        </Title>

        <Center pt={30}>
          <Button
            className={classes.control}
            size='lg'
            variant='default'
            color='gray'
            component={Link}
            to='/products/review/report'
          >
            Get a CV review
          </Button>
        </Center>

        <Container p={0} size={600} pt={30}>
          <Text size='xl' color='dimmed' className={classes.description}>
            You Can Also Use Our Comprehensive Career Tools
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            size='lg'
            variant='default'
            color='gray'
            component={Link}
            to='/products/builder'
          >
            Free CV Builder
          </Button>
          <Button
            className={classes.control}
            size='lg'
            component={Link}
            to='/products/samples'
          >
            Get sample CVs
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default GetReviewed

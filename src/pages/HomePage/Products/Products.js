import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Title, Text, Button, Image } from '@mantine/core'
import PageSection from '../../PageSection/PageSection'
import useStyles from './Product.styles'
import { FEATURES_DATA } from './features'
import { Dots } from '../../CvReview/GetReviewed/Dots'

const Products = () => {
  const { classes } = useStyles()

  const features = FEATURES_DATA.map((feature) => (
    <PageSection key={feature.sectionTitle} title={feature.sectionTitle}>
      <Container className={classes.wrapper} size={1400}>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

        <div className={classes.inner}>
          <Title className={classes.title}>{feature.title}</Title>

          <Container p={0} size={600}>
            <Text size='lg' color='dimmed' className={classes.description}>
              {feature.description}
            </Text>
          </Container>
          <div className={classes.controls}>
            <Button
              color='teal'
              radius='xs'
              size='xl'
              compact
              component={Link}
              to={feature.link}
            >
              {feature.button}
            </Button>
          </div>
          <div
            style={{
              width: 480,
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingTop: 30,
            }}
          >
            <Image radius='md' src={feature.image} alt={feature.sectionTitle} />
          </div>
        </div>
      </Container>
    </PageSection>
  ))

  return <>{features}</>
}

export default Products

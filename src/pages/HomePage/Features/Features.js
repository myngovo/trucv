import React from 'react'
import useStyles from './Features.styles'
import { FEATURES_DATA } from './data'
import { Card, SimpleGrid, Text } from '@mantine/core'
import PageSection from '../../PageSection/PageSection'

const Features = () => {
  const { classes, theme } = useStyles()
  const features = FEATURES_DATA.map((feature) => (
    <Card
      key={feature.title}
      shadow='md'
      radius='md'
      className={classes.card}
      p='xl'
    >
      <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
      <Text size='lg' weight={500} className={classes.cardTitle} mt='md'>
        {feature.title}
      </Text>
      <Text size='sm' color='dimmed' mt='sm'>
        {feature.description}
      </Text>
    </Card>
  ))

  return <PageSection title='With Tru CV:'>
     <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {features}
      </SimpleGrid>
  </PageSection>
}

export default Features

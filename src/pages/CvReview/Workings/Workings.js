import React from 'react'
import useStyles from './Working.styles'
import { DATA } from './data'
import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  Space,
  Card,
  Overlay,
  Button,
} from '@mantine/core'
import image from '../../../how-it-works.svg'
import Waves from '../Waves/Waves'

export function Feature({ icon: Icon, title, description }) {
  const theme = useMantineTheme()
  return (
    <div>
      <ThemeIcon variant='light' size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>
        {title}
      </Text>
      <Text size='sm' color='dimmed' style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  )
}

const Workings = ({
  title,
  description,
  data = DATA,
  style,
  className,
  ...others
}) => {
  const { classes, theme, cx } = useStyles()
  const features = data.map((feature, index) => (
    <Feature {...feature} key={index} />
  ))
  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>How it works</Title>

      <Container size={560} p={0}>
        <Text size='sm' className={classes.description}>
          {description}
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' },
        ]}
      >
        {features}
      </SimpleGrid>
      <Space h='xl' />
      <Space h='xl' />
      <Card
        radius='md'
        style={{ backgroundImage: `url(${image})`, ...style }}
        className={cx(classes.card, className)}
        {...others}
      >
        <Overlay
          gradient={`linear-gradient(105deg, ${theme.black} 20%, #312f2f 50%, ${theme.colors.gray[4]} 100%)`}
          opacity={0.55}
          zIndex={0}
        />

        <div className={classes.content}>
          <Text size='lg' weight={700} className={classes.title}>
            {title}
          </Text>

          <Text size='sm' className={classes.description}>
            {description}
          </Text>

          <Button
            className={classes.action}
            variant='white'
            color='dark'
            component='a'
            size='xs'
          >
            Get Started
          </Button>
        </div>
      </Card>
    </Container>
  )
}

export default Workings

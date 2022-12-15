import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Button,
  Text,
  useMantineTheme,
  Center,
  Card,
  Overlay,
  Space,
} from '@mantine/core'
import useStyles from './Jumbotron.styles'
import PageSection from '../../PageSection/PageSection'
import image from '../../../cv1.svg'
import { IconArrowRight } from '@tabler/icons'

const Jumbotron = ({
  title,
  description,

  style,
  className,
  ...others
}) => {
  const { classes, cx } = useStyles()
  const theme = useMantineTheme()
  return (
    <div className={classes.jumbotron}>
      <Container size={1100} className={classes.inner}>
        <PageSection title='Perfect fit but still got rejected ?'></PageSection>
        <Text className={classes.description}>
          Validate and get a detailed feedback on the strength of your CV. No
          Beating around the bush, this is for you if you want a job ... fast
        </Text>
        <Center className={classes.controls}>
          <Button
            mt={15}
            size='md'
            rightIcon={<IconArrowRight size={16} />}
            variant='gradient'
            component={Link}
            to='/products/review/report'
          >
            upload my CV
          </Button>
        </Center>
        <Space h='xl' />
        <Card
          radius='md'
          style={{
            backgroundImage: `url(${image})`,
            ...style,
          }}
          className={cx(classes.card, className)}
          {...others}
        >
          <Overlay
            gradient={`linear-gradient(105deg, ${theme.black} 20%, #312f2f 50%, ${theme.colors.gray[4]} 100%)`}
            opacity={0.2}
            zIndex={0}
          />

          <div className={classes.content}>
            <Text size='lg' weight={700} className={classes.title}>
              {title}
            </Text>

            <Text size='sm' className={classes.description}>
              {description}
            </Text>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default Jumbotron

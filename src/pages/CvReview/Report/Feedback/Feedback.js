import React from 'react'
import useStyles from './Feedback.styles'
import { Paper, Text, ThemeIcon } from '@mantine/core'
import { IconColorSwatch } from '@tabler/icons'

const Feedback = ({ title, description }) => {
  const { classes } = useStyles()
  return (
    <Paper withBorder radius='md' className={classes.card}>
      <ThemeIcon
        size='xl'
        radius='md'
        variant='gradient'
        gradient={{ deg: 0, from: 'pink', to: 'orange' }}
      >
        <IconColorSwatch size={28} stroke={1.5} />
      </ThemeIcon>
      <Text size='xl' weight={500} mt='md'>
        {title}
      </Text>
      <Text size='lg' mt='sm' color='dimmed'>
        {description}
      </Text>
    </Paper>
  )
}

export default Feedback

import React from 'react'
import useStyles from './Starts.styles'
import { Progress, Box, Text, Group, Paper, SimpleGrid } from '@mantine/core'
import { IconArrowUpRight, IconDeviceAnalytics } from '@tabler/icons'

const Stats = ({ total, diff, data }) => {
  const { classes } = useStyles()

  const segments = data.map((segment) => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part}%` : undefined,
  }))

  const descriptions = data.map((stat) => (
    <Box
      key={stat.label}
      sx={{ borderBottomColor: stat.color }}
      className={classes.stat}
    >
      <Text transform='uppercase' size='xs' color='dimmed' weight={700}>
        {stat.label}
      </Text>

      <Group position='apart' align='flex-end' spacing={0}>
        <Text weight={700}>{stat.count}</Text>
        <Text
          color={stat.color}
          weight={700}
          size='sm'
          className={classes.statCount}
        >
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ))
  return (
    <Paper withBorder p='md' radius='md'>
      <Group position='apart'>
        <Group align='flex-end' spacing='xs'>
          <Text size='xl' weight={700}>
            {total}
          </Text>
          <Text color='teal' className={classes.diff} size='sm' weight={700}>
            <span>{diff}%</span>
            <IconArrowUpRight
              size={16}
              style={{ marginBottom: 4 }}
              stroke={1.5}
            />
          </Text>
        </Group>
        <IconDeviceAnalytics size={20} className={classes.icon} stroke={1.5} />
      </Group>

      <Text color='dimmed' size='sm'>
      Welcome to your resume review.
      </Text>

      <Progress
        sections={segments}
        size={34}
        classNames={{ label: classes.progressLabel }}
        mt={40}
      />
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'xs', cols: 1 }]} mt='xl'>
        {descriptions}
      </SimpleGrid>
    </Paper>
  )
}

export default Stats

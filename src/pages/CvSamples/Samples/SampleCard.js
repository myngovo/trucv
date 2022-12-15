import React from 'react'
import { Card, Button, Group, Text, Badge } from '@mantine/core'

const SampleCard = ({ data }) => {
  const x = data.path.split('../../..')[1]

  const onButtonClick = () => {
    fetch(decodeURI(`${x}`)).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob)
        console.log(fileURL)
        let alink = document.createElement('a')
        alink.href = fileURL
        alink.download = `${data.jobTitle}`
        alink.click()
      })
    })
  }
  return (
    <Card shadow='sm' p='lg' radius='md' withBorder>
      <Badge color='pink' variant='light'>
        {data.jobTitle}
      </Badge>
      {/*  <Group position='apart' mt='md' mb='xs'>
        <Text weight={500}>Review Score:</Text>
        <Text weight={500}>82%</Text>
      </Group> */}
      <Group position='apart' mt='md' mb='xs'>
        <Text weight={500}>Education:</Text>
        <Text weight={500}>BSC/BA</Text>
        <Text></Text>
      </Group>
      <Group position='apart' mt='md' mb='xs'>
        <Text weight={500}>Experience:</Text>
        <Text weight={500}>{data.Experience}</Text>
      </Group>
      <Button
        variant='light'
        color='blue'
        fullWidth
        mt='md'
        radius='md'
        onClick={onButtonClick}
      >
        Download
      </Button>
    </Card>
  )
}

export default SampleCard

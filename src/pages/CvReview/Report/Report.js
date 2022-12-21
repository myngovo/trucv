import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import {
  Center,
  Container,
  LoadingOverlay,
  Notification,
  Paper,
  Space,
} from '@mantine/core'
import useStyles from './Report.styles'
import { Text, Group, Button, TextInput } from '@mantine/core'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons'
import PageSection from '../../PageSection/PageSection'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import Stats from './Stats/Stats'
import Feedback from './Feedback/Feedback'
import Message from '../../../components/Message'

const Report = () => {
  const openRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState()
  const [isFilePicked, setIsFilePicked] = useState(false)
  const [visible, setVisible] = useState(false)
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const { classes, theme } = useStyles({
    floating: value.trim().length !== 0 || focused,
  })
  const [data, setData] = useState('')
  const [total, setTotal] = useState('')
  const [score, setScore] = useState({})
  const [skills, setSkills] = useState([])
  const [notification, setNotification] = useState('')

  const changeHandler = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0])
    console.log(acceptedFiles[0])
    setIsFilePicked(true)
  }

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('file', selectedFile)
    setVisible(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload/', formData, config)

      setData(data)

      setVisible(false)

      setSkills(data['skills'])

      console.log(skills)
      console.log(data)
    } catch (error) {
      console.error(error)
      setVisible(false)
    }
  }

  // notification pop up for cv review users.

  const getNotification = function grade(score) {
    if (score >= 70 && score <= 100) {
      setNotification('You are in the Top 1% of all CVs reviewed !')
    } else if (score >= 60 && score <= 70) {
      setNotification('You are in the Top 10% of all CVs reviewed !')
    } else if (score >= 50 && score <= 60) {
      setNotification('You are in the Top 20% of all CVs reviewed !')
    } else if (score >= 40 && score <= 50) {
      setNotification('You are in the Top 30% of all CVs reviewed !')
    } else {
      setNotification('You are in the Top 50% of all CVs reviewed !')
    }
  }

  useEffect(() => {
    const design = Math.round(Math.random() * (30 - 12) + 12)

    const skills = Math.round(Math.random() * (20 - 10) + 10)

    const impact = Math.round(Math.random() * (25 - 15) + 15)

    const all = design + skills + impact

    setTotal(all)

    setScore({
      total: all,
      diff: 100 - all,
      data: [
        {
          label: 'Impact',
          count: impact,
          part: 30,
          color: '#845ef7',
        },
        {
          label: 'Design & Architecture',
          count: design,
          part: 40,
          color: '#228be6',
        },
        {
          label: 'Skills & Competencies',
          count: skills,
          part: 30,
          color: '#fd7e14',
        },
      ],
    })

    getNotification(all)
  }, [data])

  return (
    <div style={{ position: 'relative' }}>
      {' '}
      <LoadingOverlay visible={visible} overlayBlur={2} />
      <Container size='xs' px='xs' className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={changeHandler}
          className={classes.dropzone}
          radius='md'
          accept={[MIME_TYPES.pdf]}
          maxSize={30 * 1024 ** 2}
          name='file'
        >
          <div style={{ pointerEvents: 'none' }}>
            <Group position='center'>
              <Dropzone.Accept>
                <IconDownload
                  size={50}
                  color={theme.colors[theme.primaryColor][6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  size={50}
                  color={
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[0]
                      : theme.black
                  }
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text align='center' weight={700} size='lg' mt='xl'>
              <Dropzone.Accept>Drop files here</Dropzone.Accept>
              <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
              <Dropzone.Idle>Upload resume</Dropzone.Idle>
            </Text>
            <Text align='center' size='sm' mt='xs' color='dimmed'>
              Drag&apos;n&apos;drop files here to upload. We can accept only{' '}
              <i>.pdf</i> files that are less than 30mb in size.
            </Text>
          </div>
        </Dropzone>

        <Button
          className={classes.control}
          size='md'
          radius='xl'
          onClick={() => openRef.current?.()}
        >
          Select files
        </Button>
      </Container>
      <Container size='xs' px='xs'>
        <Space h='xl' />
        {isFilePicked ? (
          <Text align='center' color='dimmed'>
            {selectedFile.name}
          </Text>
        ) : (
          <Text align='center' color='dimmed'>
            no file selected
          </Text>
        )}

        <Space h='xl' />
        <TextInput
          label='Fill In Career Title'
          placeholder='Career'
          required
          classNames={classes}
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          mt='md'
          autoComplete='nope'
        />
        <Space h='xl' />
        <Center>
          <Button color='orange' onClick={handleUpload}>
            Get CV Score
          </Button>
        </Center>
      </Container>
      <PageSection title='Tru Cv Review Summary '>
        {data ? (
          <>
            <Space h='xl' />
            {notification && (
              <Notification
                color='#91b2c7'
                sx={(theme) => ({
                  backgroundColor: theme.colors.cyan[1],
                  '&:hover': {
                    backgroundColor: theme.colors.cyan[3],
                  },
                })}
              >
                {notification}
              </Notification>
            )}
            <Space h='xl' />
            <Feedback
              title={`Your Resume Scored ${score.total} out of 100`}
              description="This is a decent start, but there's clear room for improvement on your resume. It scored low on some key criteria hiring managers and resume screening software look for, but they can be easily improved. Let's dive into what we checked your resume for, and how you can improve your score by 30+ points."
            />
            <Space h='xl' />

            <Center>
              <Paper shadow='xs' p='md'>
                <AreaChart
                  width={500}
                  height={400}
                  data={score.data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='label' />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type='monotone'
                    dataKey='count'
                    stroke='#8884d8'
                    fill='#228be6'
                  />
                </AreaChart>
              </Paper>
            </Center>

            <Space h='xl' />
            {Object.keys(score).length > 0 && (
              <Stats data={score.data} total={score.total} diff={score.diff} />
            )}
          </>
        ) : (
          <Text> Awaiting Review</Text>
        )}
      </PageSection>
    </div>
  )
}

export default Report

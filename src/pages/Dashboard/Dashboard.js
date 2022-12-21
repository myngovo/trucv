import React, { useEffect, useState, useRef } from 'react'
import {
  Container,
  Text,
  Table,
  Space,
  TextInput,
  Box,
  Stack,
  NativeSelect,
  FileInput,
  Button,
  Group,
  FileButton,
} from '@mantine/core'
import PageSection from '../PageSection/PageSection'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listUsers, deleteUser } from '../../actions/userActions'
import { IconCheck, IconX } from '@tabler/icons'
import axios from 'axios'
import { useForm } from '@mantine/form'

const Dashboard = () => {
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState('')
  const fileInput = useRef(null)
  function handleClick() {
    fileInput.current.click()
  }

  const form = useForm({
    initialValues: {
      jobTitle: '',
      experience: '',
      path: '',
    },
  })

  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
    }
  }, [dispatch, successDelete, userInfo])
  const date = new Date().toLocaleString()

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      form.setFieldValue('path', data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  return (
    <>
      <PageSection title='Dashboard'>
        <Container>
          <Text color='dimmed'>{date}</Text>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message title='there is an error' color='red'>
              {error}
            </Message>
          ) : (
            <Table striped>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th>PHONE</th>
                  <th>SUBSCRIBED</th>
                  <th>PLAN</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>{user.isAdmin ? <IconCheck /> : <IconX />}</td>
                    <td>{user.phone}</td>
                    <td> {user.isSubscribed ? <IconCheck /> : <IconX />}</td>
                    <td>{user.plan}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </PageSection>
      <PageSection title='Upload Sample Cv'>
        <Container>
          <Space h='lg' />
          <Box sx={{ maxWidth: 300 }} mx='auto'>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Stack>
                <TextInput
                  withAsterisk
                  label='Job Title'
                  placeholder='enter job title ...'
                  {...form.getInputProps('jobTitle')}
                />

                <NativeSelect
                  data={['0-1', '1-4']}
                  label='Select years of Experience'
                  withAsterisk
                />

                <TextInput placeholder='Enter pdf url' label='PDF' />

                <Group position='center'>
                  <button onClick={handleClick}>Select File</button>
                  <input
                    ref={fileInput}
                    type='file'
                    style={{ display: 'none' }}
                    onChange={uploadFileHandler}
                  />
                </Group>
                {file && (
                  <Text size='sm' align='center' mt='sm'>
                    Picked file: {file.name}
                  </Text>
                )}

                <Button type='submit'>Upload</Button>
              </Stack>
            </form>
          </Box>
        </Container>
      </PageSection>
    </>
  )
}

export default Dashboard

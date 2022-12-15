import React, { useEffect } from 'react'
import { Container, Text, Table } from '@mantine/core'
import PageSection from '../PageSection/PageSection'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listUsers, deleteUser } from '../../actions/userActions'
import { IconCheck, IconX } from '@tabler/icons'

const Dashboard = () => {
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
  return (
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
  )
}

export default Dashboard

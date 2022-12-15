import React, { useEffect } from 'react'
import PageSection from '../PageSection/PageSection'
import { Container, Text, Table } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listTransactions } from '../../actions/transactionActions'

const TransactionList = () => {
  const date = new Date().toLocaleString()

  const dispatch = useDispatch()

  const transactionList = useSelector((state) => state.transactionList)
  const { loading, error, transactions } = transactionList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listTransactions())
    } else {
    }
  }, [dispatch, userInfo])

  return (
    <PageSection title='Transaction'>
      <Container>
        <Text color='dimmed'>as at {date}</Text>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Table striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>EMAIL</th>
                <th>TRANSACTION DATE</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction._id}</td>
                  <td>{transaction.email}</td>
                  <td>{new Date(transaction.paidAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </PageSection>
  )
}

export default TransactionList

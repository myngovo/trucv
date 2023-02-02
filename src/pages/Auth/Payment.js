import {
  Button,
  Card,
  NumberInput,
  ScrollArea,
  SimpleGrid,
  Space,
  Table,
  Text,
  TextInput,
} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import PageSection from '../PageSection/PageSection'
import { useForm } from '@mantine/form'
import { IconRefresh } from '@tabler/icons'
import { useSelector, useDispatch } from 'react-redux'
import { lipaNaMpesa } from '../../actions/payActions'
import axios from 'axios'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listMyTransactions } from '../../actions/transactionActions'

const Payment = () => {
  const [token, setToken] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const form = useForm({
    initialValues: {
      phone: '',
      amount: '',
      subscription: '',
    },

    validate: {
      phone: (value) => (/^\d{9}$/.test(value) ? null : 'Invalid Phone Number'),
    },
  })

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderPayMpesa = useSelector((state) => state.orderPayMpesa)
  const { loading, transaction } = orderPayMpesa

  const transactionListMy = useSelector((state) => state.transactionListMy)
  const {
    loading: loadingTransactions,
    error: errorTransactions,
    transactions,
  } = transactionListMy

  useEffect(() => {
    const storedValue = JSON.parse(window.localStorage.getItem('timePeriod'))

    if (storedValue) {
      try {
        form.setValues({
          amount: storedValue.amount,
          subscription: storedValue.package,
          phone: userInfo.phone,
        })
      } catch (e) {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getToken = async () => {
      try {
        setIsLoaded(true)
        const result = await axios('/api/mpesa/access_token')
        setToken(result.data)
        setIsLoaded(false)
      } catch (err) {
        setMessage(err)
      }
    }

    if (!token) {
      getToken()
    }

    if (userInfo) {
      dispatch(listMyTransactions())
    }
  }, [dispatch, token, userInfo])

  const handlePayment = async (values) => {
    const phone = '254' + values.phone
    dispatch(lipaNaMpesa(phone, values.amount, values.subscription, token))
    console.log(values)
  }
  return (
    <>
      <PageSection
        title=' Secure Payment Page'
        description='Your personal and financial information is protected by industry-standard security measures to ensure a safe and worry-free transaction. Thank you for choosing our service.'
      >
        {transaction && <Message>{transaction.transaction}</Message>}
        <SimpleGrid cols={1} pt='xl'>
          <div>
            <Card withBorder radius='md'>
              <Card.Section withBorder inheritPadding py='xs'>
                <Text
                  weight={500}
                  size='xl'
                  sx={{
                    fontFamily: 'Greycliff CF, sans-serif',
                    lineHeight: '1.6',
                  }}
                  color='dimmed'
                >
                  Confirm Below Details
                </Text>
              </Card.Section>
              <form onSubmit={form.onSubmit(handlePayment)} mt='xl'>
                <SimpleGrid
                  mt='xl'
                  cols={2}
                  spacing='lg'
                  breakpoints={[
                    { maxWidth: 980, cols: 2, spacing: 'md' },
                    { maxWidth: 755, cols: 2, spacing: 'sm' },
                    { maxWidth: 600, cols: 1, spacing: 'sm' },
                  ]}
                >
                  <div>
                    <NumberInput
                      placeholder='Phone Number'
                      label='Phone Number'
                      size='lg'
                      withAsterisk
                      hideControls
                      icon={<Text size={18}>+254 </Text>}
                      {...form.getInputProps('phone')}
                    />
                  </div>
                  <div>
                    <NumberInput
                      disabled
                      placeholder='Amount'
                      label='Amount'
                      size='lg'
                      withAsterisk
                      hideControls
                      {...form.getInputProps('amount')}
                    />
                  </div>
                  <div>
                    <TextInput
                      placeholder='Select Package'
                      label='Package'
                      size='lg'
                      disabled
                      withAsterisk
                      {...form.getInputProps('subscription')}
                    />
                  </div>
                  <div>
                    <Space h='xl' />
                    <Button
                      variant='outline'
                      color='teal'
                      size='lg'
                      type='submit'
                      disabled={isLoaded}
                      loading={loading}
                    >
                      Process Payment
                    </Button>
                  </div>
                </SimpleGrid>
              </form>
            </Card>
          </div>
          <div></div>
        </SimpleGrid>
      </PageSection>
      <PageSection
        title='Transaction History'
        description=' View a detailed list of all your past and current transactions, including date, time, amount, and transaction status. You can also filter and search through your transactions for easy reference. For the most up-to-date information click refresh. Keep track of your finances with ease and confidence.'
      >
        {loadingTransactions && <Loader />}
        {errorTransactions && (
          <Message color='red'>{errorTransactions}</Message>
        )}
        <SimpleGrid cols={1} pt='xl'>
          <div>
            <Card withBorder radius='md'>
              <Card.Section withBorder inheritPadding py='xs'>
                <Button
                  variant='outline'
                  color='teal'
                  size='lg'
                  leftIcon={<IconRefresh />}
                  onClick={() => dispatch(listMyTransactions())}
                >
                  Refresh
                </Button>
              </Card.Section>
              <Space h='xl' />
              <ScrollArea>
                <Table
                  striped
                  highlightOnHover
                  fontSize='lg'
                  captionSide='bottom'
                  sx={{ minWidth: 800 }}
                  verticalSpacing='sm'
                >
                  <caption>{new Date().toDateString()}</caption>
                  <thead>
                    <tr>
                      <th>Merchant Request ID</th>
                      <th>Reciept Number</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Phone Number</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  {transactions && (
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                          <td>{transaction.mechant_request_id}</td>
                          <td>
                            {transaction.CallbackMetadata
                              ? transaction.CallbackMetadata.Item.find(
                                  (i) => i.Name === 'MpesaReceiptNumber'
                                ).Value
                              : null}
                          </td>
                          <td>
                            {transaction.CallbackMetadata
                              ? transaction.CallbackMetadata.Item.find(
                                  (i) => i.Name === 'Amount'
                                ).Value
                              : null}
                          </td>
                          <td>{new Date(transaction.date).toDateString()}</td>
                          <td>
                            {transaction.CallbackMetadata
                              ? transaction.CallbackMetadata.Item.find(
                                  (i) => i.Name === 'PhoneNumber'
                                ).Value
                              : null}
                          </td>
                          <td>{transaction.result_desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </Table>
              </ScrollArea>
            </Card>
          </div>
        </SimpleGrid>
      </PageSection>
    </>
  )
}

export default Payment

import {
  Box,
  Button,
  Card,
  Center,
  Container,
  List,
  SegmentedControl,
  Space,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Modal,
  Radio,
  Group,
  Popover,
  SimpleGrid,
  Select,
} from '@mantine/core'
import { IconCircleCheck, IconInfoCircle, IconReceipt2 } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import PageSection from './PageSection/PageSection'
import { useToggle, useDisclosure } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import { useAuth } from '../components/Auth'
import Loader from '../components/Loader'
import Message from '../components/Message'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useForm } from '@mantine/form'
import axios from 'axios'

const Subscription = () => {
  const dispatch = useDispatch()
  const auth = useAuth()
  const [message, setMessage] = useState('')
  const [opened, setOpened] = useState(false)
  const [token, setToken] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [opener, { close, open }] = useDisclosure(false)

  const form = useForm({
    initialValues: {
      phone: '',
      amount: '100',
    },
  })

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const navigate = useNavigate()

  const redirect = localStorage.getItem('redirect') || '/'

  const [type, toggle] = useToggle(['monthly', 'annually'])

  const submitHandler = () => {
    if (userInfo && !userInfo.isSubscribed) {
      setOpened(true)
    } else {
      localStorage.setItem('package', JSON.stringify(type))
      navigate('/signin')
    }
  }

  async function processPayment(phone, amount, email) {
    try {
      setIsLoaded(true)

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      }

      const { data } = await axios.get(
        '/api/mpesa/stk',
        {
          params: { phone, email, amount },
        },
        config
      )

      console.log('mpesa', data)

      setIsLoaded(false)
      setOpened(false)

      return data
    } catch (error) {}
  }

  const handleSubmit = async (values) => {
    const payment = await processPayment(
      values.phone,
      values.amount,
      userInfo.email
    )

    console.log(values)
    console.log(userInfo.email)
    console.log('payment', payment)
  }

  useEffect(() => {
    if (!userInfo) {
      setMessage('Subscribe To Get Access To TruCv Features')
    } else if (userInfo && !userInfo.isSubscribed) {
      setMessage('You Are Logged In But Not Subscribed ')
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        auth.login(user)
        navigate(redirect, { replace: true })
      }
    }
  }, [auth, dispatch, navigate, redirect, user, userInfo])

  useEffect(() => {
    const getToken = async () => {
      const result = await axios('/api/mpesa/access_token')
      setToken(result.data)
    }

    getToken()
  }, [])

  return (
    <>
      <Helmet>
        <title>Sign up for Tru CV</title>
        <meta
          name='description'
          content='You can now sign up for our career navigation platform of tools today and optimize human potential.'
        />
      </Helmet>
      <PageSection title='Stand Out In Your Job Search '>
        <Container size='xs'>
          {isLoaded && <Loader />}
          {message && <Message>{message}</Message>}
          {error && <Message>{error}</Message>}
          {loading ? (
            <Loader />
          ) : (
            <>
              <Center mt='xl'>
                <SegmentedControl
                  onChange={() => toggle()}
                  data={[
                    {
                      value: 'monthly',
                      label: (
                        <Center>
                          <Box ml={10}>Pay Monthly</Box>
                        </Center>
                      ),
                    },
                    {
                      value: 'annually',
                      label: (
                        <Center>
                          <Box ml={10}>Pay Annually</Box>
                        </Center>
                      ),
                    },
                  ]}
                />
              </Center>
              <Space h='lg' />
              <Card shadow='sm' p='lg' radius='md' withBorder>
                <Center>
                  <Stack align='center' spacing='lg'>
                    <ThemeIcon radius='xl' size='xl'>
                      <IconReceipt2 />
                    </ThemeIcon>
                    {type === 'annually' ? (
                      <Title>KSH 1000 / year</Title>
                    ) : (
                      <Title>KSH 100 / month</Title>
                    )}

                    <Text weight={500}>Ksh 1000 billed yearly</Text>
                    <Button
                      variant='light'
                      color='blue'
                      fullWidth
                      mt='md'
                      radius='md'
                      onClick={submitHandler}
                    >
                      Subscribe Now
                    </Button>
                    <Text size='sm' color='dimmed'>
                      Cancel anytime
                    </Text>
                  </Stack>
                </Center>
              </Card>
              <Space h='lg' />
              <Center>
                {type === 'annually' ? (
                  <List
                    spacing='xs'
                    size='sm'
                    center
                    icon={
                      <ThemeIcon color='teal' size={24} radius='xl'>
                        <IconCircleCheck size={16} />
                      </ThemeIcon>
                    }
                  >
                    <List.Item>4 CV reviews / month</List.Item>
                    <List.Item>8 CV builder credits / month</List.Item>
                    <List.Item>4 CV samples / month</List.Item>
                    <List.Item>33 % discount</List.Item>
                  </List>
                ) : (
                  <List
                    spacing='xs'
                    size='sm'
                    center
                    icon={
                      <ThemeIcon color='teal' size={24} radius='xl'>
                        <IconCircleCheck size={16} />
                      </ThemeIcon>
                    }
                  >
                    <List.Item>2 CV reviews / month</List.Item>
                    <List.Item>5 CV builder credits / month</List.Item>
                    <List.Item>2 CV samples / month</List.Item>
                  </List>
                )}
              </Center>
              <Center>
                <SimpleGrid cols={3} p='xl'>
                  <Button color='orange'>Cv Builder</Button>
                  <Button color='teal'>Cv Review</Button>
                  <Button>Cv Sample</Button>
                </SimpleGrid>
                <SimpleGrid cols={1} p='xl'>
                  <Select
                    label='Your favorite framework/library'
                    placeholder='Pick one'
                    data={[
                      { value: 'react', label: 'React' },
                      { value: 'ng', label: 'Angular' },
                      { value: 'svelte', label: 'Svelte' },
                      { value: 'vue', label: 'Vue' },
                    ]}
                  />
                </SimpleGrid>
              </Center>
              <Center>
                <Group pt='xl'>
                  <Text>Paid but no access ?</Text>
                  <Popover
                    width={200}
                    position='bottom'
                    withArrow
                    shadow='md'
                    opened={opener}
                  >
                    <Popover.Target>
                      <ThemeIcon
                        color='orange'
                        onMouseEnter={open}
                        onMouseLeave={close}
                      >
                        <IconInfoCircle />
                      </ThemeIcon>
                    </Popover.Target>
                    <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
                      <Text size='sm'>
                        Do not Panic . Logout and Login again with the
                        credentials you subscribed with. Still not working ?
                        Call us on +254705043366 and we will help you
                      </Text>
                    </Popover.Dropdown>
                  </Popover>
                </Group>
              </Center>
            </>
          )}
        </Container>
      </PageSection>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Introduce yourself!'
        centered
        size='auto'
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <PhoneInput
              country={'ke'}
              onlyCountries={['ke']}
              value={form.values.phone}
              onChange={(val) => form.setFieldValue('phone', val)}
              error={form.errors.phone && 'enter a valid phone number '}
            />
            <Radio.Group
              name='selectPackage'
              label='confirm your subscription'
              description='select package'
              spacing='lg'
              offset='sm'
              withAsterisk
              value={form.values.amount}
              onChange={(val) => form.setFieldValue('amount', val)}
            >
              <Radio value='100' label='Monthly' />
              <Radio value='1000' label='Annually' />
            </Radio.Group>
          </Stack>
          <Button fullWidth mt='xl' type='submit'>
            Subscribe
          </Button>
        </form>
      </Modal>
    </>
  )
}

export default Subscription

import React, { useState, useEffect } from 'react'
import { useAuth } from '../components/Auth'
import { useNavigate } from 'react-router-dom'
import { useToggle, upperFirst } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  createStyles,
  Title,
  Image,
  Container,
  Notification,
  Radio,
} from '@mantine/core'
import { Dots } from '../components/Dots'
import axios from 'axios'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'

import { register, login } from '../actions/userActions'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const useStyles = createStyles((theme) => ({
  dots: {
    position: 'absolute',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },
}))

const Signin = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [token, setToken] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()
  const { classes } = useStyles()
  const [type, toggle] = useToggle(['register', 'login'])
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      password: '',
      terms: true,
      amount: '100',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  })

  const userRegister = useSelector((state) => state.userRegister)
  const { loading: loadingUserRegister, error: errorUserRegister } =
    userRegister

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const dispatch = useDispatch()

  const from = localStorage.getItem('redirect') || '/'

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

      return data
    } catch (error) {}
  }

  const handleSubmit = async (values) => {
    if (type === 'register') {
      const payment = await processPayment(
        values.phone,
        values.amount,
        values.email
      )

      console.log('payment', payment)

      dispatch(
        register(values.name, values.phone, values.email, values.password)
      )
    }

    if (type === 'login') {
      console.log(values)
      dispatch(login(values.email, values.password))
    }
  }

  useEffect(() => {
    if (userInfo) {
      auth.login(userInfo)
      console.log('auth values', userInfo)
      navigate(from, { replace: true })
    }
  }, [auth, from, navigate, userInfo])

  useEffect(() => {
    const getToken = async () => {
      const result = await axios('/api/mpesa/access_token')
      setToken(result.data)
    }

    getToken()
  }, [])

  return (
    <>
      <Container size={420} my={40}>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />
        <Title
          align='center'
          sx={(theme) => ({
            color: theme.colors.gray[7],
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 600,
          })}
        >
          {type === 'register' ? 'Welcome' : '  Welcome back!'}
        </Title>
        <Image
          height={90}
          radius='md'
          src='../logo.png'
          alt='myNGOVO Logo'
          caption='Build your brand-new resume in as little as 5 minutes.'
          withPlaceholder
          styles={{
            caption: { color: 'teal' },
          }}
        />
        <Divider py={20} label={type} labelPosition='center' my='lg' />
        {error && (
          <Message color='red' title='Error Encountered'>
            {error}
          </Message>
        )}
        {errorUserRegister && (
          <Message color='red' title='Error Encountered'>
            {error}
          </Message>
        )}
        {isLoaded && <Loader />}
        {loading && <Loader />}
        {loadingUserRegister && <Loader />}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label=' Name'
                placeholder='enter name'
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
                error={form.errors.name && 'Invalid name'}
              />
            )}
            {type === 'register' && (
              /*  <NumberInput
                placeholder='Your M-pesa phone number'
                label='Phone Number'
                required
                hideControls
                icon={<Text c='blue'>+254 </Text>}
                value={form.values.phone}
                onChange={(val) => form.setFieldValue('phone', val)}
                error={form.errors.phone && 'enter a valid phone number '}
              /> */
              <PhoneInput
                country={'ke'}
                onlyCountries={['ke']}
                value={form.values.phone}
                onChange={(val) => form.setFieldValue('phone', val)}
                error={form.errors.phone && 'enter a valid phone number '}
              />
            )}

            <TextInput
              required
              label='Email'
              placeholder='example@email.com'
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label='Password'
              placeholder='Your password'
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
            />

            {type === 'register' && (
              <Checkbox
                label='I accept terms and conditions'
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}

            {type === 'register' && (
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
            )}
          </Stack>
          <Button fullWidth mt='xl' type='submit'>
            {upperFirst(type)}
          </Button>
        </form>
        <Anchor
          component='button'
          type='button'
          color='dimmed'
          onClick={() => toggle()}
          size='xs'
        >
          {type === 'register'
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </Anchor>
      </Container>
      {type === 'register' && (
        <Notification color='orange' title='Enter a valid phone number '>
          To enable STK push enter a valid safaricom phone number otherwise the
          login woun't follow through successfully.
        </Notification>
      )}
    </>
  )
}

export default Signin

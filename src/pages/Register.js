import React, { useState, useEffect } from 'react'
import { useAuth } from '../components/Auth'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  TextInput,
  PasswordInput,
  NumberInput,
  Title,
  Text,
  Container,
  Button,
  Image,
  Divider,
  createStyles,
} from '@mantine/core'
import { useToggle, upperFirst } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { Dots } from '../components/Dots'
import axios from 'axios'
import Loader from '../components/Loader'
import Message from '../components/Message'

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

const Login = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { classes } = useStyles()
  const [type, toggle] = useToggle('login', ['login', 'register'])
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      fname: '',
      lname: '',
      phone: 0,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  })
  const from = location.state?.from?.pathname || '/home'

  async function loginUser(email, password) {
    try {
      setIsLoaded(true)

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        'https://virdismart.herokuapp.com/api/users/login',
        { email, password },
        config
      )
      setIsLoaded(false)
      window.localStorage.setItem('user', JSON.stringify(data))
      return data
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      setIsLoaded(false)

      setError(message)
    }
  }

  const handleSubmit = async (values) => {
    if (type === 'register') {
      console.log('register', values)
    }
    if (type === 'login') {
      const user = await loginUser(values.email, values.password)

      auth.login(user)
      navigate(from, { replace: true })
    }
  }
  useEffect(() => {
    if (auth.user) {
      navigate(from, { replace: true })
    }
  }, [auth.user, from, navigate])

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
          alt='Circularity Logo'
          caption='Circularity  | Turning Trash to Cash'
          withPlaceholder
          styles={{
            caption: { color: 'teal' },
          }}
        />
        <Divider label={type} labelPosition='center' my='lg' />
        {error && (
          <Message color='red' title='Error Encountered'>
            {error}
          </Message>
        )}
        {isLoaded && <Loader />}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          {type === 'register' && (
            <TextInput
              label='First Name'
              required
              placeholder='Your first name'
              value={form.values.fname}
              onChange={(event) =>
                form.setFieldValue('fname', event.currentTarget.value)
              }
            />
          )}
          {type === 'register' && (
            <TextInput
              label='Last Name'
              required
              placeholder='Your last name'
              value={form.values.lname}
              onChange={(event) =>
                form.setFieldValue('lname', event.currentTarget.value)
              }
            />
          )}

          {type === 'register' && (
            <NumberInput
              placeholder='Your phone number'
              label='Phone Number'
              required
              hideControls
              value={form.values.phone}
              onChange={(val) => form.setFieldValue('phone', val)}
            />
          )}

          <TextInput
            label='Email'
            required
            placeholder='your@email.com'
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
          />
          <PasswordInput
            label='Password'
            placeholder='Your password'
            required
            mt='md'
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
          />

          <Button fullWidth mt='xl' type='submit' color='teal'>
            {upperFirst(type)}
          </Button>
        </form>
        <Divider my='lg' />
        <Text
          color='dimmed'
          size='sm'
          align='center'
          mt={5}
          onClick={() => toggle()}
        >
          {type === 'register'
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </Text>
      </Container>
    </>
  )
}

export default Login

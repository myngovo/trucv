import React, { useState, useEffect } from 'react'
import { useAuth } from '../components/Auth'
import { useNavigate, useLocation } from 'react-router-dom'
import { useToggle, upperFirst } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  NumberInput,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  createStyles,
  Title,
  Image,
  Container,
} from '@mantine/core'
import { Dots } from '../components/Dots'
import axios from 'axios'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Footer from '../components/Footer'

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
  const [type, toggle] = useToggle(['login', 'register'])
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  })
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
          src='logo.png'
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
        {isLoaded && <Loader />}
        <form>
          <Stack>
            {type === 'register' && (
              <TextInput
                label='First Name'
                placeholder='Your first name'
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue('first_name', event.currentTarget.value)
                }
              />
            )}
            {type === 'register' && (
              <TextInput
                label='Last Name'
                placeholder='Your last name'
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue('last_name', event.currentTarget.value)
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
      <Footer />
    </>
  )
}

export default Login

import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  Grid,
  Group,
  PasswordInput,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import { login } from '../../actions/userActions'

const LogIn = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const submitHandler = (values) => {
    dispatch(login(values.email, values.password))
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/auth/payment')
    }
  }, [navigate, userInfo])
  return (
    <Box sx={{ minHeight: '100vh', padding: '40px' }}>
      <Grid justify='flex-end'>
        <Grid.Col span={12} sx={{ ml: 3, mt: 3 }}>
          <Text color='dimmed' size={22}>
            Login to your account
          </Text>
        </Grid.Col>
        <Grid.Col span={12}>
          <Grid.Col
            span={12}
            sx={{
              minHeight: {
                xs: 'calc(100vh - 210px)',
                sm: 'calc(100vh - 134px)',
                md: 'calc(100vh - 112px)',
              },
            }}
          >
            <Container>
              <Card
                p='xl'
                radius='md'
                withBorder
                sx={{
                  maxWidth: { xs: 400, lg: 475 },
                  margin: { xs: 2.5, md: 3 },
                  '& > *': {
                    flexGrow: 1,
                    flexBasis: '50%',
                  },
                }}
              >
                <Card.Section inheritPadding p='xl'>
                  <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
                    <Grid grow gutter='xl'>
                      <Grid.Col span={12}>
                        <Group
                          position='apart'
                          sx={{ mb: { xs: -0.5, sm: 0.5 } }}
                        >
                          <Title order={2} pl='lg'>
                            Login
                          </Title>
                          <Text
                            size={22}
                            component={Link}
                            to={'/auth/signin'}
                            variant='body1'
                            sx={{ textDecoration: 'none' }}
                            color='teal'
                          >
                            Don&apos;t have an account?
                          </Text>
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <form onSubmit={form.onSubmit(submitHandler)}>
                          <SimpleGrid cols={1}>
                            <div>
                              <TextInput
                                p='md'
                                placeholder='Enter email address'
                                label='Email Address'
                                size='lg'
                                withAsterisk
                                value={form.values.email}
                                onChange={(event) =>
                                  form.setFieldValue(
                                    'email',
                                    event.currentTarget.value
                                  )
                                }
                                error={form.errors.email && 'Invalid email'}
                              />
                            </div>
                            <div>
                              <PasswordInput
                                p='md'
                                placeholder='Enter Password'
                                label='Password'
                                size='lg'
                                withAsterisk
                                value={form.values.password}
                                onChange={(event) =>
                                  form.setFieldValue(
                                    'password',
                                    event.currentTarget.value
                                  )
                                }
                                error={
                                  form.errors.password &&
                                  'Password should include at least 6 characters'
                                }
                              />
                            </div>
                            <div>
                              <Group position='apart'>
                                <Checkbox
                                  p='md'
                                  label='Keep me signed in'
                                  color='orange'
                                  size='lg'
                                />
                                <Text
                                  color='dimmed'
                                  size={22}
                                  component={Link}
                                  to='/auth/forgot-password'
                                >
                                  Forgot Password?
                                </Text>
                              </Group>
                            </div>
                            <div>
                              {error && <Message color='red'>{error}</Message>}
                            </div>
                            <div>
                              <Box p='md'>
                                <Button
                                  color='teal'
                                  size='lg'
                                  fullWidth
                                  type='submit'
                                  loading={loading}
                                >
                                  Login
                                </Button>
                              </Box>
                            </div>
                            <div>
                              {' '}
                              <Divider
                                my='xs'
                                label='Welcom Back'
                                labelPosition='center'
                              />
                            </div>
                          </SimpleGrid>
                        </form>
                      </Grid.Col>
                    </Grid>
                  </Box>
                </Card.Section>
              </Card>
            </Container>
          </Grid.Col>
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default LogIn

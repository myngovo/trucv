import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth } from '../../components/Auth'
import { forgotUserPassword } from '../../actions/userActions'

const ForgotPassword = () => {
  const { user } = useAuth()
  const dispatch = useDispatch()

  const userForgotPassword = useSelector((state) => state.userForgotPassword)
  const { loading, error, success } = userForgotPassword

  const ForgotPasswordHandler = (values) => {
    dispatch()
  }
  return (
    <Box sx={{ minHeight: '100vh', padding: '40px' }}>
      <Grid justify='flex-end'>
        <Grid.Col span={12} sx={{ ml: 3, mt: 3 }}>
          <Text color='dimmed' size={22}>
            Forgotten Password ? Dont Worry
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
                            Forgot Password
                          </Title>
                          <Text
                            size={22}
                            component={Link}
                            to={user ? '/auth/login' : '/auth/login'}
                            variant='body1'
                            sx={{ textDecoration: 'none' }}
                            color='teal'
                          >
                            Back to Login
                          </Text>
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <form>
                          <SimpleGrid cols={1}>
                            <div>
                              <TextInput
                                p='md'
                                placeholder='Enter email address'
                                label='Email Address'
                                size='lg'
                                withAsterisk
                              />
                            </div>
                            <div>
                              <Text p='md'>
                                Do not forgot to check SPAM box.
                              </Text>
                            </div>
                            <div>
                              <Box p='md'>
                                <Button
                                  color='teal'
                                  size='lg'
                                  fullWidth
                                  type='submit'
                                >
                                  {' '}
                                  Send Password Reset Email
                                </Button>
                              </Box>
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

export default ForgotPassword

import {
  createStyles,
  Card,
  Grid,
  Group,
  Switch,
  Text,
  SimpleGrid,
  ThemeIcon,
  Button,
  List,
  Divider,
  Select,
  Space,
  Popover,
} from '@mantine/core'
import {
  IconBusinessplan,
  IconCash,
  IconCheck,
  IconInfoCircle,
} from '@tabler/icons'
import React, { useState } from 'react'
import PageSection from '../PageSection/PageSection'
import { useDisclosure } from '@mantine/hooks'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const BREAKPOINT = '@media (max-width: 755px)'

const useStyles = createStyles((theme) => ({
  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },
  description: {
    marginTop: theme.spacing.xl,
    fontSize: 21,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },
  card: {
    height: 240,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  content: {
    position: 'absolute',
    padding: theme.spacing.xl,
    zIndex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  action: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
  },
}))

const creditsData = {
  50: {
    'cv builder': 3,
    'cv review': 1,
    'cv sample downloads': 2,
  },
  100: {
    'cv builder': 5,
    'cv review': 3,
    'cv sample downloads': 4,
  },
  200: {
    'cv builder': 10,
    'cv review': 7,
    'cv sample downloads': 8,
  },
}

const GetStarted = () => {
  const [opened, { close, open }] = useDisclosure(false)
  const { classes } = useStyles()
  const [timePeriod, setTimePeriod] = useState(true)
  const [selectedOption, setSelectedOption] = useState(50)
  const [selectedService, setSelectedService] = useState('cv builder')
  const services = ['cv builder', 'cv review', 'cv sample downloads']

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const navigate = useNavigate()

  //hanlde changes in pay as you go card

  const handleServiceChange = (value) => {
    setSelectedService(value)
  }

  //handle changes in subscription card

  const handleSubscription = () => {
    if (userInfo) {
      timePeriod
        ? localStorage.setItem(
            'timePeriod',
            JSON.stringify({ package: 'subscription', amount: 100 })
          )
        : localStorage.setItem(
            'timePeriod',
            JSON.stringify({ package: 'subscription', amount: 1000 })
          )
      navigate('/auth/payment')
    } else {
      navigate('/auth/login')
    }
  }
  const handlePayAsYouGo = () => {
    if (userInfo) {
      localStorage.setItem(
        'timePeriod',
        JSON.stringify({ package: selectedService, amount: selectedOption })
      )
      navigate('/auth/payment')
    } else {
      navigate('/auth/login')
    }
  }

  return (
    <PageSection title='Stand Out In Your Job Search '>
      <Grid gutter={5} pt='xl'>
        <Grid.Col span={12}>
          <Card withBorder shadow='sm' radius='md'>
            <Card.Section withBorder inheritPadding p='xs'>
              <Group spacing='xl' m='md'>
                <Text
                  size='xl'
                  className={classes.label}
                  color={timePeriod ? 'dimmed' : ''}
                >
                  Billed Yearly
                </Text>
                <Switch
                  color='orange'
                  size='lg'
                  checked={timePeriod}
                  onChange={() => setTimePeriod(!timePeriod)}
                />
                <Text
                  size='xl'
                  className={classes.label}
                  color={timePeriod ? '' : 'dimmed'}
                >
                  Billed Monthly
                </Text>
              </Group>
              <Text m='sm' className={classes.description} color='dimmed'>
                Discover the perfect pricing plan for your needs. Our flexible
                options allow you to select the features and support that best
                fit your budget. Compare our plans and select the one that works
                for you. Upgrade or downgrade at any time. No long-term
                contracts or hidden fees. Start today!
              </Text>
            </Card.Section>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Grid grow gutter='xl' pt='xl'>
            <Grid.Col xs={12} sm={6} md={6}>
              <Card withBorder radius='md'>
                <Card.Section withBorder inheritPadding p='lg'>
                  <SimpleGrid cols={1}>
                    <div>
                      <Group spacing='xl'>
                        <ThemeIcon variant='outline' size='xl' color='teal'>
                          <IconBusinessplan />
                        </ThemeIcon>
                        <Text className={classes.title} size='xl'>
                          Subscription Plans
                        </Text>
                      </Group>
                    </div>
                    <div>
                      <Text
                        m='sm'
                        className={classes.description}
                        color='dimmed'
                      >
                        Value For Money In Your Job Search
                      </Text>
                    </div>
                    <div>
                      <Group spacing='xl' m='sm'>
                        {timePeriod && (
                          <Text size={30} className={classes.title}>
                            Ksh 100
                          </Text>
                        )}
                        {!timePeriod && (
                          <Text size={30} className={classes.title}>
                            Ksh 1000
                          </Text>
                        )}
                        <Text variant='h6' color='dimmed'>
                          Only
                        </Text>
                      </Group>
                    </div>
                    <div>
                      <Button
                        variant='outline'
                        color='teal'
                        fullWidth
                        size='lg'
                        onClick={handleSubscription}
                      >
                        Subscribe Now
                      </Button>
                    </div>
                    <div>
                      <List
                        pt='xl'
                        spacing='lg'
                        center
                        size={21}
                        icon={
                          <ThemeIcon color='teal' size={24} radius='xl'>
                            <IconCheck size={16} />
                          </ThemeIcon>
                        }
                      >
                        {timePeriod && (
                          <>
                            <List.Item>2 CV reviews / month</List.Item>
                            <Divider my='sm' />
                            <List.Item>5 CV builder credits / month</List.Item>
                            <Divider my='sm' />
                            <List.Item>2 CV samples / month</List.Item>{' '}
                            <Divider my='sm' />
                          </>
                        )}
                        {!timePeriod && (
                          <>
                            <List.Item>4 CV reviews / month</List.Item>
                            <Divider my='sm' />
                            <List.Item>8 CV builder credits / month</List.Item>
                            <Divider my='sm' />
                            <List.Item>4 CV samples / month</List.Item>
                            <Divider my='sm' />
                            <List.Item>33 % discount</List.Item>
                            <Divider my='sm' />
                          </>
                        )}
                      </List>
                    </div>
                  </SimpleGrid>
                </Card.Section>
              </Card>
            </Grid.Col>
            <Grid.Col xs={12} sm={6} md={6}>
              <Card withBorder radius='md'>
                <Card.Section withBorder inheritPadding p='lg'>
                  <SimpleGrid cols={1}>
                    <div>
                      <Group spacing='xl'>
                        <ThemeIcon variant='outline' size='xl' color='teal'>
                          <IconCash />
                        </ThemeIcon>
                        <Text className={classes.title} size='xl'>
                          Pay As You Go
                        </Text>
                      </Group>
                    </div>
                    <div>
                      <Text
                        m='sm'
                        className={classes.description}
                        color='dimmed'
                      >
                        Launch Your Job Search With No Monthly or Annual
                        Commitment
                      </Text>
                    </div>
                    <div>
                      <SimpleGrid cols={3} spacing='xs'>
                        {services.map((service, i) => (
                          <div key={i}>
                            <Button
                              variant={
                                selectedService === service
                                  ? 'filled'
                                  : 'outline'
                              }
                              color={
                                selectedService === service ? 'teal' : 'orange'
                              }
                              fullWidth
                              onClick={() => handleServiceChange(service)}
                            >
                              {service}
                            </Button>
                          </div>
                        ))}
                      </SimpleGrid>
                    </div>
                    <div>
                      <SimpleGrid cols={2} pt='xl'>
                        <div>
                          <Text size={21}>Your Spend Limit :</Text>
                        </div>
                        <div>
                          <Select
                            value={selectedOption}
                            onChange={setSelectedOption}
                            size='lg'
                            placeholder='Pick Limit'
                            data={[
                              { value: 50, label: '50' },
                              { value: 100, label: '100' },
                              { value: 200, label: '200' },
                            ]}
                          />
                        </div>
                      </SimpleGrid>
                    </div>
                    <div>
                      <Text
                        m='sm'
                        className={classes.description}
                        color='dimmed'
                      >
                        You will receive{' '}
                        {creditsData[selectedOption][selectedService]} credits
                        for this service.
                      </Text>
                    </div>
                    <div>
                      <Space h='xl' />
                    </div>
                    <div>
                      <Button
                        variant='outline'
                        color='teal'
                        size='lg'
                        fullWidth
                        onClick={handlePayAsYouGo}
                      >
                        Get Started
                      </Button>
                    </div>
                  </SimpleGrid>
                </Card.Section>
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={6} pt='xl'></Grid.Col>
        <Grid.Col span={12} pt='xl'>
          <Group>
            <Text size={25} color='dimmed'>
              Paid But No Access ?
            </Text>
            <Popover
              width={300}
              position='bottom'
              withArrow
              shadow='md'
              opened={opened}
            >
              <Popover.Target>
                <ThemeIcon
                  size='xl'
                  variant='light'
                  color='orange'
                  onMouseEnter={open}
                  onMouseLeave={close}
                >
                  <IconInfoCircle />
                </ThemeIcon>
              </Popover.Target>
              <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
                <Text size='sm'>
                  Do not Panic . Logout and Login again with the credentials you
                  subscribed with. Still not working ? Call us on +254705043366
                  and we will help you
                </Text>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Grid.Col>
      </Grid>
    </PageSection>
  )
}

export default GetStarted

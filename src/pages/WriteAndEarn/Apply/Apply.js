import React from 'react'
import useStyles from './Apply.styles'
import {
  Container,
  Space,
  Text,
  TextInput,
  Checkbox,
  Button,
  NumberInput,
  Title,
  Radio,
  Textarea,
  Center,
} from '@mantine/core'
import { useForm } from '@mantine/form'

const Apply = () => {
  const { classes } = useStyles()

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      payoutType: '',
      shortSummary: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })
  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align='center'>
        Welcome
      </Title>
      <Text color='dimmed' size='sm' align='center'>
        Apply for Write n Earn program
      </Text>
      <Space h='xl' />
      <form>
        <Title className={classes.title} align='center' p='xl'>
          GENERAL INFORMATION
        </Title>
        <TextInput
          withAsterisk
          label='First Name'
          placeholder='first name'
          {...form.getInputProps('firstName')}
          p='xl'
        />
        <TextInput
          withAsterisk
          label='Last Name'
          placeholder='last name'
          {...form.getInputProps('lastName')}
          p='xl'
        />
        <TextInput
          withAsterisk
          label='email'
          placeholder='example@email.com'
          {...form.getInputProps('email')}
          p='xl'
        />
        <NumberInput
          placeholder='+254 7xxxxxxxx'
          label='Phone Number '
          withAsterisk
          hideControls
          {...form.getInputProps('phone')}
          p='xl'
        />
        <Title className={classes.title} align='center' p='xl'>
          PAYOUT DETAILS
        </Title>
        <Radio.Group
          name='payout'
          orientation='vertical'
          offset='sm'
          withAsterisk
          p='xl'
        >
          <Radio value='mpesa' label='Mpesa' />
          <Radio value='bank_transfer' label='Bank Transfer' />
        </Radio.Group>
        <Textarea
          placeholder='summary'
          label='ONE LAST THING'
          description='Explain in short the industry and experience level for the sample CVs you want to write'
          withAsterisk
          p='xl'
          {...form.getInputProps('shortSummary')}
        />
        <Checkbox
          label='I agree with Terms of Service'
          color='orange'
          {...form.getInputProps('termsOfServive')}
        />
        <Center pt='xl'>
          <Button>Submit</Button>
        </Center>
      </form>
    </Container>
  )
}

export default Apply

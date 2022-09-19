import React, { useEffect } from 'react'
import {
  Grid,
  Container,
  TextInput,
  NumberInput,
  Title,
  Button,
  Center,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconDeviceFloppy } from '@tabler/icons'

const PersonalDetails = () => {
  const form = useForm({
    initialValues: {
      firstName: '',
      secondName: '',
      phone: null,
      email: '',
      address: '',
      city: '',
      postCode: '',
      linkedIn: '',
    },
  })

  useEffect(() => {
    const storedValue = window.localStorage.getItem('personalDetails')
    if (storedValue) {
      try {
        form.setValues(
          JSON.parse(window.localStorage.getItem('personalDetails'))
        )
      } catch (e) {
        console.log('Failed to parse stored value')
      }
    }
  }, [])

  const handleSubmit = form.onSubmit(() => {
    window.localStorage.setItem('personalDetails', JSON.stringify(form.values))
  })
  return (
    <>
      <Container>
        <Title order={5} color='dimmed' italic pb='lg'>
          This info helps employer contact you
        </Title>
        <form onSubmit={handleSubmit}>
          <Grid grow py={5}>
            <Grid.Col md={6} lg={3}>
              <TextInput
                placeholder='First name'
                label='First Name'
                radius='xl'
                withAsterisk
                type='text'
                value={form.values.firstName}
                onChange={(e) =>
                  form.setFieldValue('firstName', e.currentTarget.value)
                }
              />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <TextInput
                placeholder='Second name'
                label='Second Name'
                radius='xl'
                withAsterisk
                type='text'
                value={form.values.secondName}
                onChange={(e) =>
                  form.setFieldValue('secondName', e.currentTarget.value)
                }
              />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <NumberInput
                placeholder='Phone number'
                label='Phone Number'
                radius='xl'
                withAsterisk
                hideControls
                value={form.values.phone}
                onChange={(e) => form.setFieldValue('phone', e)}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <TextInput
                placeholder='Your email'
                label='Email'
                radius='xl'
                withAsterisk
                type='email'
                value={form.values.email}
                onChange={(e) =>
                  form.setFieldValue('email', e.currentTarget.value)
                }
              />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <TextInput
                placeholder='Your address'
                label='Address'
                radius='xl'
                withAsterisk
                type='text'
                value={form.values.address}
                onChange={(e) =>
                  form.setFieldValue('address', e.currentTarget.value)
                }
              />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <TextInput
                placeholder='City'
                label='city'
                radius='xl'
                withAsterisk
                type='text'
                value={form.values.city}
                onChange={(e) =>
                  form.setFieldValue('city', e.currentTarget.value)
                }
              />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <TextInput
                placeholder='Postal Code'
                label='Postal Code'
                radius='xl'
                withAsterisk
                type='text'
                value={form.values.postCode}
                onChange={(e) =>
                  form.setFieldValue('postCode', e.currentTarget.value)
                }
              />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <TextInput
                placeholder='LinkedIn profile'
                label='LinkedIn'
                radius='xl'
                withAsterisk
                type='link'
                value={form.values.linkedIn}
                onChange={(e) =>
                  form.setFieldValue('linkedIn', e.currentTarget.value)
                }
              />
            </Grid.Col>
          </Grid>
          <Center pt='lg'>
            <Button
              color='orange'
              type='submit'
              leftIcon={<IconDeviceFloppy size={14} />}
            >
              Save
            </Button>
          </Center>
        </form>
      </Container>
    </>
  )
}

export default PersonalDetails

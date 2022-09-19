import React from 'react'
import { DatePicker } from '@mantine/dates'
import {
  Container,
  Grid,
  Select,
  TextInput,
  Title,
  Group,
  ActionIcon,
  Text,
  Button,
  Code,
} from '@mantine/core'
import { randomId } from '@mantine/hooks'
import { IconTrash } from '@tabler/icons'
import { useForm } from '@mantine/form'

const Education = () => {
  const form = useForm({
    initialValues: {
      education: [
        { school: '', degree: '', startDate: '', endDate: '', key: randomId() },
      ],
    },
  })

  const fields = form.values.education.map((item, index) => (
    <Grid key={item.key} mt='xs'>
      <Grid.Col md={6} lg={6}>
        <TextInput
          placeholder='School name'
          label='School Name'
          radius='xl'
          size='xs'
          withAsterisk
          type='text'
          {...form.getInputProps(`education.${index}.school`)}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={6}>
        <Select
          label='Degree'
          placeholder="Ex: Bachelor's"
          radius='xl'
          size='xs'
          withAsterisk
          data={[
            { value: 'PHD', label: 'PHD' },
            { value: 'masters', label: 'Masters' },
            { value: 'bachelors', label: 'Bachelor' },
            { value: 'diploma', label: 'Diploma' },
          ]}
          {...form.getInputProps(`education.${index}.degree`)}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={6}>
        <DatePicker
          placeholder='Start date'
          label='Start date'
          withAsterisk
          {...form.getInputProps(`education.${index}.startDate`)}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={6}>
        <DatePicker
          placeholder='End date'
          label='End date'
          withAsterisk
          {...form.getInputProps(`education.${index}.endDate`)}
        />
      </Grid.Col>
      <ActionIcon
        color='red'
        onClick={() => form.removeListItem('education', index)}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Grid>
  ))
  return (
    <>
      <Container>
        {fields.length > 0 ? (
          <Title order={5} color='dimmed' italic pb='lg'>
            List your Education details starting with your recent qualification
          </Title>
        ) : (
          <Text color='dimmed' align='center'>
            No Education Listed...
          </Text>
        )}

        {fields}
        <Group position='center' mt='md'>
          <Button
            onClick={() =>
              form.insertListItem('education', {
                school: '',
                degree: '',
                startDate: '',
                endDate: '',
                key: randomId(),
              })
            }
          >
            Add employee
          </Button>
        </Group>

        <Text size='sm' weight={500} mt='md'>
          Form values:
        </Text>
        <Code block>{JSON.stringify(form.values, null, 2)}</Code>
      </Container>
    </>
  )
}

export default Education

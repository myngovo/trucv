import React, { useState } from 'react'
import { RichTextEditor } from '@mantine/rte'
import {
  Button,
  Checkbox,
  Code,
  Container,
  Divider,
  Grid,
  Group,
  TextInput,
  Title,
  Text,
  ActionIcon,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import { IconTrash } from '@tabler/icons'

const Experience = () => {
  const form = useForm({
    initialValues: {
      experience: [
        {
          deliverables: '<p><i>Write deliverables in this <b>Job</b></i> </p>',
          jobTitle: '',
          employer: '',
          startDate: '',
          endDate: '',
          current: false,
          key: randomId(),
        },
      ],
    },
  })

  const fields = form.values.experience.map((item, index) => (
    <Grid py='lg' key={item.key} mt='xs'>
      <Grid.Col md={6} lg={6}>
        <TextInput
          placeholder='Job Title'
          label='Job Title'
          radius='xl'
          withAsterisk
          type='text'
          {...form.getInputProps(`experience.${index}.jobTitle`)}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={6}>
        <TextInput
          placeholder='Employer'
          label='Employer'
          radius='xl'
          withAsterisk
          type='text'
          {...form.getInputProps(`experience.${index}.employer`)}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={6}>
        <DatePicker
          placeholder='Start date'
          label='Start date'
          withAsterisk
          {...form.getInputProps(`experience.${index}.startDate`)}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={6}>
        <DatePicker
          placeholder='End date'
          label='End date'
          withAsterisk
          {...form.getInputProps(`experience.${index}.endDate`)}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={6}>
        <Checkbox
          label='I currently work here'
          color='orange'
          size='xs'
          {...form.getInputProps(`experience.${index}.current`, {
            type: 'checkbox',
          })}
        />
      </Grid.Col>
      <Grid.Col md={12} lg={12}>
        <RichTextEditor
          {...form.getInputProps(`experience.${index}.deliverables`)}
          controls={[
            ['bold', 'italic', 'underline', 'link'],
            ['unorderedList', 'h1', 'h2', 'h3'],
            ['sup', 'sub'],
            ['alignLeft', 'alignCenter', 'alignRight'],
          ]}
        />
      </Grid.Col>
      <ActionIcon
        color='red'
        onClick={() => form.removeListItem('employees', index)}
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
         Tell Us about relevant work experience. Start with the most recent job
       </Title>
      ) : (
        <Text color="dimmed" align="center">
          No one here...
        </Text>
      )}

      {fields}

        <Divider my='sm' pb='lg' />
        <Group position='center' mt='md'>
          <Button
            onClick={() =>
              form.insertListItem('experience', {
                deliverables:
                  '<p><i>Write deliverables in this <b>Job</b></i> </p>',
                jobTitle: '',
                employer: '',
                startDate: '',
                endDate: '',
                current: false,
                key: randomId(),
              })
            }
          >
            Add Experience
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

export default Experience

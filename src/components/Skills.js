import React from 'react'
import {
  Container,
  Title,
  TextInput,
  Group,
  Text,
  ActionIcon,
  Button,
  Stack,
  Code,
} from '@mantine/core'
import { RichTextEditor } from '@mantine/rte'
import { useForm } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import { IconTrash } from '@tabler/icons'

const Skills = () => {
  const form = useForm({
    initialValues: {
      skills: [
        {
          skill: '',
          evidenceOfSkill:
            '<p><i>List Evidence of this Skill <b>Job</b></i> </p>',
          key: randomId(),
        },
      ],
    },
  })

  const fields = form.values.skills.map((item, index) => (
    <Stack align='center' key={item.key} mt='xs'>
      <TextInput
        placeholder='Enter Skill'
        label='Skill'
        radius='xl'
        withAsterisk
        {...form.getInputProps(`skills.${index}.skill`)}
      />
      <RichTextEditor
        {...form.getInputProps(`skills.${index}.evidenceOfSkill`)}
        controls={[
          ['bold', 'italic', 'underline', 'link'],
          ['unorderedList', 'h1', 'h2', 'h3'],
          ['sup', 'sub'],
          ['alignLeft', 'alignCenter', 'alignRight'],
        ]}
      />
      <ActionIcon
        color='red'
        onClick={() => form.removeListItem('skills', index)}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Stack>
  ))
  return (
    <>
      <Container>
        {fields.length > 0 ? (
          <Title order={5} color='dimmed' italic pb='lg'>
            List Skills that correspond with key words from the job description
          </Title>
        ) : (
          <Text color='dimmed' align='center'>
            No Skill Listed...
          </Text>
        )}

        {fields}
        <Group position='center' mt='md'>
          <Button
            onClick={() =>
              form.insertListItem('skills', {
                skill: '',
                evidenceOfSkill:
                  '<p><i>List Evidence of this Skill <b>Job</b></i> </p>',
                key: randomId(),
              })
            }
          >
            Add Skill
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

export default Skills

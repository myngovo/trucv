import React, { useEffect } from 'react'
import { RichTextEditor } from '@mantine/rte'
import { Button, Center, Container, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconDeviceFloppy } from '@tabler/icons'

const ProfessionalSummary = () => {
  const form = useForm({
    initialValues: {
      professionalSummary:
        'A professional summary is a 2-4 sentence summary of your professional experiences and achievements.',
    },
  })

  useEffect(() => {
    const storedValue = window.localStorage.getItem('professionalSummary')
    if (storedValue) {
      try {
        form.setValues(
          JSON.parse(window.localStorage.getItem('professionalSummary'))
        )
      } catch (e) {
        console.log('Failed to parse stored value')
      }
    }
  }, [])

  const handleSubmit = form.onSubmit(() => {
    window.localStorage.setItem(
      'professionalSummary',
      JSON.stringify(form.values)
    )
  })

  return (
    <>
      <Container>
        <Title order={5} color='dimmed' italic pb='lg'>
          Include Key competencies with relevant keywords from the job
          description
        </Title>
        <form onSubmit={handleSubmit}>
          <RichTextEditor
            value={form.values.professionalSummary}
            onChange={(e) => form.setFieldValue('professionalSummary', e)}
            controls={[
              ['bold', 'italic', 'underline', 'link'],
              ['unorderedList', 'h1', 'h2', 'h3'],
              ['sup', 'sub'],
              ['alignLeft', 'alignCenter', 'alignRight'],
            ]}
          />
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

export default ProfessionalSummary

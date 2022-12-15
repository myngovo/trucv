import React from 'react'
import PageSection from '../../PageSection/PageSection'
import { Container, List, ThemeIcon } from '@mantine/core'
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons'

const Section = () => {
  return (
    <PageSection title='Avoid costly CV mistakes'>
      {' '}
      <Container>
        <List
          spacing='xs'
          size='xl'
          center
          icon={
            <ThemeIcon color='teal' size={24} radius='xl'>
              <IconCircleCheck size={16} />
            </ThemeIcon>
          }
        >
          <List.Item>Incompatible file type</List.Item>
          <List.Item>Unreadable charts and graphics</List.Item>

          <List.Item
            icon={
              <ThemeIcon color='blue' size={24} radius='xl'>
                <IconCircleDashed size={16} />
              </ThemeIcon>
            }
          >
            Fancy CV templates get scrambled
          </List.Item>
        </List>
      </Container>
    </PageSection>
  )
}

export default Section

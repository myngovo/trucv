import React from 'react'
import PageSection from '../../PageSection/PageSection'
import {
  List,
  Button,
  Menu,
  Text,
  useMantineTheme,
  Stack,
  Image,
} from '@mantine/core'
import { FEATURES_DATA } from './features'
import { IconChevronDown } from '@tabler/icons'
import image from './image.svg'
import { Link } from 'react-router-dom'

const Header = () => {
  const theme = useMantineTheme()

  const features = FEATURES_DATA.map((feature) => (
    <Menu
      transition='pop-top-right'
      position='top-end'
      width={220}
      key={feature.buttonName}
    >
      <Menu.Target>
        <Button
          rightIcon={<IconChevronDown size={18} stroke={1.5} />}
          pr={12}
          size='xl'
          radius='xl'
          color='orange'
        >
          {feature.buttonName}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={
            <feature.icon size={16} color={theme.colors.blue[6]} stroke={1.5} />
          }
          rightSection={
            <Text size='xs' transform='uppercase' weight={700} color='dimmed'>
              {feature.rightSection}
            </Text>
          }
          component={Link}
          to={feature.link}
        >
          {feature.menuName}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ))
  return (
    <PageSection
      title='The cost of a poor CV can add up:'
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <List size='lg' mt='xl' mb='xl' withPadding>
        <List.Item>Not getting the interview</List.Item>
        <List.Item>Losing your dream job</List.Item>
        <List.Item>Settling for any job</List.Item>
      </List>
      <Text mt='xl' mb='xl' size='xl' weight={700}>
        We are here to help
      </Text>
      <Stack align='flex-start'>{features}</Stack>
      <div style={{ width: 380, marginLeft: 'auto', marginRight: 'auto' }}>
        <Image radius='md' src={image} alt='Tru CV image' caption='Tru CV' />
      </div>
    </PageSection>
  )
}

export default Header

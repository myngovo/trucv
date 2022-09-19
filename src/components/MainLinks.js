import React from 'react'
import {

  IconLayoutDashboard,
  IconFriends,
  IconLogin,
} from '@tabler/icons'
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core'

const data = [
  {
    icon: <IconLayoutDashboard size={16} />,
    color: 'blue',
    label: 'Dashboard',
  },
  {
    icon: <IconFriends size={16} />,
    color: 'teal',
    label: 'Invite Teammate',
  },
  { icon: <IconLogin size={16} />, color: 'violet', label: 'Login Data' },
]

function MainLink({ icon, color, label }) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant='light'>
          {icon}
        </ThemeIcon>

        <Text size='sm'>{label}</Text>
      </Group>
    </UnstyledButton>
  )
}

const MainLinks = () => {
  const links = data.map((link) => <MainLink {...link} key={link.label} />)
  return <div>{links}</div>
}

export default MainLinks

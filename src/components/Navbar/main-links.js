/* eslint import/no-anonymous-default-export: [2, {"allowArray": true}] */
import { DEFAULT_THEME } from '@mantine/core'
import {
  IconStackPush,
  IconUserPlus,
  IconLayoutDashboard,
} from '@tabler/icons'

export default [
  {
    to: '/pages/dashboard/',
    label: 'Dashboard',
    color: DEFAULT_THEME.colors.blue[5],
    icon: IconLayoutDashboard,
  },
  {
    to: '/pages/invite/',
    label: 'Invite Teammate',
    color: DEFAULT_THEME.colors.violet[5],
    icon: IconUserPlus,
  },
  {
    to: '/pages/login/',
    label: 'Login Data',
    color: DEFAULT_THEME.colors.indigo[5],
    icon: IconStackPush,
    rawIcon: true,
  },
]

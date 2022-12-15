/* eslint import/no-anonymous-default-export: [2, {"allowArray": true}] */
import { DEFAULT_THEME } from '@mantine/core'
import {
  IconForms,
  IconLiveView,
  IconColorSwatch,
  IconLogout,
  IconWriting,
  IconLogin,
} from '@tabler/icons'

export default [
  {
    to: '/products/builder',
    label: 'CV Builder',
    color: DEFAULT_THEME.colors.blue[5],
    icon: IconForms,
  },
  {
    to: '/products/review',
    label: 'CV Review',
    color: DEFAULT_THEME.colors.violet[5],
    icon: IconLiveView,
  },
  {
    to: '/products/samples',
    label: 'CV Samples',
    color: DEFAULT_THEME.colors.violet[5],
    icon: IconColorSwatch,
  },

  {
    to: '/products/write-n-earn',
    label: "Write n' Earn",
    color: DEFAULT_THEME.colors.violet[5],
    icon: IconWriting,
  },
  {
    to: 'login/',
    label: 'Sign Up',
    color: DEFAULT_THEME.colors.indigo[5],
    icon: IconLogin,
  },
  {
    to: '#',
    label: 'Logout',
    color: DEFAULT_THEME.colors.violet[5],
    icon: IconLogout,
  },
]

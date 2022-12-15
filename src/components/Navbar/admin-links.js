/* eslint import/no-anonymous-default-export: [2, {"allowArray": true}] */
import { DEFAULT_THEME } from '@mantine/core'
import {
  
  IconUserCheck,
  IconReportMoney,

} from '@tabler/icons'

export default [
  {
    to: '/admin/dashboard',
    label: 'Admin Dashboard',
    color: DEFAULT_THEME.colors.blue[5],
    icon: IconUserCheck,
  },
  {
    to: '/admin/transactions',
    label: 'Transactions List',
    color: DEFAULT_THEME.colors.violet[5],
    icon: IconReportMoney,
  },
]

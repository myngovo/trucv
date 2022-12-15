import { createStyles } from '@mantine/core'

const BREAKPOINT = '@media (max-width: 960px)'

export default createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },
  description: {
    marginTop: theme.spacing.xl * 1.5,
    fontSize: 24,

    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7],

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left',
    },
  },
  card: {
    height: 240,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}))

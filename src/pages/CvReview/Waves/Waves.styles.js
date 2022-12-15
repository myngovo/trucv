import { createStyles } from '@mantine/core'

export default createStyles((theme, { width, height, flip, alt }) => ({
  root: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[alt ? 8 : 7]
        : alt
        ? theme.white
        : theme.colors.gray[0],
  },

  waves: {
    fill:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[alt ? 7 : 8]
        : alt
        ? theme.colors.gray[0]
        : theme.white,
    width: `${width}%`,
    height,
    transform: flip ? 'scaleX(-1)' : undefined,
    filter: alt ? undefined : 'drop-shadow(10px 5px 5px rgba(0, 0, 0, 0.03))',

    [theme.fn.smallerThan('sm')]: {
      height: 18,
    },
  },
}))

import React from 'react'
import {
  createStyles,
  Text,
  Container,
  ActionIcon,
  Group,
  Footer as Foot,
} from '@mantine/core'
import {
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandFacebook,
  IconAt,
} from '@tabler/icons'

const data = [
  {
    title: 'Career Tools',
    links: [
      { label: 'Free Cv Builder', link: '#' },
      { label: 'CV Samples ', link: '#' },
      { label: 'Get CV Reviewed', link: '#' },
    ],
  },
  {
    title: 'Career Resources',
    links: [
      { label: 'Write & Earn', link: '#' },
      { label: 'Blog', link: '#' },
    ],
  },
  {
    title: 'About Company',
    links: [
      { label: 'About Us', link: '#' },
      { label: 'myNGOVO Advance', link: '#' },
      { label: 'TruAttendance', link: '#' },
    ],
  },
]

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 190,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: 'block',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.dark[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}))

const Footer = () => {
  const { classes } = useStyles()

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component='a'
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ))
    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    )
  })

  return (
    <Foot
      p='md'
      height={250}
      sx={(theme) => ({
        backgroundImage: theme.fn.linearGradient(45, '#7ac2c9', '#be94c6'),
      })}
    >
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Text size='xs' color='dimmed' className={classes.description}>
            Connect with Us on Social Media
          </Text>
          <Group
            spacing={0}
            className={classes.social}
            position='center'
            noWrap
          >
            <ActionIcon size='lg' color='pink'>
              <IconBrandInstagram size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size='lg' color='orange'>
              <IconAt size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size='lg' color='indigo'>
              <IconBrandFacebook size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size='lg' color='blue'>
              <IconBrandTwitter size={18} stroke={1.5} />
            </ActionIcon>
          </Group>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Group position='apart' spacing='xl'>
          <Text color='dimmed' size='sm'>
            Twenifo Technologies ltd © 2022. All rights reserved.
          </Text>
          <Text color='dimmed' size='sm'>
            Privacy Policy | Directory | Terms of Services.
          </Text>
        </Group>
      </Container>
    </Foot>
  )
}

export default Footer

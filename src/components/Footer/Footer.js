import React from 'react'
import { Container, Text, Group, ActionIcon } from '@mantine/core'
import { data as FOOTER_LINKS_DATA } from '../Footer/data'
import LinksGroup from './LinksGroup/LinksGroup'
import useStyles from './Footer.styles'
import Logo from '../Logo/Logo'
import {
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandFacebook,
  IconAt,
} from '@tabler/icons'

const Footer = ({ withNavbar }) => {
  const { classes, cx } = useStyles()
  const groups = FOOTER_LINKS_DATA.map((group) => (
    <LinksGroup data={group.data} title={group.title} key={group.title} />
  ))
  return (
    <>
      <div className={classes.spacer} />
      <div
        className={cx(classes.wrapper, { [classes.withNavbar]: withNavbar })}
      >
        <Container size={1100}>
          <div className={classes.inner}>
            <div className={classes.logoSection}>
              <Logo />
              <Text className={classes.description} size='sm'>
                Build fully functional accessible web applications faster than
                ever
              </Text>
            </div>

            <div className={classes.groups}>{groups}</div>
          </div>

          <div className={classes.afterFooter}>
            <Group position='apart'>
              <Text size='xs' className={classes.afterFooterNote}>
                Built by Twenifo Technology
              </Text>
              <div className={classes.social}>
                <ActionIcon
                  size='lg'
                  color='pink'
                  className={classes.socialButton}
                >
                  <IconBrandInstagram size={18} stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                  size='lg'
                  color='orange'
                  className={classes.socialButton}
                >
                  <IconAt size={18} stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                  size='lg'
                  color='indigo'
                  className={classes.socialButton}
                >
                  <IconBrandFacebook size={18} stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                  size='lg'
                  color='blue'
                  className={classes.socialButton}
                >
                  <IconBrandTwitter size={18} stroke={1.5} />
                </ActionIcon>
              </div>
            </Group>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Footer

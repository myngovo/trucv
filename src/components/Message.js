import { Notification } from '@mantine/core'

const Message = ({ color, title, children }) => {
  return (
    <Notification
      color={color}
      title={title}
      disallowClose
      sx={(theme) => ({
        backgroundColor: theme.colors.red[0],
        '&:hover': {
          backgroundColor: theme.colors.red[1],
        },
      })}
    >
      {children}
    </Notification>
  )
}
Message.defaultProps = {
  color: 'teal',
  title: 'We notify you that',
}

export default Message

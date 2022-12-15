import { useRef, useState, useCallback } from 'react'
import {
  Text,
  Group,
  Button,
  createStyles,
  Space,
  Container,
} from '@mantine/core'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20,
  },
}))

const CvReview = () => {
  const { classes, theme } = useStyles()
  const openRef = useRef(null)
  const [file, setFile] = useState(null)

  const handleUpload = (files) => {
    console.log('accepted files', files)
    setFile(files)

    const formData = new FormData()

    formData.append('pdfFile', files[0])

    const requestOptions = {
      method: 'POST',
      body: formData,
    }
    fetch('https://tru-cv-backend.onrender.com/extract-text', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  }

  return (
    <div className={classes.wrapper}>
      <Container pt='lg'>
        <Space h='xl' />
        <Dropzone
          openRef={openRef}
          onDrop={handleUpload}
          onReject={(files) => console.log('rejected files', files)}
          className={classes.dropzone}
          radius='md'
          accept={[MIME_TYPES.pdf]}
          maxSize={30 * 1024 ** 2}
        >
          <div style={{ pointerEvents: 'none' }}>
            <Group position='center'>
              <Dropzone.Accept>
                <IconDownload
                  size={50}
                  color={theme.colors[theme.primaryColor][6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  size={50}
                  color={
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[0]
                      : theme.black
                  }
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text align='center' weight={700} size='lg' mt='xl'>
              <Dropzone.Accept>Drop files here</Dropzone.Accept>
              <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
              <Dropzone.Idle>Upload resume</Dropzone.Idle>
            </Text>
            <Text align='center' size='sm' mt='xs' color='dimmed'>
              Drag&apos;n&apos;drop files here to upload. We can accept only{' '}
              <i>.pdf</i> files that are less than 30mb in size.
            </Text>
          </div>
        </Dropzone>

        <Button
          className={classes.control}
          size='md'
          radius='xl'
          onClick={() => openRef.current?.()}
        >
          Select files
        </Button>
        {file && (
          <Text size='sm' align='center' mt='sm'>
            Picked file: {file.name}
          </Text>
        )}
      </Container>
    </div>
  )
}

export default CvReview

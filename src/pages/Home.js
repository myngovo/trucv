import React, { useState } from 'react'
import {
  Stepper,
  Button,
  Group,
  Container,
  Title,
  Divider,
  Grid,
  ActionIcon,
  Text,
  Center,
  TextInput,
  NumberInput,
  Select,
  Stack,
  Image,
  Box,
  Modal,
  Space,
  Popover,
  List,
  SegmentedControl,
} from '@mantine/core'
import {
  IconUserCheck,
  IconCircleCheck,
  IconEdit,
  IconSubtask,
  IconSchool,
  IconNetwork,
  IconGripVertical,
  IconTableOptions,
  IconBulb,
  IconTemplate,
} from '@tabler/icons'
import { useForm } from '@mantine/form'
import { RichTextEditor } from '@mantine/rte'
import { randomId } from '@mantine/hooks'
import { IconTrash } from '@tabler/icons'
import { DatePicker } from '@mantine/dates'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import svgImageCv from '../cv.svg'
import { Link } from 'react-router-dom'
import svgImageDownload from '../burner.svg'
import PageSection from './PageSection/PageSection'
import ResumeDownload from './ResumeDownload'
import template1 from '../templates/template 1.png'
import template2 from '../templates/template 2.png'
import { BrowserView, MobileView } from 'react-device-detect'

const Home = () => {
  const [active, setActive] = useState(0)
  const [opened, setOpened] = useState(false)

  const form = useForm({
    initialValues: {
      personalDetails: {
        firstName: '',
        secondName: '',
        phone: null,
        email: '',
        address: '',
        city: '',
        postCode: '',
        linkedIn: '',
      },
      professionalSummary: {
        summary: '',
      },
      experience: [
        {
          deliverables: '',
          jobTitle: '',
          employer: '',
          startDate: '',
          endDate: '',
          key: randomId(),
        },
      ],
      education: [
        {
          school: '',
          study: '',
          degree: '',
          startDate: '',
          endDate: '',
          key: randomId(),
        },
      ],
      skills: [
        {
          skill: '',
          evidenceOfSkill: '',
          key: randomId(),
        },
      ],
      custom: [
        {
          title: '',
          body: '',
        },
      ],
      template: {
        template: 'template 2',
      },
    },
    validate: (values) => {
      if (active === 0) {
        return {
          'personalDetails.firstName':
            values.personalDetails.firstName.trim().length < 2
              ? 'required'
              : null,
          'personalDetails.secondName':
            values.personalDetails.secondName.trim().length < 2
              ? 'required'
              : null,
          'personalDetails.email': /^\S+@\S+$/.test(
            values.personalDetails.email
          )
            ? null
            : 'Invalid email',
          'personalDetails.address':
            values.personalDetails.address.trim().length < 2
              ? 'required'
              : null,
          'personalDetails.city':
            values.personalDetails.city.trim().length < 2 ? 'required' : null,
          'personalDetails.postCode':
            values.personalDetails.postCode.trim().length < 2
              ? 'required'
              : null,
        }
      }

      return {}
    },
  })

  const nextStep = () => {
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current
      }
      return current < 7 ? current + 1 : current
    })
  }

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  // Experience section input fields

  const experienceFields = form.values.experience.map((item, index) => (
    <Grid py='lg' key={item.key} mt='xs'>
      <Grid.Col md={6} lg={6}>
        <TextInput
          placeholder='Job Title'
          label='Job Title'
          radius='xl'
          withAsterisk
          type='text'
          {...form.getInputProps(`experience.${index}.jobTitle`)}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={6}>
        <TextInput
          placeholder='Employer'
          label='Company'
          radius='xl'
          withAsterisk
          type='text'
          {...form.getInputProps(`experience.${index}.employer`)}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={6}>
        <DatePicker
          placeholder='Start date'
          label='Start date'
          withAsterisk
          {...form.getInputProps(`experience.${index}.startDate`)}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={6}>
        <DatePicker
          placeholder='End date'
          label='End date'
          withAsterisk
          {...form.getInputProps(`experience.${index}.endDate`)}
        />
      </Grid.Col>

      <Grid.Col md={12} lg={12}>
        <RichTextEditor
          placeholder='Description'
          {...form.getInputProps(`experience.${index}.deliverables`)}
          controls={[
            ['bold', 'italic', 'underline', 'link'],
            ['unorderedList', 'h1', 'h2', 'h3'],
            ['sup', 'sub'],
            ['alignLeft', 'alignCenter', 'alignRight'],
          ]}
        />
      </Grid.Col>
      <ActionIcon
        color='red'
        onClick={() => form.removeListItem('experience', index)}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Grid>
  ))

  // Education section fields inputs

  const educationFields = form.values.education.map((item, index) => (
    <Grid key={item.key} mt='xs'>
      <Grid.Col md={6} lg={6}>
        <TextInput
          placeholder='Institution name'
          label='Institution Name'
          radius='xl'
          size='xs'
          withAsterisk
          type='text'
          {...form.getInputProps(`education.${index}.school`)}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={6}>
        <Select
          label='Degree'
          placeholder="Ex: Bachelor's"
          radius='xl'
          size='xs'
          withAsterisk
          data={[
            { value: 'PHD', label: 'PHD' },
            { value: 'masters', label: 'Masters' },
            { value: 'bachelors', label: 'Bachelor' },
            { value: 'diploma', label: 'Diploma' },
          ]}
          {...form.getInputProps(`education.${index}.degree`)}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={6}>
        <TextInput
          placeholder='Field of Study'
          label='Field of Study'
          radius='xl'
          size='xs'
          withAsterisk
          type='text'
          {...form.getInputProps(`education.${index}.study`)}
        />
      </Grid.Col>

      <Grid.Col md={6} lg={6}>
        <DatePicker
          placeholder='Start date'
          label='Start date'
          withAsterisk
          {...form.getInputProps(`education.${index}.startDate`)}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={6}>
        <DatePicker
          placeholder='End date'
          label='End date'
          withAsterisk
          {...form.getInputProps(`education.${index}.endDate`)}
        />
      </Grid.Col>

      <Grid.Col md={12} lg={12}>
        <ActionIcon
          color='red'
          onClick={() => form.removeListItem('education', index)}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  ))

  // Skills section input fields

  const skillsFields = form.values.skills.map((item, index) => (
    <Stack align='center' key={item.key} mt='xs'>
      <TextInput
        placeholder='Enter Skill'
        label='Skill'
        radius='xl'
        withAsterisk
        {...form.getInputProps(`skills.${index}.skill`)}
      />
      <RichTextEditor
        placeholder={'Give evidence of this skill'}
        {...form.getInputProps(`skills.${index}.evidenceOfSkill`)}
        controls={[
          ['bold', 'italic', 'underline', 'link'],
          ['unorderedList', 'h1', 'h2', 'h3'],
          ['sup', 'sub'],
          ['alignLeft', 'alignCenter', 'alignRight'],
        ]}
      />
      <ActionIcon
        color='red'
        onClick={() => form.removeListItem('skills', index)}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Stack>
  ))

  // Custom section input fields

  const customFiels = form.values.custom.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group ref={provided.innerRef} mt='xs' {...provided.draggableProps}>
          <Center {...provided.dragHandleProps}>
            <IconGripVertical size={18} />
          </Center>
          <TextInput
            placeholder='E.g Referee'
            label='Section Heading'
            radius='xl'
            {...form.getInputProps(`custom.${index}.title`)}
          />
          <RichTextEditor
            placeholder={'Type Section Body'}
            {...form.getInputProps(`custom.${index}.body`)}
            controls={[
              ['bold', 'italic', 'underline', 'link'],
              ['unorderedList', 'h1', 'h2', 'h3'],
              ['sup', 'sub'],
              ['alignLeft', 'alignCenter', 'alignRight'],
            ]}
          />
          <ActionIcon
            color='red'
            onClick={() => form.removeListItem('custom', index)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      )}
    </Draggable>
  ))

  //handle download button click

  const bunnerHandler = () => {
    window.localStorage.setItem('user-cv', JSON.stringify(form.values))
    setOpened(true)
  }

  //handle continue to download

  const handleDownload = () => {
    setOpened(false)
  }

  return (
    <>
      <Container size='xl' pt='xl'>
        <PageSection title='Put your best foot forward with a job-winning CV'></PageSection>

        <Stepper
          active={active}
          completedIcon={<IconCircleCheck />}
          breakpoint='sm'
          color='orange'
          pt='lg'
        >
          <Stepper.Step
            icon={<IconUserCheck size={18} />}
            label='Personal Details'
          >
            <Space h='md' />
            <Group position='apart' spacing='sm'>
              <Title order={5} color='dimmed' italic pb='lg'>
                What’s the best way for employers to contact you?
              </Title>
              <Popover
                width={500}
                position='bottom'
                withArrow
                shadow='md'
                styles={(theme) => ({
                  dropdown: {
                    background: theme.fn.linearGradient(
                      45,
                      '#7ac2c9',
                      '#be94c6'
                    ),
                  },
                })}
              >
                <Popover.Target>
                  <Button
                    leftIcon={<IconBulb />}
                    variant='white'
                    color='orange'
                  >
                    Tips
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Title order={5}>Knowledge Tidbits</Title>
                  <List>
                    <List.Item>
                      Choose a CV template that optimizes the discoverability of
                      your contacts.
                    </List.Item>

                    <List.Item>
                      Choose an easy to read font, no fancy stuff, no BS.
                    </List.Item>

                    <List.Item>
                      Don’t leave lots of white spaces in your CV
                    </List.Item>

                    <List.Item>
                      Remember, a strong Linkedin profile complements your CV
                    </List.Item>
                  </List>
                  <Text>
                    {' '}
                    DID YOU KNOW? 21% of applicants share CVs that include
                    unreadable graphics and charts.
                  </Text>
                </Popover.Dropdown>
              </Popover>
            </Group>

            <Grid grow py={5}>
              <Grid.Col md={6} lg={3}>
                <TextInput
                  placeholder='First name'
                  label='First Name'
                  radius='xl'
                  withAsterisk
                  {...form.getInputProps('personalDetails.firstName')}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                <TextInput
                  placeholder='Second name'
                  label='Second Name'
                  radius='xl'
                  withAsterisk
                  {...form.getInputProps('personalDetails.secondName')}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                <NumberInput
                  placeholder='Phone number'
                  label='Phone Number'
                  radius='xl'
                  hideControls
                  {...form.getInputProps('personalDetails.phone')}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                <TextInput
                  placeholder='Your email'
                  label='Email'
                  radius='xl'
                  withAsterisk
                  {...form.getInputProps('personalDetails.email')}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                <TextInput
                  placeholder='Your address'
                  label='Address'
                  radius='xl'
                  withAsterisk
                  {...form.getInputProps('personalDetails.address')}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                <TextInput
                  placeholder='City'
                  label='city'
                  radius='xl'
                  withAsterisk
                  {...form.getInputProps('personalDetails.city')}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                <TextInput
                  placeholder='Postal Code'
                  label='Postal Code'
                  radius='xl'
                  withAsterisk
                  {...form.getInputProps('personalDetails.postCode')}
                />
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                <TextInput
                  placeholder='LinkedIn profile'
                  label='LinkedIn'
                  radius='xl'
                  {...form.getInputProps('personalDetails.linkedIn')}
                />
              </Grid.Col>
            </Grid>
          </Stepper.Step>
          <Stepper.Step
            icon={<IconEdit size={18} />}
            label='Professional Summary'
          >
            <Group position='apart' spacing='sm'>
              <Title order={5} color='dimmed' italic pb='lg'>
                Briefly tell us about your background
              </Title>
              <Popover
                width={500}
                position='bottom'
                withArrow
                shadow='md'
                styles={(theme) => ({
                  dropdown: {
                    background: theme.fn.linearGradient(
                      45,
                      '#7ac2c9',
                      '#be94c6'
                    ),
                  },
                })}
              >
                <Popover.Target>
                  <Button
                    leftIcon={<IconBulb />}
                    variant='white'
                    color='orange'
                  >
                    Tips
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Title order={5}>Knowledge Tidbits</Title>
                  <List>
                    <List.Item>
                      Include key competencies from your experience.
                    </List.Item>

                    <List.Item>
                      Remember to also sprinkle keywords from the job
                      description
                    </List.Item>

                    <List.Item>
                      Tailor your CV for each job to show intent and commitment
                    </List.Item>
                  </List>
                  <Text>
                    DID YOU KNOW? Omitting keywords from the job description
                    increases the tossability of your CV.
                  </Text>
                </Popover.Dropdown>
              </Popover>
            </Group>
            <Space h='xl' />
            <RichTextEditor
              placeholder={'Write Your Summary Here'}
              controls={[
                ['bold', 'italic', 'underline', 'link'],
                ['unorderedList', 'h1', 'h2', 'h3'],
                ['sup', 'sub'],
                ['alignLeft', 'alignCenter', 'alignRight'],
              ]}
              {...form.getInputProps('professionalSummary.summary')}
            />
          </Stepper.Step>
          <Stepper.Step icon={<IconNetwork size={18} />} label='Experience'>
            {experienceFields.length > 0 ? (
              <>
                <Group position='apart' spacing='sm'>
                  <Title order={5} color='dimmed' italic pb='lg'>
                    Tell us about your most recent job We’ll start there and
                    work backward.
                  </Title>
                  <Popover
                    width={500}
                    position='bottom'
                    withArrow
                    shadow='md'
                    styles={(theme) => ({
                      dropdown: {
                        background: theme.fn.linearGradient(
                          45,
                          '#7ac2c9',
                          '#be94c6'
                        ),
                      },
                    })}
                  >
                    <Popover.Target>
                      <Button
                        leftIcon={<IconBulb />}
                        variant='white'
                        color='orange'
                      >
                        Tips
                      </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Title order={5}>Knowledge Tidbits</Title>

                      <List>
                        <List.Item>
                          Highlight the deliverables required and how you
                          achieved them.
                        </List.Item>

                        <List.Item>
                          Make use of impact statements and metrics to show
                          impact e.g Launched a loyalty programme in my first
                          year that reduced churn by 30%.
                        </List.Item>

                        <List.Item>
                          Use bullet structure and include keywords from the JD.
                        </List.Item>
                      </List>
                    </Popover.Dropdown>
                  </Popover>
                </Group>
                <Space h='xl' />
              </>
            ) : (
              <Text color='dimmed' align='center'>
                Experience Section is Empty...
              </Text>
            )}

            {experienceFields}

            <Divider my='sm' pb='lg' />
            <Group position='center' mt='md'>
              <Button
                onClick={() =>
                  form.insertListItem('experience', {
                    deliverables: '',
                    jobTitle: '',
                    employer: '',
                    startDate: '',
                    endDate: '',

                    key: randomId(),
                  })
                }
              >
                Add Experience
              </Button>
            </Group>
          </Stepper.Step>
          <Stepper.Step label='Education' icon={<IconSchool size={18} />}>
            {educationFields.length > 0 ? (
              <Group position='apart' spacing='sm'>
                <Title order={5} color='dimmed' italic pb='lg'>
                  List your Education details starting with your recent
                  qualification
                </Title>
                <Popover
                  width={500}
                  position='bottom'
                  withArrow
                  shadow='md'
                  styles={(theme) => ({
                    dropdown: {
                      background: theme.fn.linearGradient(
                        45,
                        '#7ac2c9',
                        '#be94c6'
                      ),
                    },
                  })}
                >
                  <Popover.Target>
                    <Button
                      leftIcon={<IconBulb />}
                      variant='white'
                      color='orange'
                    >
                      Tips
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Title order={5}>Knowledge Tidbits</Title>

                    <List>
                      <List.Item>
                        Never put education before experience.
                      </List.Item>

                      <List.Item>
                        Do not overlook the small things like grammar and font
                      </List.Item>

                      <List.Item>
                        Use Tru CV Review to validate the strength of your CV
                      </List.Item>
                    </List>
                  </Popover.Dropdown>
                </Popover>
              </Group>
            ) : (
              <Text color='dimmed' align='center'>
                No Education Listed...
              </Text>
            )}

            {educationFields}
            <Group position='center' mt='md'>
              <Button
                onClick={() =>
                  form.insertListItem('education', {
                    school: '',
                    degree: '',
                    study: '',
                    startDate: '',
                    endDate: '',
                    key: randomId(),
                  })
                }
              >
                Add Education
              </Button>
            </Group>
          </Stepper.Step>
          <Stepper.Step label='Skills' icon={<IconSubtask />}>
            {skillsFields.length > 0 ? (
              <Group position='apart' spacing='sm'>
                <Title order={5} color='dimmed' italic pb='lg'>
                  List Skills that correspond with key words from the job
                  description
                </Title>
                <Popover
                  width={500}
                  position='bottom'
                  withArrow
                  shadow='md'
                  styles={(theme) => ({
                    dropdown: {
                      background: theme.fn.linearGradient(
                        45,
                        '#7ac2c9',
                        '#be94c6'
                      ),
                    },
                  })}
                >
                  <Popover.Target>
                    <Button
                      leftIcon={<IconBulb />}
                      variant='white'
                      color='orange'
                    >
                      Tips
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Title order={5}>Knowledge Tidbits</Title>

                    <List>
                      <List.Item>
                        Show evidence of the skill and how it will be useful to
                        your potential employer.
                      </List.Item>

                      <List.Item>
                        Include keywords from the job description
                      </List.Item>

                      <List.Item>
                        Use action verbs e.g. bolstered, gained or surpassed to
                        show increase.
                      </List.Item>
                    </List>
                    <Text>
                      DID YOU KNOW? Recruiters use Applicant Tracking Systems
                      (ATS) to sift through 100s of CVs
                    </Text>
                  </Popover.Dropdown>
                </Popover>
              </Group>
            ) : (
              <Text color='dimmed' align='center'>
                No Skill Listed...
              </Text>
            )}

            {skillsFields}
            <Group position='center' mt='md'>
              <Button
                onClick={() =>
                  form.insertListItem('skills', {
                    skill: '',
                    evidenceOfSkill: '',
                    key: randomId(),
                  })
                }
              >
                Add Skill
              </Button>
            </Group>
          </Stepper.Step>
          <Stepper.Step label='Extra Section' icon={<IconTableOptions />}>
            <Box sx={{ maxWidth: 500 }} mx='auto'>
              <DragDropContext
                onDragEnd={({ destination, source }) =>
                  form.reorderListItem('custom', {
                    from: source.index,
                    to: destination.index,
                  })
                }
              >
                <Droppable droppableId='dnd-list' direction='vertical'>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {customFiels}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <Group position='center' mt='md'>
                <Button
                  onClick={() =>
                    form.insertListItem('custom', {
                      title: '',
                      body: '',
                    })
                  }
                >
                  Add Section
                </Button>
              </Group>
            </Box>
          </Stepper.Step>
          <Stepper.Step label='SeLect Template' icon={<IconTemplate />}>
            <SegmentedControl
              transitionDuration={500}
              transitionTimingFunction='linear'
              orientation='vertical'
              color='orange'
              fullWidth
              radius={20}
              data={[
                {
                  value: 'template 1',
                  label: (
                    <div
                      style={{
                        width: 240,

                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    >
                      <Image
                        radius='md'
                        src={template1}
                        alt='Template 1'
                        caption='Template 1'
                      />
                    </div>
                  ),
                },
                {
                  value: 'template 2',
                  label: (
                    <div
                      style={{
                        width: 240,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    >
                      <Image
                        radius='md'
                        src={template2}
                        alt='Template 2'
                        caption='Template 2'
                      />
                    </div>
                  ),
                },
              ]}
              {...form.getInputProps('template.template')}
            />
          </Stepper.Step>
          <Stepper.Completed>
            {' '}
            <Title order={4} align='center' pb={2}>
              Awesome Job Your Pdf CV Has Now Been Successfully Built
            </Title>
            <div
              style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}
            >
              <Image radius='md' src={svgImageCv} alt='bunner image' pt='lg' />
            </div>
            <Center pt='lg'>
              <Button
                color='orange'
                radius='xl'
                onClick={bunnerHandler}
                to='/pdf_review'
              >
                Preview
              </Button>
            </Center>
          </Stepper.Completed>
        </Stepper>
        <Group position='right' mt='xl'>
          {active !== 0 && (
            <Button variant='default' onClick={prevStep}>
              Back
            </Button>
          )}
          {active !== 7 && <Button onClick={nextStep}>Next step</Button>}
        </Group>
        <Space h='md' />
        {/*  <Text size='sm' weight={500} mt='md'>
          Form values:
        </Text>
        <Code block>{JSON.stringify(form.values, null, 2)}</Code> */}
        <Modal
          centered
          opened={opened}
          onClose={() => setOpened(false)}
          title='Hurray!'
          size='md'
        >
          <>
            <div
              style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}
            >
              <Image radius='md' alt='download burner' src={svgImageDownload} />
            </div>
            <Title order={3} align='center'>
              Free Credits Remaining
            </Title>
            <Title order={4} weight={100} align='center'>
              1/2
            </Title>
            <Text color='dimmed' size='md' align='center' pt='lg'>
              {' '}
              You get free CV Builder credits every month
            </Text>
            <Text color='dimmed' size='md' align='center' pt='lg'>
              {' '}
              Get unlimited access with a Subscription
            </Text>
            <Text color='dimmed' size='md' align='center' pt='lg'>
              {' '}
              Invite a friend and recieve a free CV
            </Text>
            <Stack align='center' pt='xl'>
              <Button color='orange' radius='xl'>
                Subscribe!
              </Button>
              <BrowserView>
                <Button radius='xl' component={Link} to='/pdf_Review'>
                  Continue to preview
                </Button>
              </BrowserView>
              <MobileView>
                <Button radius='xl' component={Link} to='/pdf_Review'>
                  Continue to download
                </Button>
              </MobileView>
            </Stack>
          </>
        </Modal>
      </Container>
    </>
  )
}

export default Home

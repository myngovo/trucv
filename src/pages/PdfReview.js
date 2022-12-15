import React, { useEffect, useState } from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  PDFViewer,
  Link,
  PDFDownloadLink,
} from '@react-pdf/renderer'

import { Container, Divider, Space } from '@mantine/core'

import { BrowserView, MobileView } from 'react-device-detect'

const PdfReview = () => {
  const [data, setData] = useState([])
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [experience, setExperience] = useState([])
  const [professionalSummary, setProfessionalSummary] = useState('')
  const [education, setEducation] = useState([])
  const [skills, setSkills] = useState([])

  const regex = /(<([^>]+)>)/gi

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user-cv'))
    if (data) {
      setData(data)
      setFirstName(data.personalDetails.firstName)
      setSecondName(data.personalDetails.secondName)
      setEmail(data.personalDetails.email)
      setPhone(data.personalDetails.phone)
      setExperience(data.experience)
      setProfessionalSummary(data.professionalSummary.summary)
      setEducation(data.education)
      setSkills(data.skills)
    }
  }, [])

  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  })

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Oswald',

      marginBottom: 10,
      textTransform: 'uppercase',
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },

    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
    },
    header: {
      WebkitTransform: 'rotate(331deg)',
      MozTransform: 'rotate(331deg)',
      OTransform: 'rotate(331deg)',
      transform: 'rotate(331deg)',
      fontSize: 28,
      color: 'rgba(255, 5, 5, 0.17)',
      position: 'absolute',
      fontFamily: 'Times-Roman',
      textTransform: 'uppercase',
      paddingLeft: '20%',
      paddingTop: '30%',
    },
    container: {
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: '#112131',
      borderBottomStyle: 'solid',
      alignItems: 'stretch',
      marginBottom: 10,
    },
    detailColumn: {
      flexDirection: 'column',
      flexGrow: 9,
      textTransform: 'uppercase',
    },
    linkColumn: {
      flexDirection: 'column',
      flexGrow: 2,
      alignSelf: 'flex-end',
      justifySelf: 'flex-end',
    },
    name: {
      fontSize: 24,
      fontFamily: 'Lato Bold',
    },
    subtitle: {
      fontSize: 10,
      justifySelf: 'flex-end',
      fontFamily: 'Lato',
      textTransform: 'lowercase',
    },
    link: {
      fontFamily: 'Lato',
      fontSize: 10,
      color: 'black',
      textDecoration: 'none',
      alignSelf: 'flex-end',
      justifySelf: 'flex-end',
    },

    item: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    bulletPoint: {
      width: 10,
      fontSize: 10,
    },
    itemContent: {
      flex: 1,
      fontSize: 10,
      fontFamily: 'Lato',
    },
  })

  console.log(data)

  Font.register({
    family: 'Open Sans',
    src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
  })

  Font.register({
    family: 'Lato',
    src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
  })

  Font.register({
    family: 'Lato Italic',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
  })

  Font.register({
    family: 'Lato Bold',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
  })

  const Title = ({ children }) => <Text style={styles.title}>{children}</Text>
  const List = ({ children }) => children

  const SkillsList = ({ skill, evidenceOfSkill }) => (
    <View>
      <Text style={{ fontSize: '11' }}>{skill}</Text>
      <View style={styles.item}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.itemContent}>{evidenceOfSkill}</Text>
      </View>
    </View>
  )

  const Education = ({ school, degree, study, endDate, startDate }) => (
    <View style={{ paddingBottom: '20px' }}>
      <Text
        style={{
          color: '#000',
          fontSize: '13',
        }}
      >
        {school}
      </Text>
      <Text style={{ fontSize: '9', color: '#959ba6', paddingBottom: '5' }}>
        {new Date(startDate).toLocaleDateString()} -{' '}
        {new Date(endDate).toLocaleDateString()}
      </Text>
      <Text style={{ fontSize: '11' }}>{study}</Text>
      <Text style={{ fontSize: '11', marginLeft: '15px', marginTop: '4' }}>
        {degree}
      </Text>
    </View>
  )

  const EmploymentHistoryItem = ({
    deliverables,
    employer,
    endDate,
    jobTitle,
    startDate,
  }) => (
    <View style={{ paddingBottom: '20px' }}>
      <Text
        style={{
          color: '#000',
          fontSize: '13',
        }}
      >
        {employer}
      </Text>
      <Text style={{ fontSize: '9', color: '#959ba6', paddingBottom: '5' }}>
        {new Date(startDate).toLocaleDateString()} -{' '}
        {new Date(endDate).toLocaleDateString()}
      </Text>
      <Text style={{ fontSize: '11' }}>{jobTitle}</Text>
      <View style={styles.item}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.itemContent}>{deliverables}</Text>
      </View>
    </View>
  )
  const Resume = () => (
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        TruCv by myNGOVO
      </Text>
      <View style={styles.container}>
        <View style={styles.detailColumn}>
          <Text style={styles.name}>
            {' '}
            {firstName} {secondName}
          </Text>
          <Text style={styles.subtitle}>
            {' '}
            {email} {phone}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Title>Career Summary</Title>
      </View>
      <Text style={styles.text}>{professionalSummary.replace(regex, '')}</Text>
      <View style={styles.container}>
        <Title>Experience</Title>
      </View>
      <View>
        {experience.map((experience) => (
          <EmploymentHistoryItem
            key={experience.key}
            deliverables={experience.deliverables.replace(regex, '')}
            employer={experience.employer}
            jobTitle={experience.jobTitle}
            startDate={experience.startDate}
            endDate={experience.endDate}
          />
        ))}
      </View>
      <View style={styles.container}>
        <Title>Education</Title>
      </View>
      <View>
        {education.map((education) => (
          <Education
            key={education.key}
            school={education.school}
            study={education.study}
            degree={education.degree}
            startDate={education.startDate}
            endDate={education.endDate}
          />
        ))}
      </View>
      <View style={styles.container}>
        <Title>Relevant Skills</Title>
      </View>
      <View>
        {skills.map((skill) => (
          <SkillsList
            key={skill.key}
            skill={skill.skill}
            evidenceOfSkill={skill.evidenceOfSkill.replace(regex, '')}
          />
        ))}
      </View>
    </Page>
  )
  return (
    <Container size='xl' pt='xl'>
      <Space h='xl' />

      <BrowserView style={{ height: '100vh' }}>
        <PDFViewer height='90%' width='100%'>
          <Document
            author='TruCV by myNGOVO'
            keywords='awesome, resume'
            subject='The resume of '
            title='Resume'
          >
            <Resume size='A4' />
          </Document>
        </PDFViewer>
      </BrowserView>
      <MobileView>
        <PDFDownloadLink
          document={
            <Document
              author='TruCV by myNGOVO'
              keywords='awesome, resume'
              subject='The resume of '
              title='Resume'
            >
              <Resume size='A4' />
            </Document>
          }
          fileName='somename.pdf'
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
      </MobileView>
    </Container>
  )
}

export default PdfReview

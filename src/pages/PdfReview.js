import React, { useState, useEffect } from 'react'
import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  View,
} from '@react-pdf/renderer'
import Divider from '../components/Divider'

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
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})

export const ExperienceHistoryItem = ({
  deliverables,
  jobTitle,
  employer,
  startDate,
  endDate,
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
      {startDate} to {endDate}
    </Text>
    <Text style={{ fontSize: '11' }}>{jobTitle}</Text>
    <Text style={{ fontSize: '11', marginLeft: '15px', marginTop: '4' }}>
      {deliverables}
    </Text>
  </View>
)

export const EducationHistoryItem = ({
  degree,
  school,
  employer,
  startDate,
  endDate,
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
      {startDate} to {endDate}
    </Text>
    <Text style={{ fontSize: '11' }}>{school}</Text>
    <Text style={{ fontSize: '11', marginLeft: '15px', marginTop: '4' }}>
      {degree}
    </Text>
  </View>
)

export const ExperienceHistory = ({ items }) => (
  <View style={{ paddingTop: '20px' }}>
    <Text
      style={{
        color: '#000',
        fontSize: '15',
      }}
    >
      Employment History
    </Text>
    <Divider />
    {items.map((item, index) => (
      <ExperienceHistoryItem
        key={index}
        employer={item.employer}
        jobTitle={item.jobTitle}
        startDate={item.startDate}
        endDate={item.endDate}
        description={item.description}
        deliverables={item.deliverables}
      />
    ))}
  </View>
)

export const EducationHistory = ({ items }) => (
  <View style={{ paddingTop: '20px' }}>
    <Text
      style={{
        color: '#000',
        fontSize: '15',
      }}
    >
      Education
    </Text>
    <Divider />
    {items.map((item, index) => (
      <ExperienceHistoryItem
        key={index}
        school={item.school}
        degree={item.degree}
        startDate={item.startDate}
        endDate={item.endDate}
        description={item.description}
        deliverables={item.deliverables}
      />
    ))}
  </View>
)

const PdfReview = () => {
  const [data, setData] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [items, setItems] = useState([])
  const [professionalSummary, setProfessionalSummary] = useState('')
  const [education, setEducation] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user-cv'))

    if (data) {
      setData(data)
      setFirstName(data.personalDetails.firstName)
      setSecondName(data.personalDetails.secondName)
      setEmail(data.personalDetails.email)
      setPhone(data.personalDetails.phone)
      setItems(data.experience)
      setProfessionalSummary(data.professionalSummary.summary)
      setEducation(data.education)
    }
  }, [])

  console.log(items)

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text style={styles.header} fixed>
          ~ Created with myNGOVO CV Builder ~
        </Text>
        <Text style={styles.title}>
          {firstName} {secondName}
        </Text>
        <Text style={styles.author}>
          {email} {phone}
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: '15',
          }}
        >
          Career Summary
        </Text>
        <Divider />
        <Text style={{ fontSize: '11', marginLeft: '15px', marginTop: '4' }}>
          {professionalSummary}
        </Text>

        <Text style={styles.text}></Text>
        <ExperienceHistory items={items} />
        <EducationHistory items={education} />
      </Page>
    </Document>
  )

  return (
    <div>
      <PDFViewer
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
        }}
      >
        <MyDocument />
      </PDFViewer>
    </div>
  )
}

export default PdfReview

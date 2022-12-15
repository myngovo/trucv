import React, { useEffect, useState } from 'react'
import { Button } from '@mantine/core'

const ResumeDownload = () => {
  const [data, setData] = useState([])
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

  const handleClick = () => {}

  return (
    <div>
      <Button radius='xl' onClick={handleClick}>
        Continue to preview
      </Button>
    </div>
  )
}

export default ResumeDownload

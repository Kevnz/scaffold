import React, { useRef, useState } from 'react'
import { TextArea, TextBox, Hidden, Form } from 'react-form-elements'
import { Section, Title, ConfirmButton } from '@brightleaf/elements'

const ContactForm = () => {
  const formRef = useRef()
  const [formVals, setFormVals] = useState({
    userName: '',
    email: '',
    message: '',
  })
  return (
    <Section>
      <Title>Contact</Title>

      <Form
        name="contact"
        onSubmit={values => {
          console.log('The form onform submit', values)
          setFormVals(values)
        }}
        ref={formRef}
      >
        <TextBox
          name="userName"
          label="Your Name"
          initialValue=""
          className="field control"
          labelClassName="label"
          inputClassName="input"
        />
        <TextBox
          type="email"
          name="userEmail"
          label="Your Email"
          initialValue=""
          className="field control"
          labelClassName="label"
          inputClassName="input"
        />
        <TextArea
          label="Your Message"
          name="message"
          className="field control"
          labelClassName="label"
          inputClassName="textarea"
        />
        <Hidden name="form-name" initialValue="contact" />

        <ConfirmButton
          title="Please Confirm"
          question="Are you sure you want to send the message?"
          onConfirm={e => {
            formRef.current.submit()
          }}
          onCancel={() => {
            formRef.current.reset()
          }}
        >
          Send
        </ConfirmButton>
      </Form>
    </Section>
  )
}

export default ContactForm

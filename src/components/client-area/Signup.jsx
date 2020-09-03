import React, { useState, useEffect } from 'react'
import { FormField, FormFieldPassword } from './formField'
import { FormButton } from '../Button'
import { usernameCheck, emailCheck, passwordCheck } from './formChecks'


export function SignUp({onSubmit, submitting }){
  const [ formData, setFormData ] = useState({
    username: null,
    email: null,
    password: null
  })

  const [field, setField ] = useState({})

  useEffect(() => {
    setFormData({...formData, ...field})
    // eslint-disable-next-line
  }, [field, JSON.stringify(formData)])


  function handleUpdate(formField){
    setField(formField)
  }

  function submitForm(e){
    e.preventDefault()
    if(Object.values(formData).indexOf('') === -1){
      submitting(true)
      onSubmit( formData, 'sign-up')
    } else {
      submitting(false)
    }
  }

  return (
    <form
      className="p-6 md:p-10"
    >
      <FormField
        name="username"
        label="Username"
        validate={usernameCheck}
        onUpdate={handleUpdate}
      />
      <FormField
        name="email"
        label="Email address"
        validate={emailCheck}
        onUpdate={handleUpdate}
      />
      <FormFieldPassword
        validate={passwordCheck}
        onUpdate={handleUpdate}
      />
      <FormButton
        submit={submitForm}
      >
        Sign up
      </FormButton>
    </form>
  )
}
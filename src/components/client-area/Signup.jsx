import React, { useState, useEffect } from 'react'
import { FormField, FormFieldPassword } from './formField'
import { FormButton } from '../Button'
import { usernameCheck, emailCheck, passwordCheck } from './formChecks'


export function SignUp({onSubmit}){
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
      console.log(formData)
      onSubmit(true)
    } else {
      console.log('Invalid form credentials')
      onSubmit(false)
    }
  }

  return (
    <form
      className="p-6 md:p-10"
    >
      <FormField name="username" label="Username" validate={usernameCheck} onUpdate={handleUpdate}> </FormField>
      <FormField name="email" label="Email address" validate={emailCheck} onUpdate={handleUpdate}> </FormField>
      <FormFieldPassword validate={passwordCheck} onUpdate={handleUpdate}></FormFieldPassword>
      <FormButton submit={submitForm} > Sign up </FormButton>
    </form>
  )
}
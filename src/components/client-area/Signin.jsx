import React, { useState, useEffect } from 'react'
import { FormField, FormFieldPassword } from './formField'
import { FormButton as Button} from '../Button'
import { passwordCheck, emailCheck} from './formChecks'

export function SignIn({submitting, onSubmit}){
  const [ field, setField ] = useState({})
  const [ formData, setFormData ] = useState({
    email: null,
    password: null
  })

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
      onSubmit(formData, 'sign-in')
    } else {
      submitting(false)
    }
  }

  return (
    <form className="p-6 md:p-10">
      <FormField label="Email address" name="email" validate={emailCheck} onUpdate={handleUpdate} />
      <FormFieldPassword validate={passwordCheck} onUpdate={handleUpdate} />
      <Button submit={submitForm}> Sign in </Button>
    </form>
  )
}
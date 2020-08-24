import React, { useState, useEffect } from 'react'
import { FormField, FormFieldPassword } from './formField'
import { FormButton as Button} from '../Button'
import { passwordCheck, usernameCheck } from './formChecks'

export function SignIn({onSubmit}){
  const [ field, setField ] = useState({})
  const [ formData, setFormData ] = useState({
    username: null,
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
      console.log(formData)
      onSubmit(true)
    } else {
      console.log('Invalid form credentials')
      onSubmit(false)
    }
  }



  return (
    <form className="p-6 md:p-10">
      <FormField label="Username" name="username" validate={usernameCheck} onUpdate={handleUpdate} />
      <FormFieldPassword validate={passwordCheck} onUpdate={handleUpdate} />
      <Button submit={submitForm}> Sign in </Button>
    </form>
  )
}
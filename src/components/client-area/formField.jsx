import React, {useEffect, useState} from 'react'

export function FormField ({name, label, validate, onUpdate}){
  const [error, setError] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    handleChange(value)
    // eslint-disable-next-line
  }, [value])

  function handleChange(v){
    let caught = v && validate(v).error
    setError(caught)
    onUpdate({[name]: caught ? '' : value})
  }

  return (
    <div
      className="flex flex-col font-projSans mb-6"
    >
      <label htmlFor={name} className="text-proj-logoDarkBlue mb-2 text-base font-semibold"> {label} <span className="text-sm text-proj-failed font-bold">*</span> </label>
      <input
        id={name}
        type={name}
        autoComplete="off"
        className="py-3 px-4 text-sm bg-gray-100 rounded"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      {
        error && <p className="text-proj-failed font-semibold text-sm pt-2 flex items-center">
        <i className="material-icons text-sm mr-1"> cancel </i>
       {error}</p>
      }
    </div>
  )
}

export function FormFieldPassword ({validate, onUpdate}){
  const [visible, setVisibility] = useState(false)
  const [error, setError] = useState(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    handleChange(value)
    // eslint-disable-next-line
  }, [value])

  function handleChange(v){
    let caught = v && validate(v).error
    setError(caught)
    onUpdate({password: caught ? '' : value})
  }

  return (
    <div
      className="flex flex-col font-projSans"
    >
      <label htmlFor="password" className="text-proj-logoDarkBlue mb-2 text-base font-semibold"> Password <span className="text-sm text-proj-failed font-bold">*</span> </label>
      <div
        className="w-full relative"
      >
        <input
          id="password"
          type={visible ? 'text' : 'password'}
          autoComplete="off"
          className="py-3 px-4 text-sm bg-gray-100 rounded w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <i
          className="material-icons absolute pt-2 text-3xl text-proj-buttonBlue pr-3 inset-y-0 right-0 cursor-pointer"
          onClick={() => setVisibility(!visible)}
        >
          { visible ? 'visibility_off' : 'visibility'}
        </i>
      </div>
      {
        error && <p className="text-proj-failed font-semibold text-sm pt-2 flex items-center">
        <i className="material-icons text-sm mr-1"> cancel </i>
       {error}</p>
      }
    </div>
  )
}
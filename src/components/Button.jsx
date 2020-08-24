import React from 'react'
import { Link } from 'react-router-dom'


export function CallToAction({route, children}){
  return (
    <Link to={route}>
      <button
        className="flex transition-colors duration-100 items-center justify-around bg-proj-buttonBlue rounded text-white px-6 py-2 hover:bg-blue-600"
      >
        {children}
        <i className="material-icons ml-3"> chevron_right </i>
      </button>
    </Link>
  )
}

export function CallToActionOutlined({route, children}){
  return (
    <Link to={route || '/'}>
      <button
        className="flex transition-colors duration-100 items-center justify-center border-white border-2 hover:bg-blue-100 hover:bg-opacity-25 rounded text-white px-6 py-2"
      >
        {children}
          <i className="material-icons w-3 ml-3"> arrow_circle_down </i>
      </button>
    </Link>
  )
}

export function FormButton({submit, children}){
  return (
    <button
      className="w-full mt-8 transition-colors duration-100 bg-proj-buttonBlue hover:bg-blue-600 rounded text-white py-2"
      onClick={(e) => submit(e)}
    >
        {children}
    </button>
  )
}

export function MailButton({route, bg, hover, text, children}){
  return (
    <Link to={route}>
      <button
        className={`flex transition-colors duration-100 items-center justify-around bg-${bg} rounded text-${text} px-6 py-2 hover:bg-${hover}`}
      >
        {children}
        <i className="material-icons ml-3"> mail </i>
      </button>
    </Link>
  )
}
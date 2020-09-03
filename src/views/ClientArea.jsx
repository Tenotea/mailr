import React, { useContext, useState } from 'react'
import { SignUp } from '../components/client-area/Signup'
import { SignIn } from '../components/client-area/Signin'
import { Overlay, AlertBoxBaseTheme } from '../components/Overlay'
import googleSignin from '../assets/images/google_signin.png'
import axios from 'axios'
import { Redirect, useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../App'
import Loader from '../components/Loader'

function directToOAuth () {
  window.location.href = 'http://localhost:8000/oauth'
}

export function ClientArea (props){
  const location = useLocation()

  // Local States
  const [active, setActive] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [oauthError, setOauthError ] = useState(location.search.split('=')[1])

  // Context
  const { currentUser, setAuthStatus } = useContext(CurrentUserContext)

  // Api Call. Change in production
  const handleFormSubmit = (credentials, route) => {
    axios.post(`http://localhost:8000/${route}`, credentials, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }).then( body => {
      setSubmitting(false)
      if(body.data.type === 'error'){
        setSubmitError(body.data.msg)
      } else {
        setAuthStatus(Math.random())
        setSubmitSuccess(true)
      }
    }, () => {
      setSubmitError('Could not establish connection. Server may be down or check your internet connection and try again')
      setSubmitting(false)
    })
  }

  if( submitSuccess || currentUser ) return <Redirect to="/accpanel" />

  return (
    <section
      className="pt-24 min-h-screen bg-gray-100 px-5"
      style={{minWidth: 260}}
    >
      <div
        className="bg-white max-w-2xl mx-auto relative"
        >
        { submitting && <Overlay position="absolute"> <Loader> </Loader> </ Overlay> }
        { (submitError || oauthError) &&
          <Overlay position="absolute">
            <AlertBoxBaseTheme message={ submitError || decodeURIComponent(oauthError) } resetAction={()=>{
              setOauthError(null)
              setSubmitError(null)
            }} />
          </Overlay>
        }

        {/* Tab Header */}
        <div
          className="flex items-center justify-evenly"
        >
          {
            ['sign in', 'sign up'].map((tab, i) => {
              return (
                <div
                  key={i}
                  className={`w-full text-center py-3 text-md capitalize cursor-pointer border-b-4 font-projSans ${active === i && 'border-proj-buttonBlue text-proj-buttonBlue font-bold'}`}
                  onClick={() => setActive(i)}
                >
                  {tab}
                </div>
              )
            })
          }
        </div>

        {/* Tab body */}
        {
          active === 1
          ? <SignUp onSubmit={ handleFormSubmit } submitting={ setSubmitting } />
          : <SignIn onSubmit={ handleFormSubmit } submitting={ setSubmitting } />
        }

        <div className="pb-6 relative w-full">
          <img src={googleSignin} className="block mx-auto" alt="mailr_google_signin" onClick={() => directToOAuth()} />
        </div>
      </div>

    </section>
  )
}
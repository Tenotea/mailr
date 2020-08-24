import React, { useState } from 'react'
import { SignUp } from '../components/client-area/Signup'
import { SignIn } from '../components/client-area/Signin'
import Overlay from '../components/client-area/overlay'
import googleSignin from '../assets/images/google_signin.png'

export function ClientArea (props){
  const [active, setActive] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  return (
    <section
      className="pt-24 min-h-screen bg-gray-100 px-5"
      style={{minWidth: 260}}
    >
      <div className="mb-10 max-w-2xl mx-auto relative cursor-pointer">
        <a href="http://localhost:8000/oauth" target="_blank" rel="noopener noreferrer">
          <img src={googleSignin} className="block" alt="mailr_google_signin" />
        </a>
      </div>
      <div
        className="bg-white max-w-2xl mx-auto relative"
        >
        { submitting && < Overlay> Verifying </ Overlay> }

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
          ? <SignUp onSubmit={ setSubmitting } />
          : <SignIn onSubmit={ setSubmitting } />
        }

      </div>
    </section>
  )
}
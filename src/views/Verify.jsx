import React, { useState, useEffect, useContext } from 'react'
import { useParams, Redirect, Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { AlertActionButton } from '../components/Overlay'
import { CurrentUserContext, _globAxios } from '../App'

export function VerificationStatusIconSuccess() {
  return (
    <div>
      <svg width="100" height="100" className="p-2" viewBox="0 0 208 208" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filterCircle)">
        <circle cx="104" cy="100" r="96.5" className="status-svg-circle" stroke="#00883F" strokeWidth="12"/>
        </g>
        <g filter="url(#filterTick)">
        <path d="M57 95.3474L93.6568 126L162 74" className="status-svg-tick" stroke="#00883F" strokeWidth="12"/>
        </g>
        <defs>
          <filter id="filterCircle" x="0" y="0" width="400" height="400" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.545833 0 0 0 0 0.545833 0 0 0 0 0.545833 0 0 0 0.45 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
          </filter>
          <filter id="filterTick" x="50.7548" y="71.2146" width="117.365" height="67.2617" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.720833 0 0 0 0 0.720833 0 0 0 0 0.720833 0 0 0 0.47 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export function VerificationStatusIconFailed() {
  return (
    <div>
      <svg width="100" height="100" className="p-2" viewBox="0 0 208 208" fill="none" xmlns="http://www.w3.org/2000/svg" style={{perspective: 2000}}>
        <g filter="url(#filter0_d)">
          <circle cx="104" cy="100" r="96.5" className="status-svg-circle" stroke="#E81D1D" strokeWidth="12"/>
        </g>
        <g filter="url(#filter1_d)">
          <line x1="66.5251" y1="133.236" className="status-svg-cancel-stroke-1" x2="137.236" y2="62.5251" stroke="#E81D1D" strokeWidth="12"/>
        </g>
        <g filter="url(#filter2_d)">
          <line x1="71.4749" y1="62.5251" className="status-svg-cancel-stroke-2" x2="142.186" y2="133.236" stroke="#E81D1D" strokeWidth="12"/>
        </g>
      <defs>
        <filter id="filter0_d" x="0" y="0" width="208" height="208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.2875 0 0 0 0 0.2875 0 0 0 0 0.2875 0 0 0 0.47 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        <filter id="filter1_d" x="60.0502" y="60.0503" width="83.6604" height="83.6604" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.2875 0 0 0 0 0.2875 0 0 0 0 0.2875 0 0 0 0.47 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        <filter id="filter2_d" x="65" y="60.0503" width="83.6604" height="83.6604" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.2875 0 0 0 0 0.2875 0 0 0 0 0.2875 0 0 0 0.47 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
      </svg>
    </div>
  )
}

function startVerfication(userid, token, setResponseFunction, setErrorFunction, setAuthStatus){
  setResponseFunction(null)
  setErrorFunction(null)
  _globAxios.get(`/verify-email/${userid}/${token}`, {
    withCredentials: true
  }).then(body => {
    setResponseFunction(body.data)
    if(body.data.type === 'success') {
      setAuthStatus(Math.random())
    }
  }, (error) => {
    setErrorFunction('Could not connect to the server. Server might be down or check your internet connection')
  })
}

function responseMessage(responseBody){
  if(responseBody.type === 'success'){
    return 'Verification success!'
  } else {
    return responseBody.msg
  }
}

function actionButton(action, userid, token, setResponseFunction, setErrorFunction){
  if(action === 'alert'){
    return null
  } else if( action === 'alert and try again') {
    return <AlertActionButton resetAction={() => startVerfication(userid, token, setResponseFunction, setErrorFunction)} actionIcon="refresh" actionText="Try Again" />
  } else if(action === 'alert and redirect'){
    return <Redirect to="/accpanel" />
  } else if(action === 'alert and generate') {
    return (
     <Link to="/activation/link">
       <AlertActionButton actionIcon="refresh" actionText="Resend activation link" />
     </Link>
    )
  } else if(!action){
    return (
      <Link to="/accpanel">
        <AlertActionButton actionText="Go to Account Panel" actionIcon={null}> </AlertActionButton>
      </Link>
    )
  } else {
    return null
  }
}

function VerificationBody({StatusIcon, message, action}){
  return (
    <div
      className="w-full h-full flex items-center justify-around flex-col px-5 md:px-10 xl:px-16"
    >
    <StatusIcon />
      <p className="text-xl font-projSans text-center mt-5 mb-10">
        { message }
      </p>
      { action() }
    </div>
  )
}

export function Verification(props) {
  const [ verificationReport, setVerificationReport ] = useState(null)
  const [ fetchError, setFetchError ] = useState(null)
  const params = useParams()
  const { setAuthStatus } = useContext(CurrentUserContext)

  useEffect(() => {
    startVerfication(params.userid, params.token, setVerificationReport, setFetchError, setAuthStatus)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main
      className="w-full min-h-screen bg-gray-200 flex items-center justify-center"
    >
      <div
        className="bg-white w-full flex items-center justify-center"
        style={{ maxWidth: 800, minHeight: 400 }}
      >
        {
          (!verificationReport && !fetchError)
          ? <Loader> </Loader>
          : verificationReport
          ? <VerificationBody
              StatusIcon={verificationReport.type === 'error' ?  VerificationStatusIconFailed : VerificationStatusIconSuccess }
              message={responseMessage(verificationReport)}
              action={() => actionButton(verificationReport.action, params.userid, params.token, setVerificationReport, setFetchError) }
            />
          : <VerificationBody
              StatusIcon={ VerificationStatusIconFailed }
              message={fetchError}
              action={() => actionButton('alert and try again', params.userid, params.token, setVerificationReport, setFetchError) }
            />
        }
      </div>
    </main>
  )
}

import React, {useContext, useEffect, useState} from 'react'
import { CurrentUserContext } from '../App'
import { VerificationStatusIconSuccess, VerificationStatusIconFailed } from './Verify'
import Loader from '../components/Loader'
import { Link, Redirect, Switch, Route, useRouteMatch } from 'react-router-dom'
import axios from 'axios'

function ActivationBody({type, children}){
  return (
    <>
      { (type === 'success' || type === 'sent') ? <VerificationStatusIconSuccess /> : <VerificationStatusIconFailed /> }
      <p className="text-lg md:text-xl font-projSans my-10 animate__animated animate__fadeIn">
        { children }
      </p>
      { type === 'success' && <p> Didn't get the link? <Link to="/activation/link" className="text-proj-buttonBlue underline"> Resend activation link </Link> </p> }
    </>
  )
}

function renderController(currentuser, currentuserresponse){
  if(currentuser && !currentuser.verified){
    return (
      <ActivationBody type="success">
         Welcome to MailR <b>{currentuser.username}</b>, A verification link has been sent to <b>{currentuser.email}</b>. Please click on the link sent to your email address
          to activate your account and gain access to our services.
      </ActivationBody>
    )
  } else if( currentuserresponse === 'error') {
    return (
      <ActivationBody type="error">
        Could not establish connection. Server may be down or check your internet connection and try again
      </ActivationBody>
    )
  } else if( currentuserresponse && currentuserresponse.type === 'error'){
    return (
      <ActivationBody type="error"> {currentuserresponse.msg} </ActivationBody>
    )
  } else {
    return <Loader />
  }
}

function ResendActivationLink(){
  const [activationLink, setActivationLink] = useState(null)
  const [ fetchError, setFetchError ] = useState(null)

  function fetchActivationLink(){
    setActivationLink(null)
    setFetchError(null)
    axios.get(`http://localhost:8000/activation-link/`, {
      withCredentials: true
    }).then( body => {
      body.data.type === 'success' ? setActivationLink(body.data.content) : setFetchError(body.data.msg)
    }, activationLinkError => {
      setFetchError('Could not establish connection. Server may be down or check your internet connection and try again')
    })
  }

  useEffect(() => {
    fetchActivationLink()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(fetchError){
    return <ActivationBody type="failed">
      {fetchError}
    </ActivationBody>
  }

  if(activationLink){
    return <ActivationBody type="sent">
      { activationLink.message }
    </ActivationBody>
  }

  if(!fetchError && !activationLink){
    return <Loader />
  }
}

function Activation(){
  const { currentUser, currentUserResponse } = useContext(CurrentUserContext)
  const { path } = useRouteMatch()

  if(currentUser && currentUser.verified){
    return <Redirect to="/accpanel"></Redirect>
  }

  return (
    <main
      className="w-full min-h-screen bg-gray-100 flex items-center justify-center"
    >
      <div
        className="w-11/12 bg-white flex flex-col text-center items-center justify-evenly p-5 md:p-10 xl:p-16"
        style={{minHeight: 400, maxWidth: 800}}
      >
        <Switch>
          <Route exact path={path}>
            { renderController(currentUser, currentUserResponse) }
          </Route>
          <Route exact path={`${path}/link`}>
            <ResendActivationLink />
          </Route>
        </Switch>
      </div>
    </main>
  )
}

export default Activation
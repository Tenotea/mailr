import React, {useState, useEffect} from 'react'
import { Header } from './components/nav/Header'
import { Home } from './views/Home'
import { ClientArea } from './views/ClientArea'
import  Activation  from './views/Activation'
import { Verification } from './views/Verify'
import { AccountPanel } from './views/AccountPanel'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'

export const _globAxios = axios.create({
  baseURL: 'https://mair-proto.herokuapp.com/',
  withCredentials: true
})
export const CurrentUserContext = React.createContext({})

function CurrentUserContextProvider({children}){
  const [currentUser, setCurrentUser] = useState(undefined)
  const [authStatus, setAuthStatus] = useState(false)

  useEffect(() => {
    setCurrentUser(false)
    fetchUser()
  },[authStatus])

  function fetchUser(){
    _globAxios.get('/status/current-user')
    .then( body => {
      setCurrentUser(body.data)
    }, (error => {
      setCurrentUser('error')
      console.log(error)
    }))
  }

  return (
    <CurrentUserContext.Provider value={
      {
        currentUser: currentUser && currentUser.content, 
        currentUserResponse: currentUser, 
        setAuthStatus, 
        fetchUser
      }
    }>
      {children}
    </CurrentUserContext.Provider>
  )
}

function App(){
  return (
    <CurrentUserContextProvider>
      <main className="main min-h-screen w-full bg-gray-300 mx-auto" style={{maxWidth: '2000px', minWidth: 250, scrollBehavior: 'smooth'}}>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/client-area">
              <ClientArea></ClientArea>
            </Route>
            <Route path="/activation">
              <Activation></Activation>
            </Route>
            <Route exact path="/verify/:userid/:token">
              <Verification></Verification>
            </Route>
            <Route exact path="/accpanel">
              <AccountPanel></AccountPanel>
            </Route>
          </Switch>
        </Router>
      </main>
    </CurrentUserContextProvider>
  )
}

export default App

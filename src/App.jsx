import React, {useState, useEffect} from 'react'
import { Header } from './components/nav/Header'
import { Home } from './views/Home'
import { ClientArea } from './views/ClientArea'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AccountPanel } from './views/AccountPanel'
import axios from 'axios'

export const CurrentUserContext = React.createContext({})

function CurrentUserContextProvider({children}){
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    axios.get('http://localhost:8000/status/current-user', {withCredentials: true})
    .then( body => {
      setCurrentUser(body.data.content)
      console.log(body);
    }, (error => {
      console.log(error)
    }))
  },[])

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
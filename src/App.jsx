import React from 'react'
import { Header } from './components/nav/Header'
import { Home } from './views/Home'
import { ClientArea } from './views/ClientArea'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AccountPanel } from './views/AccountPanel'


function App(){
  return (
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
  )
}

export default App
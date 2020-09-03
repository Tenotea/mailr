import React, { useState, useContext } from 'react'
import { CallToAction } from '../Button'
import { SideNav } from './SideNav'
import { Link } from 'react-router-dom'
import { AccountNav, NavAvatar } from './AccountNav'
import { CurrentUserContext  } from '../../App'
import { Overlay, AlertBoxBaseTheme } from '../Overlay'

export const navItems = [
  {
    id: '1',
    name: 'Home',
    route: '/',
    icon: 'home'
  },
  {
    id: '2',
    name: 'About',
    route: '/#about',
    icon: 'description'
  },
  {
    id: '3',
    name: 'Contact',
    route: '/#contact',
    icon: 'contact_page'
  },
]

export function SiteLogo(){
  return(
    <div
      className="site-name text-proj-logoDarkBlue font-projTitle text-2xl relative py-1 px-3"
      style={{width: 'fit-content'}}
    >
      <span className="h-5 w-8 inline-block absolute right-0 top-0 bg-transparent border-2 border-proj-logoDarkBlue border-b-0 border-l-0"></span>
    MailR
      <span className="h-5 w-8 inline-block absolute bottom-0 left-0 bg-transparent border-2 border-proj-logoDarkBlue border-t-0 border-r-0"></span>
    </div>
  )
}

function Header(props){
  const [sideNav, setSideNav] = useState(false)
  let toggleSideNav = () => setSideNav(!sideNav)

  const [accountNav, setAccountNav] = useState(false)
  let toggleAccountNav = () => setAccountNav(!accountNav)

  const { currentUser, currentUserResponse, setAuthStatus } = useContext(CurrentUserContext)

  let accountNavDecision = () => {
    if( !currentUserResponse ){
      return (
        <div className="flex h-4 items-center justify-center w-4 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-proj-orangeCorners opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-400"></span>
        </div>
      )
    } else if (currentUserResponse.type === 'error' && currentUserResponse.action === 'alert and try again'){
      return (
        <Overlay position="fixed">
          <AlertBoxBaseTheme message={currentUserResponse.msg} resetAction={() => {setAuthStatus(Math.random())}} />
        </Overlay>
      )
    } else if (currentUserResponse.type === 'error' && currentUserResponse.action === 'ignore') {
      return null
    } else if(currentUserResponse === 'error') {
      return null
    } else if( currentUser && !currentUser.verified){
      return <Link to="/activation"> <NavAvatar onClick={ null } size="40" src={currentUser.profilePhoto} username={currentUser.username} pointer background={currentUser.bgColor}> </NavAvatar> </Link>
    } else {
      return <NavAvatar onClick={ toggleAccountNav } size="40" src={currentUser.profilePhoto} username={currentUser.username} pointer background={currentUser.bgColor}> </NavAvatar>
    }
  }

  return (
    <>
    <header
      className="bg-white shadow-md flex items-center justify-between py-3 px-8 lg:px-16 fixed w-full z-10"
      style={{maxWidth: '2000px', minWidth: 250}}
    >
      <div className="flex items-center">
        { accountNavDecision() }
        <span className="px-3"></span>
        {/* Customized site name */}
        <SiteLogo></SiteLogo>
      </div>

      {/* Navigation items */}
      <div
        className="hidden sm:flex items-center justify-center"
      >
        <ul
          className="flex items-center justify-evenly"
        >
          {navItems.map( navItem =>
            <li
              key={ navItem.id }
              className="font-projSans mr-10 px-1 border-b-2 hover:border-proj-logoDarkBlue hover:text-proj-buttonBlue border-transparent cursor-pointer leading-snug"
            >
              { navItem.route === '/' && <Link to={ navItem.route }> { navItem.name } </Link> }
              { navItem.route !== '/' && <a href={ navItem.route }> { navItem.name } </a> }
            </li>
          )}
        </ul>
          <CallToAction route={ currentUser ? '/accpanel/mail' : '/client-area'}>
            <span> { currentUser ? 'Send Mail' : 'Get Started'} </span>
          </CallToAction>
      </div>

      <div
        className="menu cursor-pointer sm:hidden"
        onClick={toggleSideNav}
      >
        <i className="material-icons"> menu </i>
      </div>
    </header>

    {/* Side nav  */}
    { sideNav && <SideNav closeAction={toggleSideNav} currentUser={currentUser}></SideNav> }
    { accountNav && <AccountNav toggle={toggleAccountNav} open={accountNav}></AccountNav>}
    </>
  )
}

export { Header }
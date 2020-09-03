import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { SiteLogo } from './Header'
import { MailButton } from '../Button'
import { CurrentUserContext as CurrentUser } from '../../App'

const navOptions = [
  {id: 1, name: 'Dashboard', icon: 'dashboard', route: '/accpanel/'},
  {id: 2, name: 'Mailing history', icon: 'history', route: '/accpanel/history'},
  {id: 3, name: 'Contacts', icon: 'contacts', route: '/accpanel/contacts'},
  {id: 4, name: 'Account settings', icon: 'settings', route: '/accpanel/settings'}
]

function NavOption({name, icon, route}){
  return (
    <NavLink to={route} className="py-4 mb-3 px-6 w-11/12 hover:bg-white hover:bg-opacity-25 text-white font-projSans flex items-center rounded-tr-full rounded-br-full" activeClassName="bg-white bg-opacity-25" exact>
       <i className="material-icons pr-3"> {icon} </i> {name}
    </NavLink>
  )
}

export function NavAvatar({size, src, username, onClick, pointer, background}){
  return (
    <div
      className={`${pointer && 'cursor-pointer'}`}
      style={{width: `${size}px`, height: `${size}px`, clipPath: 'circle()'}}
      onClick={() => onClick && onClick()}
    >
      { src ? <img
        src={src}
        alt="mailr_avatar"
        className="w-full h-full inline-block"
      />
        :
      <div
        className={`w-full h-full flex items-center uppercase justify-center text-white text-${ size === '40' ? '2' : '5'}xl`}
        style={{background: `#${background}`}}
      >
        {username[0]}
      </div>}
    </div>
  )
}

function handleLogout(){
  window.location.href = 'http://localhost:8000/logout'
}

export function AccountNav({ toggle }){
  const {currentUser} = useContext(CurrentUser)
  return (
    <section
      className="fixed z-30 bg-proj-buttonBlue min-h-screen inset-0 animate__animated animate__slideInLeft"
      style={{maxWidth: 340, animationTimingFunction:'ease-in-out', animationDuration: '200ms', boxShadow: '5px 0px 6px #00000026'}}
    >
      <div
        className="w-full flex items-center justify-between px-5 mt-4 mb-8"
      >
        <SiteLogo />
        <i
          className="material-icons text-3xl text-white cursor-pointer"
          onClick={()=>{ toggle() }}
        > cancel </i>
      </div>

      <div
        className="w-full h-56 flex items-center flex-col justify-between"
      >
        <NavAvatar size="150" src={currentUser.profilePhoto} username={currentUser.username} background={currentUser.bgColor}> </NavAvatar>
        <MailButton route='/accpanel/mail' bg="white" hover="gray-200" text="proj-buttonBlue" > Send mail </MailButton>
      </div>

      <ul className="mt-10">
        {navOptions.map(option => <NavOption key={option.id} icon={option.icon} route={option.route} name={option.name} ></NavOption>)}
      </ul>

      <div className="flex items-center justify-between absolute bottom-0 text-projSans text-white w-full px-5 pb-4">
        <p className="text-xs"> <b> { currentUser.username } </b> </p>
        <p className="uppercase text-xs cursor-pointer font-thin hover:bg-white hover:bg-opacity-25 px-3 py-1 rounded" style={{letterSpacing: 1}} onClick={() => handleLogout()}> Log out </p>
      </div>
    </section>
  )
}
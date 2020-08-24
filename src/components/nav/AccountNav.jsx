import React from 'react'
import { NavLink } from 'react-router-dom'
import { SiteLogo } from './Header'
import section01 from '../../assets/images/section-01.png'
import { MailButton } from '../Button'

const navOptions = [
  {id: 1, name: 'Dashboard', icon: 'dashboard', route: '/accpanel/'},
  {id: 2, name: 'Mailing history', icon: 'history', route: '/accpanel/history'},
  {id: 3, name: 'Contacts', icon: 'contacts', route: '/accpanel/contacts'},
  {id: 4, name: 'Account settings', icon: 'settings', route: '/accpanel/settings'}
]

function NavOption({name, icon, route}){
  return (
    <NavLink to={route} className="py-3 mb-3 px-6 w-11/12 hover:bg-white hover:bg-opacity-25 text-white font-projSans flex items-center rounded-tr-full rounded-br-full" activeClassName="bg-white bg-opacity-25" exact>
       <i className="material-icons pr-3"> {icon} </i> {name}
    </NavLink>
  )
}

export function NavAvatar({size, src, onClick}){
  return (
    <div
      className="rounded-full"
      style={{width: `${size}px`, height: `${size}px`}}
      onClick={() => onClick && onClick()}
    >
      <img
        src={src}
        alt="mailr_avatar"
        className="w-full h-full inline-block"
      />
    </div>
  )
}

export function AccountNav({ toggle, open }){
  return (
    <section
      className="fixed z-20 bg-proj-buttonBlue shadow-xl min-h-screen inset-0 transition-transform duration-300 delay-75 animate__animated animate__slideInLeft"
      style={{maxWidth: 340, animationTimingFunction:'ease-in-out', animationDuration: '200ms'}}
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
        <NavAvatar size="150" src={section01}> </NavAvatar>
        <MailButton route='/accpanel/mail' bg="white" hover="gray-200" text="proj-buttonBlue" > Send mail </MailButton>
      </div>

      <ul className="mt-10">
        {navOptions.map(option => <NavOption key={option.id} icon={option.icon} route={option.route} name={option.name} ></NavOption>)}
      </ul>
    </section>
  )
}
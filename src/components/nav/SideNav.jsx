import React from 'react'
import { navItems } from './Header'
import { CallToAction } from '../Button'
import { Link } from 'react-router-dom'

export function SideNav({ closeAction }){
  return (
    <div
      className="min-h-screen bg-white w-64 fixed z-20 right-0 sm:hidden"
    >
      <div className="p-3 ml-48 cursor-pointer" onClick={() => closeAction() }>
        <i className="material-icons text-4xl text-proj-buttonBlue"> cancel </i>
      </div>
      <ul>
        { navItems.map( navItem =>
        <li
        key={navItem.id}
        className="py-3 mb-3 px-6 w-full hover:bg-proj-buttonBlue hover:bg-opacity-25 font-projSans flex items-center"
        >
          <i className="material-icons mr-2 text-proj-logoDarkBlue text-xl"> {navItem.icon} </i>
          { navItem.route === '/' && <Link to={ navItem.route }> { navItem.name } </Link>}
          { navItem.route !== '/' && <a href={ navItem.route }> { navItem.name } </a>}
        </li>)}
      </ul>

      <div className="px-6 mt-8">
        <CallToAction route="/client-area"> Get Started </CallToAction>
      </div>
    </div>
  )
}
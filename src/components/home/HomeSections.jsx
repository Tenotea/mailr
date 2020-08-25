import React, {useContext} from 'react'
import { CallToAction } from '../Button'
import { CurrentUserContext } from '../../App'

export function ComposedSectionImage({image}){
  return (
    <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 mx-auto">
      <img src={image} alt="mailr_illustration"/>
    </div>
  )
}

export function ComposedSectionText({ title, reverse, children }){
  const currentUser = useContext(CurrentUserContext)
  return (
    <div className={`w-full lg:w-1/2 p-2 pl-5 ${reverse && 'md:pl-16' }`}>
      <div className="relative px-5 py-2 my-5" style={{width: 'fit-content'}}>
        <span className="h-8 w-12 inline-block absolute right-0 top-0 bg-transparent border-4 border-proj-orangeCorners border-b-0 border-l-0"></span>
        <h1
          className="font-projTitle text-4xl"
          dangerouslySetInnerHTML={{__html: title}}
        >
        </h1>
        <span className="h-8 w-12 inline-block absolute bottom-0 left-0 bg-transparent border-4 border-proj-orangeCorners border-t-0 border-r-0"></span>
      </div>

      <div className="w-full font-projSerif text-lg lg:text-xl leading-10 mb-10">
         { children }
      </div>

      <CallToAction route={ currentUser ? '/accpanel' : '/client-area'}> { currentUser ? 'Dashboard' : 'Get Started'} </CallToAction>
    </div>
  )
}


export function HomeSection({reverse, title, image, bg, children, id}){
  return (
    <section
      className={`w-full p-10 ${bg ? 'bg-white': 'bg-gray-100'} lg:flex ${reverse && 'flex-row-reverse'} items-center justify-between`}
      id={id}
    >
      <ComposedSectionImage image={image}> </ComposedSectionImage>
      <ComposedSectionText title={title} reverse={reverse}> {children} </ComposedSectionText>
    </section>
  )
}
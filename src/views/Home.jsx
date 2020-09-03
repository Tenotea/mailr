import React, { useContext } from 'react'
import heroBanner from '../assets/images/heroBanner.png'
import { CallToAction, CallToActionOutlined } from '../components/Button'
import { HomeSection } from '../components/home/HomeSections'
import section01img from '../assets/images/section-01.png'
import section02img from '../assets/images/section-02.png'
import section03img from '../assets/images/section-03.png'
import listIcon from '../assets/images/listicon.png'
import { CurrentUserContext } from '../App'

export function Home (props) {
  const { currentUser } = useContext(CurrentUserContext)
  const features = ['Create contact groups','Create a virtual address book','Send messages in batches','Send recursive messages','Import existing contact list from a csv file']

  return (
    <div
      className="home relative"
      style={{top: '60px'}}
    >
      <section
        className="w-full h-64 bg-white bg-no-repeat bg-cover bg-right-bottom relative bg-fixed"
        style={{minHeight: '550px', backgroundImage: `url(${heroBanner})`}}
      >
        <div
          className="w-full absolute top-0 left-0 h-full flex items-center p-0 md:p-10"
          style={{background: 'radial-gradient(circle at left, rgba(0,0,0,0.55) 10%, rgba(255,255,255,0) 100%)', maxWidth: 2000, minWidth: 250}}
        >
          <div
            className="flex flex-col items-start justify-around p-10 sm:p-16"
            style={{width: 'fit-content', minHeight: '50%'}}
          >
            <h1
              className="text-white text-5xl sm:text-6xl font-projTitle"
            > Get your mails <br/> sent in seconds </h1>
            <div
              className="flex items-center flex-wrap"
            >
              <div
                className="my-5 mr-8"
              >
                <CallToAction route={ currentUser ? '/accpanel' : '/client-area'}> { currentUser ? 'Dashboard' : 'Get Started'} </CallToAction>
              </div>
                <CallToActionOutlined> Learn more </CallToActionOutlined>
            </div>
          </div>
        </div>
      </section>

      <HomeSection
        title="With any mailing account <br /> we can get you set up"
        image={section01img}
        reverse={false}
        bg={false}
      >
        <p> Get your business up and running with our free and fast mailing technology. Send emails to any number of audiences in the world. Up to 100,000 recipients at once.
        Through our validation systems, we make sure all your messages get and alert you if something goes wrong. But that never happens. </p>
      </HomeSection>

      <HomeSection
        title="Plan 10-Days ahead with our <br /> Message Scheduler"
        image={section02img}
        reverse={true}
        bg={true}
        id="about"
      >
        <p> Don't wait till it's 5-minutes before you submit that report.
        Our message scheduler can handle messages to be sent a month ahead of time and you get notified when it delivered. Sign up to try it out.</p>
      </HomeSection>

      <HomeSection
        title="More Features"
        image={section03img}
        reverse={false}
        bg={false}
        id="contact"
      >
        <ul>
          {
            features.map((feature, i) => {
              return (
                <li
                  key={i}
                  className="flex items-start mb-3"
                >
                  <img src={listIcon} alt="mailr_style_icon" className="w-4 mr-2 pt-3" />
                  {feature}
                </li>
              )
            })
          }
        </ul>
      </HomeSection>
    </div>
  )
}


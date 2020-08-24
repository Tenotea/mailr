import React from 'react'

export function AccountPanel(props) {
  return (
    <main className="pt-16 md:pt-24 md:px-5 w-full">
      <div className="w-full xl:w-10/12 mx-auto h-64 relative">
        <div className="w-full h-full bg-proj-buttonBlue rounded-lg absolute inset-0"> </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-10 md:gap-5 lg:gap-10 px-6 pt-6 sm:pt-10 xl:pt-16">
          {
            ['a', 'b', 'c']
            .map( card => <div className="bg-white rounded-md shadow-md w-full mx-auto h-64 z-10 xl:w-3/4">

            </div>)
          }
        </div>
      </div>
    </main>
  )
}
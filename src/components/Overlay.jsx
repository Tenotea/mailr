import React from 'react'

function Overlay({children, position}){
  return (
    <div className={ position + " inset-0 bg-black bg-opacity-75 z-10 text-white font-projSans flex items-center flex-col justify-center px-2 md:px-10"}>
      {children}
    </div>
  )
}

function AlertBoxBaseTheme({message, resetAction}){
  return (
    <div
      className="bg-gray-900 w-full mx-auto rounded-lg flex items-center justify-center flex-col p-5 md:p-10 shadow-md animate__animated animate__bounceIn animate__faster"
      style={{maxWidth: '600px'}}
    >
      <p
        className="font-medium font-projSerif px-5 text-sm md:text-xl mb-5 text-center"
      >
        { message }
      </p>

      <AlertActionButton resetAction={resetAction} actionText="Retry" actionIcon="refresh" />

    </div>
  )
}

function AlertActionButton({resetAction, actionText, actionIcon}){
  return (
      <button
        onClick={() => {
         resetAction && resetAction()
        }}
        className="flex items-center justify-center py-2 rounded w-full text-sm md:text-base font-projSans bg-blue-600 text-white md:font-medium px-3"
      >
        <i
          className="material-icons text-base pr-2">
            { actionIcon }
        </i>
        {actionText}
      </button>
  )
}

export {Overlay, AlertBoxBaseTheme, AlertActionButton}
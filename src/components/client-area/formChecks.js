export const usernameCheck = (v) => {
  let {error , success } = Object.create({error: null, success: false})
  if(!(/[^a-zA-Z0-9]/g).test(v)) {
    if(v.length > 3 ){
      if(v.length < 15){
        if(isNaN(v)){
          error = null
          success = true
        } else {
          error = 'Username cannot be a number'
          success = false
        }
      } else {
        error = 'Username cannot be grater than 15 characters'
        success = false
      }
    } else {
      error = 'Username must be greater than 3 characters'
      success = false
    }
  } else {
    error = 'Username cannot include special characters'
    success = false
  }
  return {error, success}
}

export const emailCheck = (v) => {
  let {error , success } = Object.create({error: null, success: false})
  if((/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(v)) {
      error = null
      success = true
  } else {
    error = 'Enter a valid email address'
    success = false
  }
  return {error, success}
}

export const passwordCheck = (v) => {
  let {error , success } = Object.create({error: null, success: false})
  if((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/).test(v)) {
    if(v.length > 8 ){
      error = null
      success = true
    } else {
      error = 'Password must be greater than 8 characters'
      success = false
    }
  } else {
    error = 'Password must include a number, an uppercase, a lowercase and a special character (e.g @&$#)'
    success = false
  }
  return { error, success }
}

import validator from 'validator'

const handleInputAndErrors = (e) => {
  const { name, value } = e.target
  let error;

  if (name ===  'username') error = value.length < 5 ? 'Username too short' : ''
  if (name === 'email') error = validator.isEmail(value) ? '' : 'Bad Email'
  if (name === 'password') error = validator.isStrongPassword(value) ? '' : 'Bad Password'

  return { error, name, value }
}

const clearErrors = (formSection, callback) => {
  for (let key in formSection) {
    if (!formSection[key]) {
      callback(key)
    }
  }
}

const formValidator = (errorObj, formobj) => {
  if (Object.values(errorObj).some((field) => field !== '') || Object.values(formobj).some((field) => !field)) return false
    return true
}


export { handleInputAndErrors, clearErrors, formValidator }
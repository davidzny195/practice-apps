import validator from 'validator'

const handleInputAndErrors = (e) => {
  const { name, value } = e.target
  let error;

  if (name === 'username') error = value.length < 5 ? 'Username too short' : ''
  if (name === 'email') error = validator.isEmail(value) ? '' : 'Bad Email'
  if (name === 'password') error = validator.isStrongPassword(value) ? '' : 'Bad Password'
  if (name === 'zip') error = value.length < 5 ? 'Bad zip' : ''
  if (name === 'phone_number') error =  validator.isMobilePhone(value) ? '' : 'bad number'
  if (name === 'credit') error = !validator.isCreditCard(value) ? 'Bad card' : ''
  if (name === 'CVV') error = value.length !== 3 ? 'Bad cvv' : ''
  if (name === 'billing_zip') error =  value.length < 5 ? 'Bad billing' : ''
  if (name === 'expiry') {
    let date = new Date(value)
    error = new Date() < date ? '' : 'Bad date'
  }

  return { error, name, value }
}

const clearErrors = (formSection, callback) => {
  for (let key in formSection) {
    if (!formSection[key]) {
      callback(key)
    }
  }
}

const formValidator = (errorObj, formObj, exception) => {
  if (Object.values(errorObj).some((field) => field && field.length ) || Object.entries(formObj).filter(([key]) => key !== exception).some((arr) => !arr[1])) return false
    return true
}


export { handleInputAndErrors, clearErrors, formValidator }
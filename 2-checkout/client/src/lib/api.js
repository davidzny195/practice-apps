const serverSession = 'http://localhost:3000/session'
const serverCheckout = 'http://localhost:3000/checkout'

const init = (cookie) => {
  return fetch(serverSession)
}

const createUser = (params) => {
  return fetch(serverCheckout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then((res) => {
    return res
  }).catch((err) => {
    console.log('Error creating user')
  })
}

const populateForm = () => {

}

const updateForm = () => {

}

export { init, createUser, populateForm, updateForm }
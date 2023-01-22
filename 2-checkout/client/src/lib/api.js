const server = 'http://localhost:3000'

const init = (cookie) => {
  return fetch(`${server}/session`)
}

const createUser = (params) => {
  return fetch(`${server}/user`, {
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

const updateForm = (params) => {
  return fetch(`${server}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then((res) => {
    return res.status
  })
}

const populateForm = () => {

}


export { init, createUser, populateForm, updateForm }
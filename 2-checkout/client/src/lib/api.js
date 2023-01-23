const server = 'http://localhost:3000'

const init = (cookie) => {
  return fetch(`${server}/session`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err)
    })
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
    console.log(res.status, 'api')
    return res.status
  })
}

const prevPage = (params) => {
  return fetch(`${server}/session`, {
    method: 'PUT',
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

export { init, createUser, updateForm, prevPage }
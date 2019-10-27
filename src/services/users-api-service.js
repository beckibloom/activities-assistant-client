import config from '../config'

const UsersApiService = {
  postUser(newUser) {
    return fetch(`${config.users_endpoint}/${newUser.orgId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => {
        (!res.ok)
          ? res.json().then(e=>Promise.reject(e))
          : res.json()
      })
  },
}

export default UsersApiService
import config from '../config.js'

const OrgsApiService = {
  getOrgs() {
    return fetch(`${config.orgs_endpoint}`, {
      headers: {},
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  
  getUserOrg(username) {
    return fetch(`${config.API_BASE_URL}/users/${username}`, {
      method: 'GET',
      headers: {},
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e=>Promise.reject(e))
          : res.json()
      )
  },

  postOrg(newOrg) {
    return fetch(`${config.orgs_endpoint}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newOrg)
    })
      .then(res => {
        if (!res.ok) {
          res.json().then(e=>{throw e})
        }
        return res.json()
      })
  },
}

export default OrgsApiService;
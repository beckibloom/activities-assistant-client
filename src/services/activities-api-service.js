import TokenService from './token-service'
import config from '../config'

const ActivitiesApiService = {
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
  
  // Use getActivities() and refactor to get activities with the org id. Don't forget to add the API_ENDPOINT to the config file.
  // getActivities() {
  //   return fetch(`${config.API_ENDPOINT}/activities`, {
  //     headers: {
  //     },
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // },

  // Update this with the API_ENDPOINT from config.
  // getActivity(activityId) {
  //   return fetch(`${config.API_ENDPOINT}/activities/${activityId}`, {
  //     headers: {
  //       'authorization': `bearer ${TokenService.getAuthToken()}`,
  //     },
  //   })
  //     .then(res => 
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // },

  postActivity(orgId, newActivity) {
    return fetch(`${config.API_ENDPOINT}/activities`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `basic ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        org_id: orgId,
        newActivity,
      }),
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default ActivitiesApiService
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
  
  getActivities(orgId) {
    return fetch(`${config.activities_endpoint}/${orgId}`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getActivity(orgId, activityId) {
    return fetch(`${config.activities_endpoint}/${orgId}/${activityId}`, {
      headers: {
      },
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

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
  },

  updateActivity(orgId, activityId, activityToUpdate) {
    return fetch(`${config.API_ENDPOINT}/activities/${orgId}/${activityId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        activityToUpdate
      }),
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  deleteActivity(orgId, activityId) {
    return fetch(`${config.API_ENDPOINT}/activities/${orgId}/${activityId}`, {
      method: 'DELETE',
      headers: {},
      body: {},
    })
      .then(res => {
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      })
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
}

export default ActivitiesApiService
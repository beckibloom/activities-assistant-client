import TokenService from './token-service'
import config from '../config'

const ActivitiesApiService = {
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
    return fetch(`${config.activities_endpoint}/${orgId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(
        newActivity
      ),
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  updateActivity(orgId, activityId, activityToUpdate) {
    return fetch(`${config.activities_endpoint}/${orgId}/${activityId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(activityToUpdate),
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  deleteActivity(orgId, activityId) {
    const token = TokenService.getAuthToken()

    return fetch(`${config.activities_endpoint}/${orgId}/${activityId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `bearer ${token}`
      },
      body: {},
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => {throw e})
        } 
      })
  },
}

export default ActivitiesApiService
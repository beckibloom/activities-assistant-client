import TokenService from './token-service';
import config from '../config';

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
      });
  },

  getUserOrg(cb) {
    return fetch(`${config.users_endpoint}/orgID`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => {
        (!res.ok)
          ? res.json().then(e=>Promise.reject(e))
          : cb(res.json())
      });
  },
};

export default UsersApiService;
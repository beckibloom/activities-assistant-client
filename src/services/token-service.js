import config from '../config'

const TokenService = {
  saveAuthToken(token, username) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token)
    window.sessionStorage.setItem(username, username)
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY)
  },
  // getUsername() {
  //   return window.sessionStorage.getItem(username)
  // },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
}

export default TokenService
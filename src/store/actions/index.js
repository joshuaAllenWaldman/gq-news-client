import * as api from '../../api/index';

export const signupUser = (userData) => ({
  type:'AUTH_USER',
  payload: api.signupUser(userData)
})

export const loginUser = (userData) => ({
  type:'AUTH_USER',
  payload: api.loginUser(userData)
})

export const autoSignIn = () => ({
  type:'AUTH_USER',
  payload: api.autoSignIn()
})
export const logoutUser = () => {
  localStorage.removeItem('X-AUTH')
  return {
    type:'AUTH_USER',
    payload: {auth: null }
  }
}
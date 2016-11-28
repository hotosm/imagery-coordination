export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const LOGOUT_USER = 'LOGOUT_USER';

export function setUserToken (token) {
  return { type: SET_USER_TOKEN, data: token };
}

export function setUserProfile (profile) {
  return { type: SET_USER_PROFILE, data: profile };
}

export function logoutUser () {
  return { type: LOGOUT_USER };
}

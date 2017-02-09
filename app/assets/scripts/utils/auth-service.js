// From https://auth0.com/docs/quickstart/spa/react/01-login

import Auth0Lock from 'auth0-lock';

import { isTokenExpired } from './jwt-helper';
import { setUserToken, setUserProfile, logoutUser } from '../actions';
import store from './store';

export default class AuthService {
  constructor (clientId, domain) {
    const options = {
      allowSignUp: false,
      autoclose: true,
      auth: {
        redirect: false,
        params: {scope: 'openid roles user_id user_metadata'}
      },
      theme: {
        logo: 'assets/graphics/layout/hot-logo.png',
        primaryColor: '#D73F3F'
      }
      // auth: {
      //   redirectUrl: `${window.location.origin}/#/`,
      //   responseType: 'token'
      // }
    };

    // Configure Auth0.
    this.lock = new Auth0Lock(clientId, domain, options);
    // Add callback for lock `authenticated` event.
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context.
    this.login = this.login.bind(this);
  }

  _doAuthentication (authResult) {
    // Saves user token to localStorage.
    localStorage.setItem('id_token', authResult.idToken);
    store.dispatch(setUserToken(authResult.idToken));

    // Async loads the user profile data
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error);
      } else {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile));
        store.dispatch(setUserProfile(profile));
      }
    });
  }

  login () {
    // Call the show method to display the widget.
    this.lock.show();
  }
}

export function isLoggedIn (token) {
  return !!token && !isTokenExpired(token);
}

export function getProfileLocalStorage () {
  // Retrieves the profile data from localStorage
  const profile = localStorage.getItem('profile');
  return profile ? JSON.parse(localStorage.profile) : null;
}

export function getTokenLocalStorage () {
  // Retrieves the user token from localStorage.
  return localStorage.getItem('id_token') || null;
}

export function logout () {
  // Clear user token and profile data from localStorage.
  localStorage.removeItem('id_token');
  localStorage.removeItem('profile');
  store.dispatch(logoutUser());
}

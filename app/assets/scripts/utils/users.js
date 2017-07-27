import store from './store';

// Why does this file exist?
// The users is part of some metadata needed throughout the site. This is
// read-only information.
// The api is queried once the app starts and to avoid having to pass a
// users object as a prop to every single component we just abstract it this way.

export function getUserFromId (uid) {
  let u = store.getState().users.users;

  return u.find(o => o.userId === uid);
}

export function getNameFromId (uid) {
  let user = getUserFromId(uid);

  return user ? user.name : 'N/A';
}

export function getWithRole (role) {
  let u = store.getState().users.users;

  return u.filter(o => o.roles.indexOf(role) !== -1);
}

// src/actions/actions.js

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_BIRTHDAY = 'SET_BIRTHDAY';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_FAVORITEMOVIE = 'SET_FAVORITEMOVIE';


export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  return { type: SET_USER, value };
}

export function setUsername(value) {
  return { type: SET_USERNAME, value};
}

export function setPassword(value) {
  return { type: SET_PASSWORD, value};
}


export function setBirthday(value) {
  return { type: SET_BIRTHDAY, value};
}


export function setFavoritemovie(value) {
  return { type: SET_FAVORITEMOVIE, value};
}

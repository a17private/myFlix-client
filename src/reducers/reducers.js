// src/reducers/reducers.js
import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, SET_USERNAME, SET_PASSWORD, SET_EMAIL, SET_BIRTHDAY, SET_FAVORITEMOVIE } from '../actions/actions';


function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}


function user(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}


function username(state = [], action) {
  switch (action.type) {
    case SET_USERNAME:
      return action.value;
    default:
      return state;
  }
}


function birthday(state = [], action) {
  switch (action.type) {
    case SET_BIRTHDAY:
      return action.value;
    default:
      return state;
  }
}



function password(state = [], action) {
  switch (action.type) {
    case SET_PASSWORD:
      return action.value;
    default:
      return state;
  }
}



function email(state = [], action) {
  switch (action.type) {
    case SET_EMAIL:
      return action.value;
    default:
      return state;
  }
}



function favoritemovie(state = [], action) {
  switch (action.type) {
    case SET_FAVORITEMOVIE:
      state.push(action.value);
      return state;
    default:
      return state;
  }
}




const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  username,
  password,
  birthday,
  favoritemovie,
  email
});

export default moviesApp;
// src/actions/actions.js
import axios from 'axios';

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_BIRTHDAY = 'SET_BIRTHDAY';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_FAVORITEMOVIE = 'SET_FAVORITEMOVIE';
export const GET_USER = 'GET_USER';
export const REMOVE_FAVORITEMOVIE = 'REMOVE_FAVORITEMOVIE';
export const HANDLE_UPDATE = 'HANDLE_UPDATE';


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

export function getUser(value) {
  return { type: GET_USER, value };
}

export function removeFavoriteMovie(value) {
  return { type: REMOVE_FAVORITEMOVIE, value };
}

export function handleUpdate(value) {
  return { type: HANDLE_UPDATE, value };
}


//getting user method

export const getUser = (token) => {
  const Username = localStorage.getItem('user');
  axios.get(`https://myflixdb17.herokuapp.com/users/${Username}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      this.props.setUsername(response.data.Username)
      this.props.setPassword(response.data.Password)
      this.props.setBirthday(response.data.Birthday)
      this.props.setFavoritemovie(response.data.FavoriteMovies)
    })
    .catch(function (error) {
      console.log(error);
    });
}


    //removing movie method

export const removeFavoriteMovie = (e, movie) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios
     .delete(`https://myflixdb17.herokuapp.com/users/${username}/movies/${movie._id}`, {
     headers: { Authorization: `Bearer ${token}` },
     })
     .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
     })
     .catch(function (error) {
        console.log(error);
      })
    //.then(() => window.location.reload());
}
    
    
    
    // update the username
    
    export const  handleUpdate = (e, newUsername, newPassword, newEmail, newBirthday) => {

      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        this.props.setUser({
          validated: true,
        });
        return;
      }
      e.preventDefault();
  
      const token = localStorage.getItem('token');
      const Username = localStorage.getItem('user');
  
      axios.put(`https://myflixdb17.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          Username: newUsername ? newUsername : this.props.username,
          Password: newPassword ? newPassword : this.props.password,
          Email: newEmail ? newEmail : this.props.email,
          Birthday: newBirthday ? newBirthday : this.props.birthday
        },
      })
        .then((response) => {
          alert('Saved Changes');
          this.props.setUsername(response.data.Username)
          this.props.setPassword(response.data.Password)
          this.props.setBirthday(response.data.Birthday)
          this.props.setFavoritemovie(response.data.FavoriteMovies)
      
          localStorage.setItem('user', this.props.Username);
          window.open('/users/${username}', '_self');
        })
        .catch(function (error) {
          console.log(error);
        });
    }




/*handleDeleteUser(e) {
  e.preventDefault();

  const token = localStorage.getItem('token');
  const Username = localStorage.getItem('user');

  axios.delete(`https://myflixdb17.herokuapp.com/users/${Username}`, {
    headers: {Authorization: `Bearer ${token}` },
  })
    .then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      alert('Your account has been deleted.');
      window.open('/', '_self');
    })
    .catch((e) => {
      console.log(e);
    });
}
*/




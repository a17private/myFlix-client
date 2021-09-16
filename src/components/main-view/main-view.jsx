// myFlix-client/src/main-view/main-view.jsx

import React from 'react';
import axios from 'axios';


import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


import "./main-view.scss";



  export class MainView extends React.Component {
    constructor() {
      super();
      //initial states are set to null
      this.state = {
        movies: [],
        selectedMovie: null,
        user: null,
        register: null,
      };
    }
   
    componentDidMount(){
      axios.get('https://myflixdb17.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    
    
    keypressCallback(event) {
      console.log(event.key);
    }

    componentDidMount() {
      document.addEventListener('keypress', this.keypressCallback);
    }

  
    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    onRegistration(register) {
      this.setState({
        register,
      });
    }
  
    /* When a user successfully logs in, this function updates the
     `user` property in state to that *particular user*/
    onLoggedIn(user) {
      this.setState({
        user,
      });
    }
  
    
    render() {
      const { movies, selectedMovie, user, register } = this.state;

       /* If there is not registered user, the RegisterView is rendered. If there is a user registered,
     the user details are *passed as a prop to the LoginView*/
    if (!register)
    return (
      <RegistrationView
        onRegistration={(register) => this.onRegistration(register)}
      />
    );

  /* If there is no user, the LoginView is rendered. If there is a user logged in,
   the user details are *passed as a prop to the LoginView*/
  if (!user)
    return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

  
      if (movies.length === 0) return <div className="main-view" />;
  
      return (
        <div className="main-view">
          {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
         ))
        }
      </div>
    );
  }

}
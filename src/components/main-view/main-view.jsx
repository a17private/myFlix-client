import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import NavBar from '../navbar-view/navbar-view'

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
    };
  }

 
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  // Log In
onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.Username
  });


  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
}




onRegistration(register) {
  this.setState({
    register: register,
  });
}




  getMovies(token) {
    axios.get('https://myflixdb17.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }




  getUsers(token) {
    axios.post('https://myflixdb17.herokuapp.com/users', {
      headers: { Authorization: 'Bearer ${token}' }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          users: response.data
        });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  render() {
    const { movies, user} = this.state;
    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
    console.log("render", user);

  
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
            <NavBar user={user} />
    
            <Row className="main-view justify-content-md-center">
    
              <Route exact path="/" render={() => 
              {
                if (!user) 
                return <Col>
                  <LoginView onLoggedIn={user => 
                    this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return movies.map(m => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ))
              }} />
              <Route path="/register" render={() => 
              {
                if (user) return <Redirect to="/" />
                return <Col>
                  <RegistrationView />
                </Col>
              }} />
              <Route path="/profile" render={() => 
              {
                if (!user) return <Col>
                  <ProfileView />
                </Col>
              }} />
              <Route path="/movies/:movieId" render={({ match, history }) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => 
                    this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <MovieView movie={movies.find(m => 
                  m._id === match.params.movieId)} onBackClick={() => 
                    history.goBack()} />
                </Col>
              }} />
              <Route path="/directors/:name" render={({ match, history }) => 
              {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => 
                this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => 
              m.Director.Name === match.params.name).Director} onBackClick={() => 
                history.goBack()} />
            </Col>
          }
          } />
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => 
                this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => 
              m.Genre.Name === match.params.name).Genre} onBackClick={() => 
                history.goBack()} />
            </Col>
            }} />

            <Route exact path='/users/:username' render={({ history }) => {
              if (!user) return <LoginView onLoggedIn={(data) => 
                this.onLoggedIn(data)} />;
              if (movies.length === 0) return;
              return <ProfileView history={history} movies={movies} />
            }} />
  
          </Row>
        </Router>
      );
    }
  };


  export default MainView;

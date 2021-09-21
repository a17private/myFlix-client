// myFlix-client/src/main-view/main-view.jsx

import React from "react";
import axios from "axios";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export class MainView extends React.Component {
  constructor() {
    super();
    //initial state is set to null
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
       
    setSelectedMovie(movie) {
      this.setState({
        selectedMovie: movie
      });
    }

   /* onRegistration(register) {
      this.setState({
        register,
      });
    }*/

    onLoggedIn(user) {
      this.setState({
        user
      });
    }
    
    render() {
      const { movies, user, register, selectedMovie } = this.state;

     
    
    if (!user)
    return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;




    /*if (!register)
    return (
      <RegistrationView onRegistration={(user) => this.onRegistration(user)}/>
    );*/
  
      
    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;
  
      return (
        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }} />
              </Col>
            )
            : movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }}/>
              </Col>
            ))
          }
        </Row>
      );
    }
  }


// myFlix-client/src/main-view/main-view.jsx

import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



  export class MainView extends React.Component{
    constructor() {
      super();
      this.state = {
        movies: [],
        selectedMovie: null
      }
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
    
    componentDidMount() {
      document.addEventListener('keypress', event => {
        console.log(event.key);
      });
    }
    
    setSelectedMovie(movie) {
      this.setState({
        selectedMovie: movie
      });
    }
    
    render() {
      const { movies, selectedMovie } = this.state;
  
      if (movies.length === 0) return <div className="main-view" />;
  
      return (
        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            ))
          }
        </Row>
      );
    }
  }

export default MainView;
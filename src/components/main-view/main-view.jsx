import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
export class MainView extends React.Component {

  render() {
    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard />)}
      </div>
    );
  }
}


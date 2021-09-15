import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

export class MovieCard extends React.Component {
  
  render() {
    const { movie, onMovieClick } = this.props;

    return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
  }
}
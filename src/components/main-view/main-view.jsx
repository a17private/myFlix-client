import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
export class MainView extends React.Component {

  render() {
    return (
      <div className="main-view">
        <div>Inception</div>
        <div>The Shawshank Redemption</div>
        <div>Gladiator</div>
      </div>
    );
  }
}
import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="director-view">

        <div className="director-name">
          <h1>
            <span className="value">{movie.Director.Name}</span>
          </h1>
        </div>
        <div className="director-bio">
          <span className="value">{movie.Director.Bio}</span>
        </div>

        <div className="director-birth">
          <span className="value">{movie.Director.Birth}</span>
        </div>

        <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>

      </div>
    );
  }
}

MovieView.propTypes = {
  Director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Bio: propTypes.string.isRequired,
    Birth: propTypes.string.isRequired
  }).isRequired
};

export default MovieView; 
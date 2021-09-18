import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import "./movie-view.scss";



export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
    <Row className="movie-view">
      <Col className="movie-poster">
          <img src={movie.ImagePath}/>
        </Col>
        <Col className= "movie-title text-light">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </Col>
          <Col className= "movie-description text-light">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
           <button onClick={() => { onBackClick(null); }}>Back</button>
       </Col>
    </Row>
    );
  }
}
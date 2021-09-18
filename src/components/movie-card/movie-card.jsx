import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";
import CardColumns from 'react-bootstrap/CardColumns'

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
    <Row className="main-view justify-content-md-center">
     <CardColumns>
      <Card border="light" className="card-container movie-card mb-2 " >
      <Col xs={12} md={10} className="image-size justify-content-md-center">
        <Card.Img variant="top" src={movie.ImagePath} fluid />
        </Col>
        <Card.Body className="card p-0"  style={{ width: '11rem', }}>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
        </Card.Body>
      </Card>
      </CardColumns>
    </Row>
    );
  }
}
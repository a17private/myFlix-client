import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardDeck, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUser, removeFavoriteMovie, handleUpdate } from '../../actions/actions';

// #0
import {  setUsername, setPassword, setBirthday, setFavoritemovie } from '../../actions/actions';

import './profile-view.scss';

class ProfileView extends React.Component {

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.getUser(accessToken);
    }
  }


  render() {
    const { favoritemovie, movies, user } = this.props;

    return (
       <Row className="profile-view">
        <Card className="profile-card">
          <h2>Favorites</h2>
          <Card.Body>
           {favoritemovie.length === 0 && <h6 className="text-center">Add a favourite! </h6>}

            <div className="favorites-movies ">
              {favoritemovie.length > 0 &&
                movies.map((movie) => {
                  if (movie._id === favoritemovie.find((favMovie) => favMovie === movie._id)) {
                    return (
                      <CardDeck className="movie-card-deck" key={movie._id}>
                        <Card className="favorites-item card-content" style={{ width: '16rem' }} >
                          <Card.Img style={{ width: '15rem' }} className="movieCard" variant="top" src={movie.ImagePath} />
                          <Card.Body>
                            <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                            <Button size='sm' className='profile-button remove-favorite' variant='danger'  value={movie._id} onClick={(e) => this.removeFavoriteMovie(e, movie)}>
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      </CardDeck>
                    );
                  }
                })}
            </div>
          </Card.Body>
         
    
        
          <h2 className="section">Edit profile</h2>
          <Card.Body>

    
            <Form className="update-form" onSubmit={(e) => this.props.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>

              <Form.Group controlId="formBasicUsername">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.props.setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">
                  Password<span className="required">*</span>
                </Form.Label>
                <Form.Control type="password" placeholder="New Password" onChange={(e) => this.props.setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="Change Email" onChange={(e) => this.props.setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Label className="form-label">Birthday</Form.Label>
                <Form.Control type="date" placeholder="Change Birthday" onChange={(e) => this.props.setBirthday(e.target.value)} />
              </Form.Group>
              
             
              <Button variant='dark' size="sm" type="submit">
                Update
              </Button>
            
              <h6>Delete account</h6>     
                <div>
                <Button variant='danger' size="sm" onClick={(e) => 
                  this.handleDeleteUser(e)}>
                  Delete account
                 </Button>
              </div>
           
          
            </Form>
          </Card.Body>
        </Card>
      </Row >
    );
  } 

} 

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
}; 


// #7
let mapStateToProps = state => {
  return { username: state.username, password: state.password, birthday: state.birthday, favoritemovie: state.favoritemovie }
}

// #8
export default connect(mapStateToProps, { setUsername, setPassword, setBirthday, setFavoritemovie} )( ProfileView );
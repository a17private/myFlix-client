import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";




import "./registration-view.scss";



export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    if (setisValid) {
      axios.post('https://myflixdb17.herokuapp.com/users', {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthdate
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('error registering the user')
        });
    };
  }

  return (
   
   <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBirthdate">
        <Form.Label>Birthdate:</Form.Label>
        <Form.Control type="date" onChange={e => setBirthdate(e.target.value)} />
      </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
        Register
      </Button>
    </Form>

  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};
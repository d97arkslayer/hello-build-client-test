import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { post } from '../../utils/HttpRequests';
import './styles.css';

const SignUpPage = function () {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await post(`${process.env.REACT_APP_AUTH_API_URL}/api/users`, {
      name,
      lastname,
      email,
      password,
    });
    if (response.error) {
      return;
    }
    toast('Signed Up successful', { type: 'success' });
    history.push('/');
  };

  return (
    <div className='signup-container d-flex flex-row justify-content-center align-items-center'>
      <Form
        className='card p-5 col-md-4 col-sm-12'
        style={{ color: 'black', maxWidth: '500px' }}
        bg='dark'
        onSubmit={(e) => onSubmit(e)}
      >
        <h1 style={{ margin: 'auto' }}>Sign Up!</h1>
        <Form.Group className='mb-3' controlId='formBasicName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete='on'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicLastname'>
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type='text'
            name='lastname'
            placeholder='Enter Lastname'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            autoComplete='on'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='on'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Sign Up!
        </Button>
        <Link to='/' className='card-link mt-3 align-self-end'>
          Login
        </Link>
      </Form>
    </div>
  );
};

export default SignUpPage;

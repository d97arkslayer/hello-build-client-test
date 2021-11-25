import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { post } from '../../utils/HttpRequests';
import useLocalStorage from '../../hooks/UseLocalStorage';
import { localStorageKeys, apiUrls } from '../../utils/Consts';
import { useGitCloneState } from '../../contexts/GitCloneStateContext';
import './styles.css';

const SignUpPage = function () {
  const { translation } = useGitCloneState();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useLocalStorage(localStorageKeys.users, []);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await post(apiUrls.signUp, {
      name,
      lastname,
      email,
      password,
    }, translation);
    if (response.error) {
      return;
    }
    await setUsers([...users, {
      name, lastname, email, password,
    }]);
    toast(response.message, { type: 'success' });
    history.push('/');
  };

  return (
    <div className='signup-container d-flex flex-row justify-content-center align-items-center'>
      <Form
        className='card p-5 col-md-4 col-sm-12 card-container-signup'
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

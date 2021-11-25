import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { post } from '../../utils/HttpRequests';
import { localStorageKeys, apiUrls } from '../../utils/Consts';
import useLocalStorage from '../../hooks/UseLocalStorage';
import { useGitCloneState } from '../../contexts/GitCloneStateContext';
import './styles.css';

const LoginPage = function () {
  const { translation } = useGitCloneState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setAuth] = useLocalStorage(localStorageKeys.auth, null);
  const [, setAuthtoken] = useLocalStorage(localStorageKeys.authToken, null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await post(apiUrls.login, {
      email,
      password,
    }, translation);
    if (response.error) {
      return;
    }
    const { user = null, token = null } = response;
    if (user) {
      localStorage.removeItem(localStorageKeys.authToken);
      setAuth(user);
      setAuthtoken(token);
      localStorage.removeItem(localStorageKeys.gitAuth);
      window.location = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
    }
  };

  return (
    <div
      className='login-container d-flex flex-row justify-content-center align-items-center'
      id='login-container'
    >
      <Form
        className='card p-5 col-md-4 col-sm-12 card-container-login'
        style={{ color: 'black', maxWidth: '500px' }}
        bg='dark'
        onSubmit={(e) => onSubmit(e)}
      >
        <h1 style={{ margin: 'auto' }}>Login</h1>
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
          <Form.Text className='text-muted'>
            {'We\'ll never share your email with anyone else.'}
          </Form.Text>
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
          Login
        </Button>
        <Link to='/sign-up' className='card-link mt-3 align-self-auto'>
          Sign Up!
        </Link>
      </Form>
    </div>
  );
};
export default LoginPage;

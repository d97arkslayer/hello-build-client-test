import React from 'react';
import {
  Navbar, Nav, Container, Button,
} from 'react-bootstrap';
import { ImGithub } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { gitClonePrefix, localStorageKeys } from '../../utils/Consts';
import './styles.css';

const GitCloneNavBar = function () {
  const signOut = () => {
    localStorage.removeItem(`${gitClonePrefix}${localStorageKeys.auth}`);
    localStorage.removeItem(`${gitClonePrefix}${localStorageKeys.authToken}`);
    localStorage.removeItem(`${gitClonePrefix}${localStorageKeys.gitAuth}`);
    window.location = '/';
  };

  return (
    <div className='nav-bar-container'>
      <Navbar variant='dark' bg='primary' className='navbar'>
        <Container className='col-md-8 col-sm-4 col-xl-12 col-lg-12'>
          <Navbar.Brand
            as={Link}
            to='/'
            className='custom-nav-brand'
            style={{ fontSize: '20px', height: '50px' }}
          >
            <ImGithub style={{ marginRight: '10px', marginBottom: '5px' }} />
            GitClone Repositories
          </Navbar.Brand>
          <Nav className=''>
            <Button variant='secondary' onClick={() => signOut()} style={{ marginRight: '50px' }}>
              Sign Out!
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default GitCloneNavBar;

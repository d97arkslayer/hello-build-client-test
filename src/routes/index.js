import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect,
} from 'react-router-dom';
import useLocalStorage from '../hooks/UseLocalStorage';
import { localStorageKeys } from '../utils/Consts';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import NavBar from '../components/Nav';
import GitCloneRepos from '../pages/GitCloneRepos';

const AppRoutes = function () {
  const [isAuthenticated] = useLocalStorage(localStorageKeys.auth, null);
  if (!isAuthenticated) {
    return (
      <Router>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/sign-up' exact>
          <SignUp />
        </Route>
        <Redirect to='/' />
      </Router>
    );
  }
  return (
    <Router>
      <NavBar />
      <Route path='/' exact>
        <GitCloneRepos />
      </Route>
      <Redirect to='/' />
    </Router>

  );
};

export default AppRoutes;

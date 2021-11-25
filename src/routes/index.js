import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import useLocalStorage from '../hooks/UseLocalStorage';
import { localStorageKeys } from '../utils/Consts';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const AppRoutes = function () {
  const [isAuthenticated] = useLocalStorage(localStorageKeys.auth, null);
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/sign-up' exact>
          <SignUp />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path='/' exact>
        <h1>Dashboard</h1>
      </Route>
      <Route path='/profile'>
        <h1>Profile</h1>
      </Route>
      <Redirect to='/' />
    </Switch>

  );
};

export default AppRoutes;

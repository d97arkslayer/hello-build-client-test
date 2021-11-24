import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const AppRoutes = function () {
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
};

export default AppRoutes;

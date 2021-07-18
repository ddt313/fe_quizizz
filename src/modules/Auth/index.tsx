import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import ForgotPasswordPage from './ForgotPasswordPage';
import LoginPage from './LoginPage';
import RecoveryPasswordPage from './RecoverPasswordPage';

const Authentication: React.FunctionComponent = () => {
  const {path} = useRouteMatch();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Switch>
      {token && (
        <Redirect
          from={path}
          to={role && role === 'Human Resources' ? '/admin/user' : '/request'}
        />
      )}
      <Route path={`${path}/login`} component={LoginPage} />
      <Route path={`${path}/recovery/:token`} component={RecoveryPasswordPage} />
      <Route path={`${path}/forget`} component={ForgotPasswordPage} />
      <Redirect from={`${path}`} to={`${path}/login`} />
    </Switch>
  );
};

export default Authentication;

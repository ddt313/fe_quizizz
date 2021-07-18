import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import {subscribeErrorsToToaster} from '../modules/ErrorHandler';
import Lecturer from '../modules/Lecturer';
import ProfileManagement from '../modules/ProfileMgmt';

subscribeErrorsToToaster();
export default function Routes() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/lecturer" component={Lecturer} />
        <Route path="/profile" component={ProfileManagement} />
        <Redirect from={`/`} to={token ? `/lecturer/questions` : `/auth/login`} />
      </Switch>
    </BrowserRouter>
  );
}

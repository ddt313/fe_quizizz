import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import Authentication from '../modules/Auth';
import {AuthStoreProvider} from '../modules/Auth/store';
// import {subscribeErrorsToToaster} from '../modules/ErrorHandler';
import Lecturer from '../modules/Lecturer';
import ProfileManagement from '../modules/ProfileMgmt';
import StudentManagement from '../modules/Student';

// subscribeErrorsToToaster();
export default function Routes() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <AuthStoreProvider>
        <Switch>
          <Route path="/auth" component={Authentication} />
          <Route path="/lecturer" component={Lecturer} />
          <Route path="/student" component={StudentManagement} />
          <Route path="/profile" component={ProfileManagement} />
          <Redirect from={`/`} to={token ? `/lecturer/questions` : `/auth/login`} />
        </Switch>
      </AuthStoreProvider>
    </BrowserRouter>
  );
}

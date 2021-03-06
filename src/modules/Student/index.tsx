import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import ContestManagement from './Contest';
import FinishedContests from './Contest/FinishedContest';
import {StudentStoreProvider} from './store';

const StudentManagement: React.FunctionComponent = () => {
  const {path} = useRouteMatch();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Switch>
      {token && role === 'Student' && (
        <StudentStoreProvider>
          <Switch>
            <Route path={`${path}/contests`} component={ContestManagement} />
            <Route path={`${path}/contests-history`} component={FinishedContests} />
          </Switch>
        </StudentStoreProvider>
      )}
      <Redirect from={path} to={'/auth'} />
    </Switch>
  );
};

export default StudentManagement;

import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import ClassDetails from './ClassDetails';
import Classes from './Classes';

const ClassManagement: React.FunctionComponent = () => {
  const {path} = useRouteMatch();
  const token = localStorage.getItem('token');

  return (
    <Switch>
      {token && (
        <Switch>
          <Route exact path={`${path}`} component={Classes} />
          <Route exact path={`${path}/details/:id`} component={ClassDetails} />
        </Switch>
      )}
      <Redirect from={path} to={'/auth'} />
    </Switch>
  );
};

export default ClassManagement;

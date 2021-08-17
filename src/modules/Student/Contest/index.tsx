import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import ContestDetails from './ContestDetails';
import Contests from './Contests';

const ContestManagement: React.FunctionComponent = () => {
  const {path} = useRouteMatch();
  const token = localStorage.getItem('token');

  return (
    <Switch>
      {token && (
        <Switch>
          <Route exact path={`${path}`} component={Contests} />
          <Route exact path={`${path}/details/:id`} component={ContestDetails} />
        </Switch>
      )}
      <Redirect from={path} to={'/auth'} />
    </Switch>
  );
};

export default ContestManagement;

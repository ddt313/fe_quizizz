import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import CreateQuestion from './CreateQuestion';
import QuestionDetails from './QuestionDetails';
import Questions from './Questions';

const QuestionManagement: React.FunctionComponent = () => {
  const {path} = useRouteMatch();
  const token = localStorage.getItem('token');

  return (
    <Switch>
      {token && (
        <Switch>
          <Route exact path={`${path}`} component={Questions} />
          <Route exact path={`${path}/create`} component={CreateQuestion} />
          <Route exact path={`${path}/details/:id`} component={QuestionDetails} />
        </Switch>
      )}
      <Redirect from={path} to={'/auth'} />
    </Switch>
  );
};

export default QuestionManagement;

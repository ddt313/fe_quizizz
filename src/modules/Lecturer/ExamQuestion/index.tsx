import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import ExamQuestions from './ExamQuestions';

const ExamQuestionManagement: React.FunctionComponent = () => {
  const {path} = useRouteMatch();
  const token = localStorage.getItem('token');

  return (
    <Switch>
      {token && (
        <Switch>
          <Route exact path={`${path}`} component={ExamQuestions} />
        </Switch>
      )}
      <Redirect from={path} to={'/auth'} />
    </Switch>
  );
};

export default ExamQuestionManagement;

import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import CreateExamQuestion from './CreateExamQuestion';
import ExamQuestionDetails from './ExamQuestionDetails';
import ExamQuestions from './ExamQuestions';

const ExamQuestionManagement: React.FunctionComponent = () => {
  const {path} = useRouteMatch();
  const token = localStorage.getItem('token');

  return (
    <Switch>
      {token && (
        <Switch>
          <Route exact path={`${path}`} component={ExamQuestions} />
          <Route exact path={`${path}/create`} component={CreateExamQuestion} />
          <Route exact path={`${path}/details/:id`} component={ExamQuestionDetails} />
        </Switch>
      )}
      <Redirect from={path} to={'/auth'} />
    </Switch>
  );
};

export default ExamQuestionManagement;

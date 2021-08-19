import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import CreateExam from './CreateExam';
import ExamDetails from './ExamDetails';
import Exams from './Exams';

const ExamManagement: React.FunctionComponent = () => {
  const {path} = useRouteMatch();
  const token = localStorage.getItem('token');

  return (
    <Switch>
      {token && (
        <Switch>
          <Route exact path={`${path}`} component={Exams} />
          <Route exact path={`${path}/create`} component={CreateExam} />
          <Route exact path={`${path}/details/:id`} component={ExamDetails} />
        </Switch>
      )}
      <Redirect from={path} to={'/auth'} />
    </Switch>
  );
};

export default ExamManagement;

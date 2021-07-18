import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import ExamQuestionManagement from './ExamQuestion';
import QuestionManagement from './Question';
import {LectureStoreProvider} from './store';

const LecturerManagement: React.FunctionComponent = () => {
  const {path} = useRouteMatch();
  const token = localStorage.getItem('token');

  return (
    <Switch>
      {token && (
        <LectureStoreProvider>
          <Switch>
            <Route path={`${path}/questions`} component={QuestionManagement} />
            <Route path={`${path}/exam-questions`} component={ExamQuestionManagement} />
          </Switch>
        </LectureStoreProvider>
      )}
      <Redirect from={path} to={'/auth'} />
    </Switch>
  );
};

export default LecturerManagement;

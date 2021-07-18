import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import ChangePassword from './ChangePassword';
import {ProfileStoreProvider} from './store';
import UserProfilePage from './UserProfilePage';

const ProfileManagement: React.FunctionComponent = () => {
  const {path} = useRouteMatch();
  const token = localStorage.getItem('token');

  return (
    <ProfileStoreProvider>
      <Switch>
        {token && (
          <>
            <Route exact path={`${path}`} component={UserProfilePage} />
            <Route exact path={`${path}/change-password`} component={ChangePassword} />
          </>
        )}
        <Redirect from={path} to={token ? `${path}` : `/auth`} />
      </Switch>
    </ProfileStoreProvider>
  );
};

export default ProfileManagement;

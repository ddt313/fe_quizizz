import {action, makeAutoObservable, observable} from 'mobx';
import React from 'react';

import {get, post} from '../../infra/http';
import {asyncAction} from '../../infra/mobx';

import {User} from './types';
type SubmittedPassword = {
  oldPassword: string;
  newPassword: string;
};

class ProfileStore {
  @observable user: User = {
    id: '',
    firstName: '',
    lastName: '',
    fullName: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    phoneNumber: '',
    email: '',
    skype: '',
    position: '',
    employmentDate: '',
    lengthOfService: 0,
    grade: 0,
    description: '',
    avatar: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  @asyncAction
  public *getUser() {
    this.user = yield get(`/profile`);
  }

  @action // Will be asyncAction after having an API for this one
  public updateUser(user: User) {
    return;
    console.log(user);
  }

  @asyncAction
  public *changePassword(password: SubmittedPassword) {
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    };

    yield post('/user/change-password', password, config);
  }
}
const ProfileStoreContext = React.createContext({} as ProfileStore);

export const ProfileStoreProvider = (props: any) => {
  const store = new ProfileStore();
  const {children} = props;

  return <ProfileStoreContext.Provider value={store}>{children}</ProfileStoreContext.Provider>;
};

export const useProfileStore = () => React.useContext(ProfileStoreContext);

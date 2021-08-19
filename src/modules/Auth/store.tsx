import {action, observable} from 'mobx';
import React from 'react';

import {asyncAction} from '../../infra/mobx';
import {post} from '../../infra/http';
type Auth = {
  email: string;
  password: string;
};
type AuthenticationResponse = {
  payload: {
    token: string;
    user: {
      id: string;
      name: string;
      role: string;
    };
  };
};
class AuthStore {
  @observable email = '';

  @observable role = '';

  constructor() {
    this.email = '';
    this.role = '';
  }

  @asyncAction
  public *Login(data: Auth) {
    const response: AuthenticationResponse = yield post('/auth/login', {
      email: data.email,
      password: data.password,
    });

    localStorage.setItem('token', response.payload.token);
    localStorage.setItem('name', response.payload.user.name);
    localStorage.setItem('role', response.payload.user.role);
    localStorage.setItem('id', response.payload.user.id);
  }

  @asyncAction
  public *recoveryPassword(data: any) {
    const {token, password, confirmPassword} = data;

    yield post(`/auth/reset-password`, {
      token,
      password,
      confirmPassword,
    });
  }

  @action
  public Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
  }
}
const AuthStoreContext = React.createContext({} as AuthStore);
let store: AuthStore | null = new AuthStore();

export const AuthStoreProvider = (props: any) => {
  const {children} = props;

  if (!store) {
    store = new AuthStore();
  }

  React.useEffect(
    () => () => {
      store = null;
    },
    [],
  );

  return <AuthStoreContext.Provider value={store}>{children}</AuthStoreContext.Provider>;
};

export const useAuthStore = () => React.useContext(AuthStoreContext);

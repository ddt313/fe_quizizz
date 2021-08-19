import React from 'react';
import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {observer} from 'mobx-react';

import background from '../../assets/bkbg.jpg';
import {BaseColor} from '../../theme';
import logo from '../../assets/quizizz.png';

import {useAuthStore} from './store';

const LoginPage: React.FunctionComponent = () => {
  const store = useAuthStore();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState({
    email: false,
    password: false,
  });
  const onLogin = async (event: any) => {
    event.preventDefault();
    setError({
      email: email === '',
      password: password === '',
    });
    if (Object.values(error).some((err) => err)) return;

    await store.Login({email, password});

    if (localStorage.getItem('token'))
      if (localStorage.getItem('role') === 'Lecturer') {
        window.location.href = 'http://localhost:3000/lecturer/questions';
      } else if (localStorage.getItem('role') === 'Student') {
        window.location.href = 'http://localhost:3000/student/contests';
      }
  };

  return (
    <LoginBody>
      <LoginContainer>
        <LoginFormContainer>
          <LoginForm onSubmit={onLogin}>
            <LoginTitle>{'Login'}</LoginTitle>
            <InputForm
              value={email}
              type="text"
              placeholder="Nhập email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
              onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                setError({...error, email: event.target.value === ''});
              }}
            />
            {error.email && <ErrorMessage>{'Nhập email'}</ErrorMessage>}
            <InputForm
              value={password}
              type="password"
              placeholder="Nhập mật khẩu"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
              onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                setError({...error, password: event.target.value === ''});
              }}
            />
            {error.password && <ErrorMessage>{'Nhập password'}</ErrorMessage>}
            <ForgetPassword to="/auth/forget">{`${'Quên mật khẩu'}?`}</ForgetPassword>
            <LoginButton onSubmit={onLogin} type="submit">
              {'login'}
            </LoginButton>
          </LoginForm>
        </LoginFormContainer>
        <OverlayContainer>
          <Overlay>
            <OverlayPanel>
              <img src={logo} alt="logo" style={{width: '100%'}} />
            </OverlayPanel>
          </Overlay>
        </OverlayContainer>
      </LoginContainer>
    </LoginBody>
  );
};
const ForgetPassword = styled(Link)`
  color: #030303;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;
const LoginBody = styled.div`
  * {
    box-sizing: border-box;
  }
  background-image: url(${background});
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #030303;
    opacity: 0.5;
  }
  background-position: right;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
`;
const LoginContainer = styled.div`
  ${({theme}) => css`
    background-color: ${theme.colors.background};
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  `}
`;
const LoginFormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  right: 0;
  width: 50%;
  z-index: 2;
`;
const LoginForm = styled.form`
  ${({theme}) => css`
    background-color: ${theme.colors.background};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  `}
`;
const LoginTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: bold;
  margin: 0;
`;
const InputForm = styled.input`
  background-color: #f6f6f6;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const LoginButton = styled.button`
  ${({theme}) => css`
    border-radius: 20px;
    border: 1px solid ${theme.colors.primary};
    background-color: ${theme.colors.primary};
    color: ${BaseColor.white};
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  `}
`;
const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  z-index: 1;
`;
const Overlay = styled.div`
  ${({theme}) => css`
    background: #ff416c;
    background: -webkit-linear-gradient(to right, ${theme.colors.primary}, #ff416c);
    background: linear-gradient(to right, ${theme.colors.primary}, #ff416c);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: ${BaseColor.white};
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
  `}
`;
const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  left: 0;
`;
const ErrorMessage = styled.p`
  ${({theme}) => css`
    color: ${theme.colors.error};
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
  `}
`;

export default observer(LoginPage);

import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import styled, {css} from 'styled-components';

import background from '../../assets/bkbg.jpg';
import {BaseColor} from '../../theme';
import logo from '../../assets/quizizz.png';

import {useAuthStore} from './store';

const RecoveryPasswordPage: React.FunctionComponent = () => {
  const store = useAuthStore();
  const {token}: {token: string} = useParams();
  const history = useHistory();
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [error, setError] = React.useState({
    password: false,
    confirmPassword: false,
  });

  const onRecovery = async (event: any) => {
    event.preventDefault();
    if (Object.values(error).some((err) => err)) return;
    await store.recoveryPassword({token, password, confirmPassword});

    history.push('/');
  };

  return (
    <RecoveryPasswordBody>
      <RecoveryPasswordContainer>
        <RecoveryPasswordFormContainer>
          <RecoveryPasswordForm onSubmit={onRecovery}>
            <Title>{'recovery_password'}</Title>
            <InputForm
              value={password}
              type="password"
              placeholder={'enter_password'}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
              onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                setError({...error, password: event.target.value === ''});
              }}
            />
            {error.password && <ErrorMessage>{'field_not_filled'}</ErrorMessage>}
            <InputForm
              value={confirmPassword}
              type="password"
              placeholder={'confirm_password'}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setConfirmPassword(event.target.value);
              }}
              onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                setError({...error, confirmPassword: event.target.value === ''});
              }}
            />
            {error.confirmPassword && <ErrorMessage>{'field_not_filled'}</ErrorMessage>}
            <div style={{margin: '1rem 0'}}></div>
            {password !== confirmPassword && <ErrorMessage>{'password_not_matched'}</ErrorMessage>}

            <RecoveryPasswordButton onSubmit={onRecovery}>
              {'recovery_password'}
            </RecoveryPasswordButton>
          </RecoveryPasswordForm>
        </RecoveryPasswordFormContainer>
        <OverlayContainer>
          <Overlay>
            <OverlayPanel>
              <img src={logo} alt="logo" style={{width: '100%'}} />
            </OverlayPanel>
          </Overlay>
        </OverlayContainer>
      </RecoveryPasswordContainer>
    </RecoveryPasswordBody>
  );
};

const RecoveryPasswordBody = styled.div`
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
const RecoveryPasswordContainer = styled.div`
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
const RecoveryPasswordFormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  right: 0;
  width: 50%;
  z-index: 2;
`;
const RecoveryPasswordForm = styled.form`
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
const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: bold;
  margin: 0;
  padding: 0 4rem;
`;
const InputForm = styled.input`
  background-color: #f6f6f6;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const RecoveryPasswordButton = styled.button`
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

export default RecoveryPasswordPage;

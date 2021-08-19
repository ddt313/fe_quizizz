import React from 'react';
import {Icon, Toaster, Position, Intent, Alert} from '@blueprintjs/core';
import {Link, useHistory} from 'react-router-dom';
import styled, {css} from 'styled-components';

import {BaseColor} from '../../theme/color';
import background from '../../assets/bkbg.jpg';
import logo from '../../assets/quizizz.png';
import {post} from '../../infra/http';
import {emailRegex} from '../../infra/email';
const RecoveryToaster = Toaster.create({
  className: 'recipe-toaster',
  position: Position.TOP,
});
const ForgotPasswordPage: React.FunctionComponent = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState<string>('');
  const [error, setError] = React.useState({
    email: false,
  });
  const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false);
  const onSendRecoveryLink = async (
    event: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (error.email) return;
    if (!emailRegex.test(email)) {
      RecoveryToaster.show({
        message: 'Nhập Email',
        intent: Intent.DANGER,
        timeout: 3000,
      });
    }
    await post('/auth/forgot-password', {email});
    RecoveryToaster.show({
      message: 'Liên kết khôi phục đã được gửi đến email của bạn',
      intent: Intent.SUCCESS,
      timeout: 3000,
    });
  };

  React.useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      history.push('/request');
    }
  }, [history]);

  return (
    <ForgotPasswordBody>
      <ForgotPasswordContainer>
        <ForgotPasswordFormContainer>
          <ForgotPasswordForm onSubmit={onSendRecoveryLink}>
            <ForgotPasswordTitle>{'Quên mật khẩu'}</ForgotPasswordTitle>
            <ResetInstruction>
              {'Nhập Email của bạn vào bên dưới để nhận hướng dẫn đặt lại'}
            </ResetInstruction>
            <InputForm
              value={email}
              type="text"
              placeholder={'Nhập email'}
              onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                setError({
                  ...error,
                  email: event.target.value === '',
                });
              }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
            />
            {error.email && <ErrorMessage>{'Email chưa nhập'}</ErrorMessage>}
            <ForgotPasswordButton onSubmit={onSendRecoveryLink}>
              {'Gửi liên kết khôi phục'}
            </ForgotPasswordButton>
          </ForgotPasswordForm>
        </ForgotPasswordFormContainer>
        <OverlayContainer>
          <Overlay>
            <OverlayPanel>
              <div>
                <img src={logo} alt="logo" style={{width: '100%'}} />
              </div>

              <Link to="/" style={{marginBottom: '2rem', color: 'white'}}>
                <Icon icon="arrow-left" style={{marginRight: '1rem'}} />
                {'Quay trở lại trang Login'}
              </Link>
            </OverlayPanel>
          </Overlay>
        </OverlayContainer>
      </ForgotPasswordContainer>
      <Alert
        isOpen={isAlertOpen}
        canEscapeKeyCancel
        canOutsideClickCancel
        onClose={() => setIsAlertOpen(false)}
      >
        {'message_recovery'}
      </Alert>
    </ForgotPasswordBody>
  );
};

export default ForgotPasswordPage;
const ForgotPasswordBody = styled.div`
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
const ForgotPasswordContainer = styled.div`
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
const ForgotPasswordFormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  right: 0;
  width: 50%;
  z-index: 2;
`;
const ForgotPasswordForm = styled.form`
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
const ForgotPasswordTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: bold;
  margin: 0;
`;

const ResetInstruction = styled.p`
  margin: 5rem 0 1rem 0;
  text-align: left;
  color: #808080;
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
  div {
    display: flex;
    flex: 1;
    align-items: center;
  }
`;

const InputForm = styled.input`
  background-color: #f6f6f6;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;
const ForgotPasswordButton = styled.button`
  ${({theme}) => css`
    cursor: pointer;
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
const ErrorMessage = styled.p`
  ${({theme}) => css`
    color: ${theme.colors.error};
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
  `}
`;

import React from 'react';
import styled, {css} from 'styled-components';
import {InputGroup, Button, Toaster, Position, Intent} from '@blueprintjs/core';
import {Tooltip2} from '@blueprintjs/popover2';
import {useHistory} from 'react-router';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import {BaseColor} from '../../theme';
import {Failures} from '../ErrorHandler';
import {Role} from '../../types';

import {useProfileStore} from './store';
const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}|(?=.*?[#?!@$%^&*-])$/;
const ChangePasswordErrorToaster = Toaster.create({
  className: 'recipe-toaster',
  position: Position.TOP,
});
const ChangePassword: React.FunctionComponent = () => {
  const store = useProfileStore();
  const history = useHistory();
  const [password, setPassword] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isShowedPassword, setIsShowedPassword] = React.useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [error, setError] = React.useState<string>('');
  const onSubmitChangePassword = async () => {
    const isEmptyPasswordFields = Object.values(password).some((val) => !val);

    if (isEmptyPasswordFields) {
      setError('EmptyPasswordFields');

      return;
    }
    const isPasswordValid =
      regexPassword.test(password.newPassword) && regexPassword.test(password.confirmPassword);

    if (!isPasswordValid) {
      setError('ViolateRequirement');

      return;
    }
    if (password.newPassword !== password.confirmPassword) {
      setError('UnmatchedPassword');

      return;
    }

    try {
      await store.changePassword({
        oldPassword: password.currentPassword,
        newPassword: password.newPassword,
      });
      history.push('/request');
    } catch (err) {
      if (!err.failures) {
        throw err;
      }
      err.failures.map((failure: Failures) => {
        ChangePasswordErrorToaster.show({
          message: `change_password.error.${failure.reason}`,
          intent: Intent.DANGER,
          timeout: 3000,
        });
      });
    }
  };

  return (
    <div>
      <Navbar role={Role.lecturer} />
      <TitleWrapper>
        <Title>{'change_password.title'}</Title>
      </TitleWrapper>
      <div style={{display: 'flex'}}>
        <Container>
          <ContentWrapper>
            <LabelWrapper>
              <h2>
                current_password
                <span>*</span>
              </h2>
            </LabelWrapper>

            <StyledInputGroup
              intent={error && !password.currentPassword ? Intent.DANGER : Intent.NONE}
              disabled={false}
              fill
              rightElement={
                <Tooltip2
                  content={`${isShowedPassword.currentPassword ? 'Hide' : 'Show'} Password`}
                  disabled={false}
                >
                  <Button
                    disabled={false}
                    icon={isShowedPassword.currentPassword ? 'unlock' : 'lock'}
                    intent={Intent.WARNING}
                    minimal={true}
                    onClick={() =>
                      setIsShowedPassword((prev) => ({
                        ...prev,
                        currentPassword: !prev.currentPassword,
                      }))
                    }
                  />
                </Tooltip2>
              }
              type={isShowedPassword.currentPassword ? 'text' : 'password'}
              onChange={(e) =>
                setPassword((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
            />
          </ContentWrapper>
          <ContentWrapper>
            <LabelWrapper>
              <h2>
                new_password
                <span>*</span>
              </h2>
            </LabelWrapper>
            <Tooltip2 content={'password_requirement'} placement="bottom">
              <StyledInputGroup
                intent={error && !password.newPassword ? Intent.DANGER : Intent.NONE}
                disabled={false}
                fill
                rightElement={
                  <Tooltip2
                    content={`${isShowedPassword.newPassword ? 'Hide' : 'Show'} Password`}
                    disabled={false}
                  >
                    <Button
                      disabled={false}
                      icon={isShowedPassword.newPassword ? 'unlock' : 'lock'}
                      intent={Intent.WARNING}
                      minimal={true}
                      onClick={() =>
                        setIsShowedPassword((prev) => ({
                          ...prev,
                          newPassword: !prev.newPassword,
                        }))
                      }
                    />
                  </Tooltip2>
                }
                type={isShowedPassword.newPassword ? 'text' : 'password'}
                onChange={(e) => {
                  setError('');
                  setPassword((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }));
                }}
              />
            </Tooltip2>
          </ContentWrapper>
          <ContentWrapper>
            <LabelWrapper>
              <h2>
                confirm_password
                <span>*</span>
              </h2>
            </LabelWrapper>
            <Tooltip2 content={'password_requirement'} placement="bottom">
              <StyledInputGroup
                intent={error && !password.confirmPassword ? Intent.DANGER : Intent.NONE}
                disabled={false}
                fill
                rightElement={
                  <Tooltip2
                    content={`${isShowedPassword.confirmPassword ? 'Hide' : 'Show'} Password`}
                    disabled={false}
                    interactionKind={'hover'}
                  >
                    <Button
                      disabled={false}
                      icon={isShowedPassword.confirmPassword ? 'unlock' : 'lock'}
                      intent={Intent.WARNING}
                      minimal={true}
                      onClick={() =>
                        setIsShowedPassword((prev) => ({
                          ...prev,
                          confirmPassword: !prev.confirmPassword,
                        }))
                      }
                    />
                  </Tooltip2>
                }
                type={isShowedPassword.confirmPassword ? 'text' : 'password'}
                onChange={(e) => {
                  setError('');
                  setPassword((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }));
                }}
              />
            </Tooltip2>
          </ContentWrapper>
          {error && <ErrorMessage>Change Password error</ErrorMessage>}
        </Container>
      </div>
      <ButtonWrapper>
        <SubmitButton onClick={onSubmitChangePassword}>Submit</SubmitButton>
      </ButtonWrapper>
      <Footer />
    </div>
  );
};

export default ChangePassword;
const StyledInputGroup = styled(InputGroup)`
  input {
    border-radius: 1rem;
  }
`;
const Container = styled.div`
  margin-left: 18rem;
  width: 20%;
`;
const LabelWrapper = styled.div`
  span {
    color: ${BaseColor.red};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
    font-size: 2rem;
  }
`;
const TitleWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 7rem;
  margin-left: 23rem;
  p {
    margin: 0;
    font-size: 3.6rem;
    font-weight: 400;
  }
`;
const Title = styled.p`
  ${({theme}) => css`
    margin: 0;
    font-size: 3rem;
    font-weight: 400;
    color: ${theme.colors.primary};
  `}
`;
const SubmitButton = styled.button`
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
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin: 0 3rem;
  `}
`;
const ButtonWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 8rem;
  display: flex;
  justify-content: center;
`;
const ErrorMessage = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  ${({theme}) => css`
    margin-top: 2rem;
    color: ${theme.colors.error};
    font-size: 1.5rem;
    font-weight: bold;
  `}
`;

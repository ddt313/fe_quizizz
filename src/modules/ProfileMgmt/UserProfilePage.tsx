/* eslint-disable no-unused-vars */
import React from 'react';
import styled, {css} from 'styled-components';
import {InputGroup, TextArea, Intent, RadioGroup, Radio, Position, Icon} from '@blueprintjs/core';
import {DateInput} from '@blueprintjs/datetime';
import moment from 'moment';
import {observer} from 'mobx-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {getMomentFormatter} from '../../infra/Datetime';
import {countryList, dateFormat, jobGrades} from '../../config';
import {BaseColor} from '../../theme';
import {Role} from '../../types';

import UploadAvatar from './UploadAvatar';
import {useProfileStore} from './store';
import {User} from './types';
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserProfilePage: React.FunctionComponent = observer(() => {
  const store = useProfileStore();
  const [editingUser, setEditingUser] = React.useState<User>(store.user);
  const [error, setError] = React.useState<string>('');
  const [inEditMode, setInEditMode] = React.useState<boolean>(false);
  const [genderOptions, setGenderOptions] = React.useState<string>('Male');

  const onSubmit = () => {
    // Todo: Waiting the API for Submit Form creating User

    let isEmptyFields = false;

    for (const [key, value] of Object.entries(editingUser)) {
      if (key === 'skype' || key === 'description' || key == 'avatar') continue;
      if (value === '') {
        isEmptyFields = true;

        break;
      }
    }
    if (isEmptyFields) {
      setError('EmptyFields');

      return;
    }
    if (!emailRegex.test(editingUser.email) || editingUser.phoneNumber.length !== 10) {
      setError('InformationNotValid');

      return;
    }

    setInEditMode(false);
  };

  const onCancel = () => {
    setEditingUser(store.user);
    setError('');
    setInEditMode(false);
  };

  React.useEffect(() => {
    store.getUser();
  }, [store]);
  React.useEffect(() => {
    setEditingUser(store.user);

    setGenderOptions(editingUser.gender || 'Male');
  }, [store.user]);

  return (
    <div>
      <Navbar role={Role.lecturer} />

      <TitleWrapper>
        <Title>{'general_information'}</Title>
      </TitleWrapper>

      <div style={{display: 'flex'}}>
        <Container>
          <ContentWrapper>
            <LabelWrapper>
              <h2>{'first_name'}</h2>
            </LabelWrapper>
            {inEditMode ? (
              <InputGroup
                value={editingUser.firstName}
                disabled={false}
                fill
                style={{borderRadius: '1rem '}}
                intent={error && !editingUser.firstName ? 'danger' : 'none'}
                onChange={(e) =>
                  setEditingUser((oldUser) => ({
                    ...oldUser,
                    firstName: e.target.value,
                  }))
                }
              />
            ) : (
              <ContentWrapper>{editingUser.firstName}</ContentWrapper>
            )}
          </ContentWrapper>

          <ContentWrapper>
            <LabelWrapper>
              <h2>{'last_name'}</h2>
            </LabelWrapper>
            {inEditMode ? (
              <InputGroup
                defaultValue={editingUser.lastName}
                disabled={false}
                style={{borderRadius: '1rem '}}
                fill
                intent={error && !editingUser.lastName ? 'danger' : 'none'}
                onChange={(e) =>
                  setEditingUser((oldUser) => ({
                    ...oldUser,
                    lastName: e.target.value,
                  }))
                }
              />
            ) : (
              <ContentWrapper>{editingUser.lastName}</ContentWrapper>
            )}
          </ContentWrapper>
          <ContentWrapper>
            <LabelWrapper>
              <h2>{'full_name'}</h2>
            </LabelWrapper>
            {inEditMode ? (
              <InputGroup
                defaultValue={editingUser.fullName}
                disabled={true}
                style={{borderRadius: '1rem '}}
                fill
              />
            ) : (
              <ContentWrapper>{editingUser.fullName}</ContentWrapper>
            )}
          </ContentWrapper>
          <ContentWrapper>
            <LabelWrapper>
              <h2>{'gender'}</h2>
            </LabelWrapper>
            {inEditMode ? (
              <RadioGroup
                onChange={(e) => {
                  const selectedGender = e.currentTarget.value;

                  setGenderOptions(selectedGender || 'Male');

                  setEditingUser((oldUser) => ({
                    ...oldUser,
                    gender: selectedGender,
                  }));
                }}
                selectedValue={genderOptions}
                inline
              >
                <Radio label={'male'} value="Male" />
                <Radio label={'female'} value="Female" />
              </RadioGroup>
            ) : (
              <RadioGroup
                disabled={true}
                selectedValue={editingUser.gender}
                inline
                // From the blueprintjs documents, RadioGroup must have onChange event.
                onChange={() => true}
              >
                <Radio label={'male'} value="Male" />
                <Radio label={'female'} value="Female" />
              </RadioGroup>
            )}
          </ContentWrapper>
          <ContentWrapper>
            <LabelWrapper>
              <h2>{'date_of_birth'}</h2>
            </LabelWrapper>
            {inEditMode ? (
              <DateInputWrapper error={error && !editingUser.dateOfBirth}>
                <DateInput
                  {...getMomentFormatter(dateFormat)}
                  defaultValue={moment(editingUser.dateOfBirth, dateFormat).toDate()}
                  locale="de"
                  popoverProps={{position: Position.BOTTOM}}
                  fill
                  inputProps={{leftIcon: 'calendar'}}
                  onChange={(date: Date) =>
                    setEditingUser((oldUser) => ({
                      ...oldUser,
                      dateOfBirth: date ? date.toLocaleDateString('en-GB') : oldUser.dateOfBirth,
                    }))
                  }
                />
              </DateInputWrapper>
            ) : (
              <ContentWrapper>{editingUser.dateOfBirth}</ContentWrapper>
            )}
          </ContentWrapper>
          <ContentWrapper>
            <LabelWrapper>
              <h2>{'nationality'}</h2>
            </LabelWrapper>
            {inEditMode ? (
              <SelectWrapper className="bp3-select bp3-fill bp3-large ">
                <select
                  onChange={(e) => {
                    const selectedNationality = countryList.find((data) => data === e.target.value);

                    setEditingUser((oldUser) => ({
                      ...oldUser,
                      nationality: selectedNationality || countryList[0],
                    }));
                  }}
                  value={editingUser.nationality}
                >
                  <option selected disabled>
                    {editingUser.nationality}
                  </option>
                  {countryList
                    .filter((data) => data !== editingUser.nationality)
                    .map((data, index) => (
                      <option key={index} value={data} label={data} />
                    ))}
                </select>
                <Icon icon="double-caret-vertical" />
              </SelectWrapper>
            ) : (
              <ContentWrapper>{editingUser.nationality}</ContentWrapper>
            )}
          </ContentWrapper>
        </Container>
        <Container>
          <ContentWrapper>
            <LabelWrapper>
              <h2>{'address'}</h2>
            </LabelWrapper>
            {inEditMode ? (
              <TextArea
                defaultValue={editingUser.address}
                large={true}
                fill
                growVertically
                style={{resize: 'none'}}
                intent={error && !editingUser.address ? 'danger' : 'none'}
                onChange={(e) =>
                  setEditingUser((oldUser) => ({
                    ...oldUser,
                    address: e.target.value,
                  }))
                }
              />
            ) : (
              <ContentWrapper>{editingUser.address}</ContentWrapper>
            )}
          </ContentWrapper>
          <ContentWrapper>
            <LabelWrapper>
              <h2>{'phone_number'}</h2>
            </LabelWrapper>
            {inEditMode ? (
              <NumberInputGroup
                defaultValue={editingUser.phoneNumber}
                maxLength={10}
                type={'number'}
                disabled={false}
                style={{borderRadius: '1rem '}}
                fill
                intent={
                  (error && !editingUser.phoneNumber) || editingUser.phoneNumber.length !== 10
                    ? 'danger'
                    : 'none'
                }
                onChange={(e) =>
                  setEditingUser((oldUser) => ({
                    ...oldUser,
                    phoneNumber: e.target.value,
                  }))
                }
              />
            ) : (
              <ContentWrapper>{editingUser.phoneNumber}</ContentWrapper>
            )}
          </ContentWrapper>
          <ContentWrapper>
            <LabelWrapper>
              <h2>{'email'}</h2>
            </LabelWrapper>
            {inEditMode ? (
              <InputGroup
                defaultValue={editingUser.email}
                type={'email'}
                disabled={false}
                fill
                style={{borderRadius: '1rem '}}
                intent={
                  error && (!editingUser.email || !emailRegex.test(editingUser.email))
                    ? 'danger'
                    : 'none'
                }
                onChange={(e) =>
                  setEditingUser((oldUser) => ({
                    ...oldUser,
                    email: e.target.value,
                  }))
                }
              />
            ) : (
              <ContentWrapper>{editingUser.email}</ContentWrapper>
            )}
          </ContentWrapper>

          <ContentWrapper>
            <LabelWrapper>
              <h2>{'skype'}</h2>
            </LabelWrapper>
            {inEditMode ? (
              <InputGroup
                defaultValue={editingUser.skype}
                disabled={false}
                style={{borderRadius: '1rem '}}
                fill
                onChange={(e) =>
                  setEditingUser((oldUser) => ({
                    ...oldUser,
                    skype: e.target.value,
                  }))
                }
              />
            ) : (
              <ContentWrapper>{editingUser.skype}</ContentWrapper>
            )}
          </ContentWrapper>
          <ContentWrapper>
            <LabelWrapper>
              <h2>{'position'}</h2>

              {inEditMode ? (
                <InputGroup
                  defaultValue={editingUser.position}
                  disabled={false}
                  style={{borderRadius: '1rem '}}
                  fill
                  intent={error && !editingUser.position ? 'danger' : 'none'}
                  onChange={(e) =>
                    setEditingUser((oldUser) => ({
                      ...oldUser,
                      position: e.target.value,
                    }))
                  }
                />
              ) : (
                <ContentWrapper>{editingUser.position}</ContentWrapper>
              )}
            </LabelWrapper>
          </ContentWrapper>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <ContentWrapper>
              <LabelWrapper>
                <h2>{'start_working_day'}</h2>
                {inEditMode ? (
                  <DateInputWrapper error={error && !editingUser.employmentDate}>
                    <DateInput
                      {...getMomentFormatter(dateFormat)}
                      defaultValue={moment(editingUser.employmentDate, dateFormat).toDate()}
                      locale="de"
                      popoverProps={{position: 'auto'}}
                      fill
                      inputProps={{leftIcon: 'calendar'}}
                      onChange={(date: Date) =>
                        setEditingUser((oldUser) => ({
                          ...oldUser,
                          employmentDate: date
                            ? date.toLocaleDateString('en-GB')
                            : oldUser.employmentDate,
                        }))
                      }
                    />
                  </DateInputWrapper>
                ) : (
                  <ContentWrapper>{editingUser.employmentDate}</ContentWrapper>
                )}
              </LabelWrapper>
            </ContentWrapper>
            <ContentWrapper style={{width: '20%'}}>
              <LabelWrapper>
                <h2>{'grade'}</h2>
              </LabelWrapper>

              {inEditMode ? (
                <SelectWrapper className="bp3-select bp3-fill bp3-large ">
                  <select
                    onChange={(e) => {
                      const selectedGrade = jobGrades.find(
                        (data) => data === parseInt(e.target.value, 10),
                      );

                      setEditingUser((oldUser) => ({
                        ...oldUser,
                        grade: selectedGrade || jobGrades[0],
                      }));
                    }}
                    value={editingUser.grade}
                  >
                    <option selected disabled>
                      {editingUser.grade}
                    </option>
                    {jobGrades
                      .filter((grade) => grade !== editingUser.grade)
                      .map((grade, index) => (
                        <option key={index} value={grade} label={grade.toString()} />
                      ))}
                  </select>
                  <Icon icon="double-caret-vertical" />
                </SelectWrapper>
              ) : (
                <ContentWrapper>{editingUser.grade}</ContentWrapper>
              )}
            </ContentWrapper>
          </div>
        </Container>
        <Container>
          <ContentWrapper>
            <LabelWrapper>
              <h2>{'Update Picture'}</h2>
            </LabelWrapper>
            {/* Todo: Waiting for API Upload file*/}
            <UploadAvatar inEditMode={inEditMode} />
          </ContentWrapper>
          <ContentWrapper>
            <LabelWrapper>
              <h2>{'About Yourself'}</h2>
            </LabelWrapper>
            {inEditMode ? (
              <TextArea
                defaultValue={editingUser.description}
                large={true}
                intent={Intent.PRIMARY}
                fill
                growVertically
                style={{resize: 'none'}}
                onChange={(e) =>
                  setEditingUser((oldUser) => ({
                    ...oldUser,
                    description: e.target.value,
                  }))
                }
              />
            ) : (
              <ContentWrapper>{editingUser.description}</ContentWrapper>
            )}
          </ContentWrapper>
        </Container>
      </div>
      {error && inEditMode && <ErrorMessage>{`error_message.update_users.${error}`}</ErrorMessage>}
      {inEditMode ? (
        <ButtonWrapper>
          <CancelButton onClick={() => onCancel()}>{'button.cancel'}</CancelButton>
          <SubmitButton onClick={() => onSubmit()}>{'button.submit'}</SubmitButton>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper>
          <SubmitButton onClick={() => setInEditMode(true)}>{'button.edit'}</SubmitButton>
        </ButtonWrapper>
      )}

      <Footer />
    </div>
  );
});

export default UserProfilePage;
const ErrorMessage = styled.div`
  ${({theme}) => css`
    display: flex;
    justify-content: center;
    color: ${theme.colors.error};
    font-size: 2rem;
    font-style: italic;
    margin-top: 4rem;
  `}
`;
const NumberInputGroup = styled(InputGroup)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
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
const Container = styled.div`
  margin-left: 18rem;
  width: 20%;
`;
const LabelWrapper = styled.div`
  span {
    color: red;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2rem;

  p {
    margin: 0;
  }
`;

type DateInputWrapper = {
  error?: boolean | '';
};
const DateInputWrapper = styled.div<DateInputWrapper>`
  ${({theme, error}) => css`
    border: ${error && 'solid'};
    border-color: ${error && theme.colors.error};
    border-width: ${error && '1px'};
  `}
`;
const SubmitButton = styled.button`
  border-radius: 20px;
  border: 1px solid #f05a00;
  background-color: #f05a00;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0 3rem;
`;
const CancelButton = styled.button`
  border-radius: 20px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  color: #000;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0 3rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 8rem;
  display: flex;
  justify-content: center;
`;

type SelectProp = {
  error?: boolean;
};
const SelectWrapper = styled.div<SelectProp>`
  ${({theme, error}) => css`
    &:after {
      content: none;
    }
    select {
      background-color: ${BaseColor.white};
      option:nth-child(1) {
        color: ${theme.colors.primary};
      }
    }
    border: ${error && 'solid'};
    border-color: ${error && theme.colors.error};
    border-width: ${error && '1px'};
  `}
`;

import React from 'react';
import {useHistory} from 'react-router-dom';
import styled, {css} from 'styled-components';

import Button from '../../../components/Button';
import Container from '../../../components/Container';
import Navbar from '../../../components/Navbar';
import {Role} from '../../../types';

import Table from './Table';

const ExamQuestions: React.FunctionComponent = () => {
  const history = useHistory();

  return (
    <>
      <Navbar role={Role.lecturer} />
      <Container>
        <TitleWrapper>
          <Title>Danh sách đề thi</Title>
          <ButtonWrapper>
            <Button text="Create" onClick={() => history.push('/lecturer/exam-questions/create')} />
          </ButtonWrapper>
        </TitleWrapper>
        <Table />
      </Container>
    </>
  );
};

export default ExamQuestions;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Title = styled.div`
  ${({theme}) => css`
    margin: 4rem 0 0 2rem;
    font-size: 3.6rem;
    font-weight: bold;
    color: ${theme.colors.primary};
  `}
`;

const ButtonWrapper = styled.div`
  padding-top: 4.2rem;
`;

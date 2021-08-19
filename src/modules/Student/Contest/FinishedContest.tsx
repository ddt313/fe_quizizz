import React from 'react';
import styled, {css} from 'styled-components';

import Container from '../../../components/Container';
// import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
import {Role} from '../../../types';

import TableFinished from './TableFinished';

const FinishedContests: React.FunctionComponent = () => (
  <>
    <Navbar role={Role.student} />
    <Container>
      <TitleWrapper>
        <Title>Lịch sử làm bài</Title>
      </TitleWrapper>
      <TableFinished />
    </Container>
  </>
);

export default FinishedContests;

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

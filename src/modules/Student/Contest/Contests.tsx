import React from 'react';
import styled, {css} from 'styled-components';

import Container from '../../../components/Container';
// import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
import {Role} from '../../../types';

import Table from './Table';

const Contests: React.FunctionComponent = () => (
  <>
    <Navbar role={Role.student} />
    <Container>
      <TitleWrapper>
        <Title>Danh sách bài kiểm tra</Title>
      </TitleWrapper>
      <Table />
    </Container>
  </>
);

export default Contests;

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

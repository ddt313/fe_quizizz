import {observer} from 'mobx-react';
import React from 'react';
import styled, {css} from 'styled-components';

import Container from '../../../components/Container';
import Navbar from '../../../components/Navbar';
import {Role} from '../../../types';
import {useLectureStore} from '../store';

import Table from './Table';

const Classes: React.FunctionComponent = () => {
  const store = useLectureStore();

  React.useEffect(() => {
    store.getModules();
  }, [store]);

  return (
    <>
      <Navbar role={Role.lecturer} />
      <Container>
        <TitleWrapper>
          <Title>Danh sách lớp học phần</Title>
        </TitleWrapper>
        <Table />
      </Container>
    </>
  );
};

export default observer(Classes);

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

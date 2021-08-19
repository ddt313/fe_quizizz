import React from 'react';
import styled from 'styled-components';
import {Link, NavLink} from 'react-router-dom';
import {observer} from 'mobx-react';

import Pagination from '../../../components/Pagination';
import {BaseColor} from '../../../theme';
import {useLectureStore} from '../store';
import {levels} from '../../../config';

import Filter from './Filter';

const Table: React.FunctionComponent = () => {
  const store = useLectureStore();

  React.useEffect(() => {
    store.getQuestions({page: 1, limit: store.pagination.limit});
  }, []);

  return (
    <TableWrapper>
      <Filter />
      <EmployeeTable>
        <THeader>
          <Row>
            <Column style={{width: '5rem'}}>STT</Column>
            <Column style={{width: '50rem'}}>Nội dung</Column>
            <Column>Độ khó</Column>
            <Column style={{}}>Học phần</Column>
            <Column style={{}}>Chương</Column>
            <Column style={{}}>Người tạo</Column>
            <Column style={{}}>Hành động</Column>
          </Row>
        </THeader>
        <TBody>
          {store.questions.map((cauHoi, index) => (
            <Row key={cauHoi._id}>
              <Cell>{index + 1}</Cell>
              <Cell>
                <StyledNavLink to={`questions/details/${cauHoi._id}`}>
                  {cauHoi.content}
                </StyledNavLink>
              </Cell>
              <Cell>{levels[cauHoi.level]}</Cell>
              <Cell>{cauHoi.module}</Cell>
              <Cell>{cauHoi.chapter}</Cell>
              <Cell>{cauHoi.user}</Cell>
              <Cell>
                <StyledLink to={`questions/details/${cauHoi._id}`}>Xem</StyledLink>
                <a onClick={() => store.deleteQuestion(cauHoi._id)}>Xoá</a>
              </Cell>
            </Row>
          ))}
        </TBody>
      </EmployeeTable>
      <Pagination
        pageTotal={store.pagination.pageTotal}
        onChange={({selected}) => {
          store.getQuestions({page: selected + 1, limit: store.pagination.limit});
        }}
      />
    </TableWrapper>
  );
};

export default observer(Table);

const TableWrapper = styled.div`
  margin: 5rem 2rem 8rem 2rem;
  padding: 0 3rem;
  border: solid 0.2rem ${BaseColor.gray};
  border-radius: 0.5rem;
`;

const EmployeeTable = styled.table`
  width: 100%;
  padding: 0 2.6rem;
  table-layout: fixed;
  border-collapse: collapse;
`;

const THeader = styled.thead``;

const TBody = styled.tbody`
  border: solid 0.1rem ${BaseColor.gray};
  border-radius: 0.5rem;
`;

const Row = styled.tr`
  border-radius: 0.5rem;
  border-bottom: solid 0.2rem ${BaseColor.gray};
  :hover {
    background-color: ${BaseColor.gray};
  }
`;

const Column = styled.th`
  text-align: left;
  padding: 2rem 0 2rem 1.5rem;
  font-weight: 500;
  font-size: 1.4rem;
  color: ${BaseColor.black};
`;

const Cell = styled.td`
  padding: 1.5rem 0 1.5rem 1.5rem;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 1.4rem;
  color: ${BaseColor.black};
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${BaseColor.black};

  :hover {
    text-decoration: none;
    color: ${({theme}) => theme.colors.primary};
  }
`;

const StyledLink = styled(Link)`
  margin: 0 1rem;
`;

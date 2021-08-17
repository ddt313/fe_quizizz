import React from 'react';
import styled from 'styled-components';
import {Link, NavLink} from 'react-router-dom';
import {observer} from 'mobx-react';
import moment from 'moment';

import {BaseColor} from '../../../theme';
import {useStudentStore} from '../store';
// import {dateFormat} from '../../../config';

const Table: React.FunctionComponent = () => {
  const store = useStudentStore();

  React.useEffect(() => {
    store.getContestTable();
  }, []);

  return (
    <TableWrapper>
      <EmployeeTable>
        <THeader>
          <Row>
            <Column style={{width: '4rem'}}>STT</Column>
            <Column style={{width: '8rem'}}>Học phần</Column>
            <Column style={{width: '30rem'}}>Bài kiểm tra</Column>
            <Column>Số lượng câu hỏi</Column>
            <Column style={{}}>Thời gian làm bài</Column>
            <Column style={{}}>Thời gian bắt đầu</Column>
            <Column style={{width: '10rem'}}>Làm bài</Column>
          </Row>
        </THeader>
        <TBody>
          {store.contestTable.map((contest, index) => (
            <Row key={contest._id}>
              <Cell>{index + 1}</Cell>
              <Cell>{contest.module}</Cell>
              <Cell>
                <StyledNavLink to={`contests/details/${contest._id}`}>{contest.name}</StyledNavLink>
              </Cell>
              <Cell>{contest.numberOfQuestions}</Cell>
              <Cell>{contest.doingTimeExam} phút</Cell>
              <Cell>{moment(contest.examTime).format('HH:mm:ss DD-MM-YYYY')}</Cell>
              <Cell>
                <StyledLink to={`contests/details/${contest._id}`}>Làm bài</StyledLink>
              </Cell>
            </Row>
          ))}
        </TBody>
      </EmployeeTable>
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
  margin-bottom: 2rem;
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

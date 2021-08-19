import React from 'react';
import styled from 'styled-components';
import {Link, NavLink} from 'react-router-dom';
import {observer} from 'mobx-react';

import Pagination from '../../../components/Pagination';
import {BaseColor} from '../../../theme';
import {useLectureStore} from '../store';
import SelectBox from '../../../components/SelectBox';

import Search from './Search';

// import Filter from './Filter';

const Table: React.FunctionComponent = () => {
  const store = useLectureStore();

  const [scholastic, setScholastic] = React.useState({
    _id: '1',
    name: 'Học kỳ 1 năm học 2020-2021',
  });
  const [module, setModule] = React.useState({
    _id: '1',
    name: 'Java',
  });

  React.useEffect(() => {
    store.getClasses();
  }, []);

  return (
    <TableWrapper>
      {/* <Filter /> */}
      <div style={{display: 'flex', width: '100%', marginTop: '2rem'}}>
        <div style={{width: '45rem', marginRight: '2rem'}}>
          <SelectBox
            items={[
              {_id: '1', name: 'Học kỳ 1 năm học 2020-2021'},
              {_id: '2', name: 'Học kỳ 2 năm học 2020-2021'},
              {_id: '3', name: 'Học kỳ hè năm học 2020-2021'},
              {_id: '4', name: 'Học kỳ 1 năm học 2021-2022'},
            ]}
            selectedItem={scholastic}
            onChange={(item) => {
              setScholastic(item);
            }}
          />
        </div>
        <div style={{width: '35rem', marginRight: '2rem'}}>
          <SelectBox
            items={[
              {_id: '1', name: 'Java'},
              {_id: '2', name: 'Kiểm thử phần mềm'},
              {_id: '3', name: 'Tiếng Pháp'},
              {_id: '4', name: 'Chương trình dịch'},
            ]}
            selectedItem={module}
            onChange={(item) => {
              setModule(item);
            }}
          />
        </div>
        <Search />
      </div>
      <EmployeeTable>
        <THeader>
          <Row>
            <Column style={{width: '5rem'}}>STT</Column>
            <Column style={{width: '25rem'}}>Tên lớp</Column>
            <Column style={{width: '30rem'}}>Năm học</Column>
            <Column>Số lượng</Column>
            <Column style={{}}>Học phần</Column>
            {/* <Column style={{}}>Người tạo</Column> */}
            <Column style={{}}>Hành động</Column>
          </Row>
        </THeader>
        <TBody>
          {store.classes.map((cl, index) => (
            <Row key={cl._id}>
              <Cell>{index + 1}</Cell>
              <Cell>
                <StyledNavLink to={`classes/details/${cl._id}`}>{cl.name}</StyledNavLink>
              </Cell>
              <Cell>{cl.scholastic}</Cell>
              <Cell>{cl.numberOfStudents}</Cell>
              <Cell>{cl.module}</Cell>
              <Cell>
                <StyledLink to={`classes/details/${cl._id}`}>Xem</StyledLink>
                <a onClick={() => store.deleteQuestion(cl._id)}>Xoá</a>
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

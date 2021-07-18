import React from 'react';
import styled from 'styled-components';

import {BaseColor} from '../../../theme';

import SelectBoxFilter from './SelectBoxFilter';
import Search from './Search';

const Filter: React.FunctionComponent = () => {
  const dataDoKho = [
    {id: '1', name: 'Dễ'},
    {id: '2', name: 'Trung bình'},
    {id: '3', name: 'Khó'},
  ];

  const dataHocPhan = [
    {id: '1', name: 'Kiểm thử'},
    {id: '2', name: 'Đồ án'},
    {id: '3', name: 'C++'},
    {id: '4', name: 'Java'},
  ];

  return (
    <StyledFilter>
      <SelectBoxFilter defaultSelected="Tất cả độ khó" items={dataDoKho} />
      <SelectBoxFilter defaultSelected="Tất cả học phần" items={dataHocPhan} />
      <Search />
    </StyledFilter>
  );
};

export default Filter;

const StyledFilter = styled.div`
  display: flex;
  height: 8.8rem;
  align-items: center;
  border-bottom: solid 0.2rem ${BaseColor.gray};
  background-color: ${BaseColor.white};
`;

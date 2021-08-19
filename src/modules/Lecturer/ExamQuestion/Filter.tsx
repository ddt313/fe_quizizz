import React from 'react';
import styled from 'styled-components';

import SelectBox from '../../../components/SelectBox';
import {BaseColor} from '../../../theme';

import Search from './Search';

const Filter: React.FunctionComponent = () => {
  const dataDoKho = [
    {_id: '1', name: 'Dễ'},
    {_id: '2', name: 'Trung bình'},
    {_id: '3', name: 'Khó'},
  ];

  const dataHocPhan = [
    {_id: '1', name: 'Kiểm thử'},
    {_id: '2', name: 'Đồ án'},
    {_id: '3', name: 'C++'},
    {_id: '4', name: 'Java'},
  ];

  return (
    <StyledFilter>
      <SelectBox
        items={dataDoKho}
        selectedItem={dataDoKho[0]}
        onChange={() => {
          //
        }}
      />
      <SelectBox
        items={dataHocPhan}
        selectedItem={dataHocPhan[0]}
        onChange={() => {
          //
        }}
      />
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

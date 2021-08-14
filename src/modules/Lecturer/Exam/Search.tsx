import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';

import {BaseColor} from '../../../theme';

const Search: React.FunctionComponent = () => (
  <SearchWrapper className="bp3-input-group">
    <StyledFontAwesomeIcon icon={faSearch} className="bp3-icon" />
    <StyledInput className="" type="search" placeholder="Search input" dir="auto" />
  </SearchWrapper>
);

export default Search;

const SearchWrapper = styled.div`
  width: 100%;
  border: none;
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 1.4rem;
  padding: 1.6rem 2.8rem 1.6rem 4rem;
  border: solid 0.1rem ${BaseColor.gray};
  border-radius: 5rem;

  :focus {
    border: solid 0.1rem ${BaseColor.lightOrange};
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 4rem;
  &&& {
    width: 2.1rem;
    margin-left: 1.3rem;
  }

  :hover {
    color: ${BaseColor.lightOrange};
  }
`;

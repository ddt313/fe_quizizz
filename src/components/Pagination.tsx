import React from 'react';
import ReactPaginate from 'react-paginate';
import styled, {css} from 'styled-components';

import {BaseColor} from '../theme';

const Pagination: React.FunctionComponent = () => (
  <StyledReactPaginate>
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={10}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      containerClassName={'pagination'}
      previousLinkClassName={'pagination__link'}
      nextLinkClassName={'pagination__link'}
      disabledClassName={'pagination__link--disabled'}
      activeClassName={'pagination__link--active'}
    />
  </StyledReactPaginate>
);

export default Pagination;

const StyledReactPaginate = styled.div`
  margin-top: 2.8rem;
  margin-bottom: 3.3rem;

  ${({theme}) => css`
    .pagination {
      display: flex;
      list-style: none;
      justify-content: flex-end;

      li {
        padding-left: 0.6rem;
      }
      a {
        padding: 1rem 2.2rem;
        border-radius: 0.5rem;
        border: solid 0.2rem ${BaseColor.gray};
        color: ${BaseColor.black};

        :hover {
          text-decoration: none;
          color: ${BaseColor.lightOrange};
          border: solid 0.2rem ${BaseColor.lightOrange};
        }
      }
    }
    .pagination__link {
      font-weight: lighter;
    }

    .pagination__link--active a {
      color: ${BaseColor.black};
      background: ${theme.colors.primary};
      border: solid 0.2rem ${BaseColor.lightOrange};

      :hover {
        color: ${BaseColor.black};
        background: ${theme.colors.primary};
        border: solid 0.2rem ${BaseColor.lightOrange};
        cursor: default;
      }
    }

    .pagination__link--disabled a {
      color: ${theme.colors.disable};
      border: 0.2rem solid ${theme.colors.disable};

      :hover {
        color: ${theme.colors.disable};
        border: 0.2rem solid ${theme.colors.disable};
        cursor: default;
      }
    }

    .break-me a {
      cursor: default;

      :hover {
        color: ${BaseColor.black};
        border: 0.2rem solid ${BaseColor.gray};
      }
    }
  `}
`;

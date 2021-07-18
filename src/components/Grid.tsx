import React from 'react';
import styled, {css} from 'styled-components';
type Prop = {
  xl: number;
  children: React.ReactNode;
};
const Grid: React.FunctionComponent<Prop> = (props: Prop) => {
  const {xl, children} = props;

  return <Wrapper xl={xl}>{children}</Wrapper>;
};

export default Grid;
type GridColumn = {
  xl: number;
};

const Wrapper = styled.div<GridColumn>`
  ${({xl}) => css`
    flex-basis: ${(xl * 100) / 12}%;
    max-width: ${(xl * 100) / 12}%;
    flex-grow: 0;
  `}
`;

//TODO: Create a query media for Grid System - Responsive container
// ref: https://getbootstrap.com/docs/4.0/layout/grid/

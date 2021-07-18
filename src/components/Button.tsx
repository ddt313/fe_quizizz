import React from 'react';
import styled, {css} from 'styled-components';

import {BaseColor} from '../theme';

type Prop = {
  text: string;
  onClick: () => void;
};

const Button: React.FunctionComponent<Prop> = ({text, onClick}: Prop) => (
  <StyledButton onClick={onClick}>{text}</StyledButton>
);

export default Button;

const StyledButton = styled.button`
  ${({theme}) => css`
    float: right;
    font-size: 1.4rem;
    font-weight: bold;
    padding: 1rem 3.6rem;
    margin: 0 1rem;
    color: ${BaseColor.white};
    background-color: ${theme.colors.primary};
    cursor: pointer;
    border: none;
    border-radius: 1rem;
  `};
`;

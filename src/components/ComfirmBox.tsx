import * as React from 'react';
import {Alert} from '@blueprintjs/core';
import styled, {css} from 'styled-components';

import {BaseColor} from '../theme';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message: string;
};

const ConfirmBox: React.FunctionComponent<Props> = (props: Props) => {
  const {isOpen, onCancel, onConfirm, message} = props;

  return (
    <div>
      <StyledAlert
        isOpen={isOpen}
        cancelButtonText="Không"
        confirmButtonText="Có"
        canOutsideClickCancel={true}
        canEscapeKeyCancel={true}
        onCancel={onCancel}
        onConfirm={onConfirm}
      >
        <AlertMessage>{message}</AlertMessage>
      </StyledAlert>
    </div>
  );
};

const StyledAlert = styled(Alert)`
  ${({theme}) => css`
    background-color: ${BaseColor.white};
    min-width: 40rem;
    min-height: 12rem;
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .bp3-alert-footer {
      justify-content: center;
      button {
        border-radius: 1.5rem;
        min-width: 12rem;
        padding: 0.8rem 0;
        box-shadow: none;
        background-image: none;
        outline: none;
      }
      button:last-child {
        border: 0.1rem solid ${theme.colors.primary};
        color: ${theme.colors.primary};
      }
      button:first-child {
        background-color: ${theme.colors.primary};
        color: ${BaseColor.white};
      }
    }
  `};
`;

const AlertMessage = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

export default ConfirmBox;

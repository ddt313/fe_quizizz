import React from 'react';
import {Icon, Intent} from '@blueprintjs/core';
import {Popover2} from '@blueprintjs/popover2';
import styled from 'styled-components';

type Props = {
  content?: string | JSX.Element | undefined;
  isPopOverOpen: boolean;
  children?: React.ReactNode;
  setIsPopOverOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Popover = (props: Props) => {
  const {children, content, isPopOverOpen, setIsPopOverOpen} = props;

  return (
    <Popover2
      className="select-box"
      isOpen={isPopOverOpen}
      placement="right"
      interactionKind={'click'}
      usePortal={true}
      canEscapeKeyClose={true}
      onClose={() => {
        setIsPopOverOpen(false);
      }}
      autoFocus={false}
      content={content}
    >
      <Header>
        {children}
        <Icon
          intent={Intent.NONE}
          icon="caret-down"
          style={{padding: '1rem 1rem'}}
          onClick={() => setIsPopOverOpen(!isPopOverOpen)}
        ></Icon>
      </Header>
    </Popover2>
  );
};

const Header = styled.div`
  display: flex;
`;

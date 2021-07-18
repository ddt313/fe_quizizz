import React from 'react';
import styled from 'styled-components';

import {BaseColor} from '../theme';

type Prop = {
  isListOpen: boolean;
  setIsListOpen: (value: boolean) => void;
  header: React.ReactNode;
  children?: React.ReactNode;
};

const SelectBox: React.FunctionComponent<Prop> = ({
  isListOpen,
  setIsListOpen,
  header,
  children,
}: Prop) => {
  const box = React.useRef(null);

  const useClickOutsideSelectbox = (ref: any) => {
    React.useEffect(() => {
      function handleOutsideClick(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsListOpen(false);
        }
      }
      document.addEventListener('click', handleOutsideClick);
    }, [ref]);
  };

  useClickOutsideSelectbox(box);

  return (
    <div ref={box}>
      {header}
      {isListOpen && <WrapperListItem>{children}</WrapperListItem>}
    </div>
  );
};

export default SelectBox;

const WrapperListItem = styled.div`
  position: absolute;
  cursor: pointer;
  margin-top: 0.1rem;
  border-radius: 0.5rem;
  border: solid 0.1rem ${({theme}) => theme.colors.pending};
  background-color: ${BaseColor.white};
`;

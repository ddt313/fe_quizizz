import {observer} from 'mobx-react';
import React from 'react';
import styled, {css} from 'styled-components';

import {BaseColor} from '../theme';

import {Popover} from './Popover';

type ItemSelectBox = {
  _id: string;
  name: string;
};

type Props = {
  selectedItem: ItemSelectBox;
  items: ItemSelectBox[];
  onChange: (item: ItemSelectBox) => void;
};

const SelectBox: React.FunctionComponent<Props> = ({selectedItem, items, onChange}: Props) => {
  const [isPopOverOpen, setIsPopOverOpen] = React.useState<boolean>(false);

  const toggleList = () => {
    setIsPopOverOpen(!isPopOverOpen);
  };

  const selectItem = (item: ItemSelectBox) => {
    setIsPopOverOpen(false);
    onChange(item);
  };

  return (
    <SelectBoxWrapper>
      <Popover
        isPopOverOpen={isPopOverOpen}
        setIsPopOverOpen={setIsPopOverOpen}
        content={
          <WrapperListItem>
            {items.map((item, index) => (
              <StyledItem
                className={selectedItem._id === item._id ? 'active' : ''}
                key={index}
                onClick={() => selectItem(item)}
              >
                {item.name}
              </StyledItem>
            ))}
          </WrapperListItem>
        }
      >
        <HeaderContent onClick={toggleList}>{selectedItem.name}</HeaderContent>
      </Popover>
    </SelectBoxWrapper>
  );
};

export default observer(SelectBox);

const SelectBoxWrapper = styled.div`
  display: flex;
  /* width: 60%; */
  padding: 0.1rem 0 0.1rem 1rem;
  font-size: 1.4rem;
  text-align: left;
  align-items: center;
  cursor: pointer;
  border: solid 0.1rem ${BaseColor.gray};
  border-radius: 0.5rem;

  span.select-box {
    width: 100%;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 1rem 0;
  align-items: center;
  user-select: none;
`;

const StyledItem = styled.div`
  display: block;
  padding: 0.8rem 1rem;
  margin: 0.3rem 0.2rem;
  font-size: 1.4rem;
  text-transform: capitalize;
  text-align: left;
  border-radius: 0.5rem;
  background-color: ${BaseColor.white};

  :hover {
    background-color: ${BaseColor.gray};
  }

  &.active {
    color: ${BaseColor.white};
    background-color: ${({theme}) => theme.colors.primary};
  }
`;

const WrapperListItem = styled.div`
  ${({theme}) => css`
    position: relative;
    min-width: 15rem;
    cursor: pointer;
    overflow-y: auto;
    max-height: 20rem;
    margin-top: 0.1rem;
    border-radius: 0.5rem;
    background-color: ${BaseColor.white};

    &::-webkit-scrollbar-track {
      background-color: ${BaseColor.gray};
      border-radius: 0.5rem;
      cursor: default;
    }

    &::-webkit-scrollbar {
      width: 1rem;
      cursor: default;
      border-radius: 0.5rem;
      background-color: ${BaseColor.gray};
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.primary};
      border-radius: 0.5rem;
      cursor: default;
    }
  `}
`;

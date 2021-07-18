import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

import SelectBox from '../../../components/SelectBox';
import {BaseColor} from '../../../theme';

type ItemSelectBox = {
  id: string;
  name: string;
};

type Prop = {
  defaultSelected: string;
  items: ItemSelectBox[];
};

const SelectBoxFilter: React.FunctionComponent<Prop> = ({defaultSelected, items}: Prop) => {
  const [isListOpen, setIsListOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({id: '', name: defaultSelected});
  const [activeId, setActiveId] = React.useState('');

  const toggleList = () => {
    setIsListOpen((prevState) => !prevState);
  };

  const selectItem = (item: ItemSelectBox) => {
    setIsListOpen(false);
    setSelectedItem(item);
    setActiveId(item.id);
  };

  const listItems = [{id: '', name: defaultSelected}, ...items];

  return (
    <SelectBox
      isListOpen={isListOpen}
      setIsListOpen={setIsListOpen}
      header={
        <HeaderSelectBox onClick={toggleList}>
          <p>{selectedItem.name}</p>
          <StyledIcon icon={isListOpen ? faAngleDown : faAngleUp} />
        </HeaderSelectBox>
      }
    >
      {listItems.map((item, index) => (
        <StyledItem
          className={activeId === item.id ? 'active' : ''}
          key={index}
          onClick={() => selectItem(item)}
        >
          {item.name}
        </StyledItem>
      ))}
    </SelectBox>
  );
};

export default SelectBoxFilter;

const HeaderSelectBox = styled.div`
  display: flex;
  min-width: 18rem;
  padding: 1.4rem 0.8rem 1.4rem 1.4rem;
  margin-right: 1.1rem;
  font-size: 1.4rem;
  text-transform: capitalize;
  cursor: pointer;
  border: solid 0.2rem ${BaseColor.gray};
  border-radius: 0.5rem;

  p {
    width: 85%;
    margin: 0;
  }
`;

const StyledItem = styled.div`
  display: block;
  width: 17.5rem;
  padding: 1rem 1.8rem;
  margin: 0.3rem 0.2rem;
  font-size: 1.4rem;
  text-transform: capitalize;
  border-radius: 0.5rem;
  background-color: ${BaseColor.white};

  :hover {
    background-color: ${BaseColor.gray};
  }

  &.active {
    background-color: ${({theme}) => theme.colors.primary};
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 15%;
`;

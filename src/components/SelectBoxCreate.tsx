import React from 'react';
import {
  IItemListRendererProps,
  ItemListRenderer,
  ItemRenderer,
  renderFilteredItems,
  Select,
} from '@blueprintjs/select';
import styled, {css} from 'styled-components';
import {Button} from '@blueprintjs/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import {SelectBoxType} from '../types';
import {BaseColor} from '../theme';

type Props = {
  items: SelectBoxType[];
  selectedItem: SelectBoxType;
  onSelect: (items: SelectBoxType) => void;
  onCreate: (value: string) => void;
};

const SelectBoxCreate: React.FunctionComponent<Props> = (props: Props) => {
  const {items, selectedItem, onSelect, onCreate} = props;

  const [query, setQuery] = React.useState('');

  const renderItem: ItemRenderer<SelectBoxType> = (item, {handleClick, modifiers}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    return (
      <StyledItem className={selectedItem._id === item._id ? 'active' : ''} onClick={handleClick}>
        {item.name}
      </StyledItem>
    );
  };

  const renderListItem: ItemListRenderer<SelectBoxType> = (
    itemListProps: IItemListRendererProps<SelectBoxType>,
  ) => (
    <WrapperListItem>
      {renderFilteredItems(itemListProps)}
      {itemListProps.renderCreateItem()}
    </WrapperListItem>
  );

  const createNewItemRenderer = () => (
    <StyledItem
      onClick={() => {
        onCreate(query);
        setQuery('');
      }}
    >
      Create &ldquo;{query}&rdquo;
      <IconCheck icon={faPlus} />
    </StyledItem>
  );

  return (
    <div>
      <Select
        items={items.filter((item) => item.name.toUpperCase().includes(query.toLocaleUpperCase()))}
        itemRenderer={renderItem}
        itemListRenderer={renderListItem}
        createNewItemFromQuery={(item) => ({_id: 'a', name: item})}
        createNewItemRenderer={createNewItemRenderer}
        createNewItemPosition="first"
        itemsEqual={(itemA, itemB) => itemA.name.toUpperCase() === itemB.name.toLocaleUpperCase()}
        filterable
        popoverProps={{position: 'right'}}
        resetOnSelect={true}
        onItemSelect={(item) => {
          onSelect(item);
        }}
        onQueryChange={(_, event) => {
          setQuery(event?.target.value || '');
        }}
      >
        <StyledButton text={selectedItem.name} rightIcon="caret-down" />
      </Select>
    </div>
  );
};

export default SelectBoxCreate;

const StyledItem = styled.div`
  display: flex;
  padding: 0.8rem 1rem;
  margin: 0.3rem 0.2rem;
  font-size: 1.4rem;
  text-transform: capitalize;
  align-items: center;
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

const StyledButton = styled(Button)`
  height: 4.2rem;
`;

const IconCheck = styled(FontAwesomeIcon)`
  margin-left: 0.5rem;
`;

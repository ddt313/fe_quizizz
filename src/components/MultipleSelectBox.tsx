import React from 'react';
import {
  IItemListRendererProps,
  ItemListRenderer,
  ItemRenderer,
  MultiSelect,
  renderFilteredItems,
} from '@blueprintjs/select';
import {Button} from '@blueprintjs/core';
import styled, {css} from 'styled-components';
import {faCheck, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {observer} from 'mobx-react';

import {SelectBoxType} from '../types';
import {BaseColor} from '../theme';

type Props = {
  items: SelectBoxType[];
  selectedItems: SelectBoxType[];
  onSelect: (items: SelectBoxType[]) => void;
  // isCreateNew: boolean;
};

const WorkingSkillMultipleSelectBox: React.FunctionComponent<Props> = (props: Props) => {
  const {items, selectedItems, onSelect} = props;

  const [query, setQuery] = React.useState('');
  // const [workingSkills, setWorkingSkills] = React.useState(workingSkillList.sort());

  const renderItem: ItemRenderer<SelectBoxType> = (item, {handleClick, modifiers}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    return (
      <MultipleItem onClick={handleClick}>
        <p>{item.name}</p>
        {selectedItems.indexOf(item) > -1 && <IconCheck icon={faCheck} />}
      </MultipleItem>
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
    <MultipleItem
      onClick={() => {
        setQuery('');
      }}
    >
      <p>Create &ldquo;{query}&rdquo;</p>
      <IconCheck icon={faPlus} />
    </MultipleItem>
  );

  const clearButton =
    selectedItems.length > 0 ? (
      <Button icon="cross" minimal={true} onClick={() => onSelect([])} />
    ) : undefined;

  return (
    <MultiSelect
      onRemove={(item) => {
        onSelect(selectedItems.filter((selectedItem) => selectedItem._id !== item._id));
      }}
      tagInputProps={{
        placeholder: 'Chọn lớp',
        rightElement: clearButton,
      }}
      itemListRenderer={renderListItem}
      itemRenderer={renderItem}
      itemsEqual={(itemA, itemB) => itemA._id.toUpperCase() === itemB._id.toLocaleUpperCase()}
      fill
      popoverProps={{position: 'right'}}
      resetOnSelect
      createNewItemFromQuery={(item) => ({_id: 'a', name: item})}
      createNewItemRenderer={createNewItemRenderer}
      createNewItemPosition="first"
      tagRenderer={(item) => item.name}
      query={query}
      onQueryChange={(_, event) => {
        setQuery(event?.target.value || '');
      }}
      items={items.filter((item) => item.name.toUpperCase().includes(query.toLocaleUpperCase()))}
      selectedItems={selectedItems}
      onItemSelect={(item) => {
        if (selectedItems.indexOf(item) === -1) {
          onSelect([...selectedItems, item]);
        } else {
          onSelect(selectedItems.filter((selectedItem) => selectedItem !== item));
        }
      }}
    />
  );
};

export default observer(WorkingSkillMultipleSelectBox);

const MultipleItem = styled.div`
  display: flex;
  min-width: 15rem;
  padding: 0.8rem 1rem;
  margin: 0.3rem 0.2rem;
  font-size: 1.4rem;
  justify-content: space-between;
  text-transform: capitalize;
  text-align: left;
  border-radius: 0.5rem;
  cursor: default;
  background-color: ${BaseColor.white};

  :hover {
    background-color: ${BaseColor.gray};
  }

  p {
    margin: 0;
    padding: 0;
  }

  input {
    padding: 0.6rem 0 !important;
  }
`;

const IconCheck = styled(FontAwesomeIcon)`
  margin-left: 0.5rem;
`;

const WrapperListItem = styled.div`
  ${({theme}) => css`
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
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

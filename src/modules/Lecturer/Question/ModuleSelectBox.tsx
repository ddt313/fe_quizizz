import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {observer} from 'mobx-react';

import SelectBox from '../../../components/SelectBox';
import {BaseColor} from '../../../theme';
import {useLectureStore} from '../store';

type ItemSelectBox = {
  _id: string;
  name: string;
};

const ModuleSelectBox: React.FunctionComponent = () => {
  const store = useLectureStore();
  const [isListOpen, setIsListOpen] = React.useState(false);

  React.useEffect(() => {
    store.getModules();
  }, [store]);

  React.useEffect(() => {
    if (store.chapters.find((chapter) => chapter._id === store.questionDetails.chapter._id)) {
      return;
    }
    store.questionDetails.chapter = store.chapters[0];
  }, [store.chapters]);

  const toggleList = () => {
    setIsListOpen((prevState) => !prevState);
  };

  const selectItem = (item: ItemSelectBox) => {
    setIsListOpen(false);

    store.getChapter(item._id);
    store.questionDetails.module = item;
  };

  return (
    <SelectBox
      isListOpen={isListOpen}
      setIsListOpen={setIsListOpen}
      header={
        <HeaderSelectBox onClick={toggleList}>
          <p>{store.questionDetails.module.name}</p>
          <StyledIcon icon={isListOpen ? faAngleDown : faAngleUp} />
        </HeaderSelectBox>
      }
    >
      {store.modules.map((item, index) => (
        <StyledItem
          className={store.questionDetails.module._id === item._id ? 'active' : ''}
          key={index}
          onClick={() => selectItem(item)}
        >
          {item.name}
        </StyledItem>
      ))}
    </SelectBox>
  );
};

export default observer(ModuleSelectBox);

const HeaderSelectBox = styled.div`
  display: flex;
  min-width: 22rem;
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
  width: 21.5rem;
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

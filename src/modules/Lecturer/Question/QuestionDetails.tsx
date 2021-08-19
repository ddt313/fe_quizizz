import React from 'react';
import styled from 'styled-components';
import {faCircle as faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import {faCircle as faCircleUncheck} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {observer} from 'mobx-react';
import {useParams} from 'react-router-dom';

import Button from '../../../components/Button';
import Container from '../../../components/Container';
import Grid from '../../../components/Grid';
import Navbar from '../../../components/Navbar';
import {Role} from '../../../types';
import {useLectureStore} from '../store';
import {levels} from '../../../config';
import SelectBox from '../../../components/SelectBox';
import SelectBoxCreate from '../../../components/SelectBoxCreate';

const QuestionDetails: React.FunctionComponent = () => {
  const store = useLectureStore();

  const [isEdit, setIsEdit] = React.useState(false);
  const [isRender, setIsRender] = React.useState(false);
  const [isSelectedNewModule, setIsSelectedNewModule] = React.useState(false);
  const {id}: {id: string} = useParams();

  React.useEffect(() => {
    store.getQuestionDetails(id);
    store.getModules();
  }, []);

  React.useEffect(() => {
    if (isEdit) store.getChapter(store.questionDetails.module._id);
  }, [isEdit]);

  const createNewChapter = async (moduleId: string, value: string) => {
    await store.createChapter(moduleId, value);

    store.getChapter(moduleId);
  };

  const handleRadioChange = (index: number) => {
    if (!isEdit) {
      return;
    }
    store.questionDetails.answers.find((cauHoi) => cauHoi.isTrue === true)!.isTrue = false;
    store.questionDetails.answers[index].isTrue = true;
    setIsRender(!isRender);
    console.log(isRender);
    console.log(store.questionDetails.answers);
  };

  const handleChange = (index: number, value: string) => {
    store.questionDetails.answers[index].content = value;
  };

  const handleChangeNoiDung = (value: string) => {
    store.questionDetails.content = value;
  };

  const handleEditBottonClick = () => {
    setIsEdit(true);
  };
  const handleSaveBottonClick = () => {
    setIsEdit(false);
    // post data
    store.updateQuestion(store.questionDetails);
    console.log('post data details');
  };
  const handleCancelBottonClick = () => {
    setIsEdit(false);
    store.getQuestionDetails(id);
  };

  return (
    <>
      <Navbar role={Role.lecturer} />
      <Container>
        <WrapperButton>
          {isEdit ? (
            <>
              <Button onClick={() => handleCancelBottonClick()} text="Cancel" />
              <Button onClick={() => handleSaveBottonClick()} text="Save" />
            </>
          ) : (
            <Button onClick={() => handleEditBottonClick()} text="Edit" />
          )}
        </WrapperButton>
        <WrapperContent>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Nội dung:</StyledKey>
            </Grid>
            <Grid xl={10}>
              <StyledValue>
                {isEdit ? (
                  <StyledTextArea
                    value={store.questionDetails.content}
                    onChange={(event) => handleChangeNoiDung(event.target.value)}
                  />
                ) : (
                  store.questionDetails.content
                )}
              </StyledValue>
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Câu trả lời:</StyledKey>
            </Grid>
            <Grid xl={10}>
              {store.questionDetails.answers.map((cauHoi, index) => (
                <RadioWrapper key={index}>
                  <FontAwesomeIcon
                    onClick={() => handleRadioChange(index)}
                    icon={cauHoi.isTrue ? faCircleCheck : faCircleUncheck}
                  />
                  <NoiDungCauHoi>
                    {isEdit ? (
                      <input
                        style={{width: '100%', height: '3rem'}}
                        type="text"
                        value={cauHoi.content}
                        onChange={(evevt) => handleChange(index, evevt.target.value)}
                      />
                    ) : (
                      cauHoi.content
                    )}
                  </NoiDungCauHoi>
                </RadioWrapper>
              ))}
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Học phần:</StyledKey>
            </Grid>
            <Grid xl={10}>
              {isEdit ? (
                <div style={{width: '22rem'}}>
                  <SelectBox
                    items={store.modules}
                    selectedItem={store.questionDetails.module}
                    onChange={(item) => {
                      store.getChapter(item._id);
                      store.questionDetails.module = item;
                      setIsSelectedNewModule(true);
                    }}
                  />
                </div>
              ) : (
                store.questionDetails.module.name
              )}
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Chương:</StyledKey>
            </Grid>
            <Grid xl={10}>
              {isEdit ? (
                <div style={{width: '30rem'}}>
                  {/* <SelectBox
                    items={store.chapters}
                    selectedItem={
                      isSelectedNewModule ? store.chapters[0] : store.questionDetails.chapter
                    }
                    onChange={(item) => {
                      store.questionDetails.chapter = item;
                      setIsSelectedNewModule(false);
                    }}
                  /> */}
                  <SelectBoxCreate
                    items={store.chapters}
                    selectedItem={
                      isSelectedNewModule ? store.chapters[0] : store.questionDetails.chapter
                    }
                    onSelect={(item) => {
                      store.questionDetails.chapter = item;
                      setIsSelectedNewModule(false);
                    }}
                    onCreate={(value) => {
                      createNewChapter(store.questionDetails.module._id, value);
                    }}
                  />
                </div>
              ) : (
                store.questionDetails.chapter.name
              )}
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>Độ khó:</Grid>
            <Grid xl={10}>
              {isEdit ? (
                <div style={{width: '22rem'}}>
                  <SelectBox
                    items={levels.map((level, index) => ({_id: index + '', name: level}))}
                    selectedItem={{
                      _id: store.questionDetails.level.toString(),
                      name: levels[store.questionDetails.level],
                    }}
                    onChange={(item) => {
                      store.questionDetails.level = +item._id;
                    }}
                  />
                </div>
              ) : (
                levels[store.questionDetails.level]
              )}
            </Grid>
          </WrapperContentItem>
        </WrapperContent>
      </Container>
    </>
  );
};

export default observer(QuestionDetails);

const WrapperContent = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const WrapperContentItem = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
`;

const StyledKey = styled.div`
  margin-right: 1rem;
`;

const StyledValue = styled.div``;

const WrapperButton = styled.div`
  margin: 3rem 0;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 8rem;
`;

const RadioWrapper = styled.div`
  display: flex;
`;

const NoiDungCauHoi = styled.div`
  width: 100%;
  margin-left: 1rem;
  margin-bottom: 1rem;
  cursor: default;
`;

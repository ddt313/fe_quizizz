import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {faCircle as faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import {faCircle as faCircleUncheck} from '@fortawesome/free-regular-svg-icons';
import {observer} from 'mobx-react';

import Button from '../../../components/Button';
import Container from '../../../components/Container';
import Grid from '../../../components/Grid';
import Navbar from '../../../components/Navbar';
import {Role} from '../../../types';
import {useLectureStore} from '../store';

import ChapterSelectBox from './ChapterSelectBox';
import LevelSelectBox from './LevelSelectBox';
import ModuleSelectBox from './ModuleSelectBox';

const CreateQuestion: React.FunctionComponent = () => {
  const history = useHistory();
  const store = useLectureStore();

  React.useEffect(() => {
    store.questionDetails = {
      _id: '',
      content: '',
      level: 0,
      module: {
        _id: '',
        name: '',
      },
      chapter: {
        _id: '',
        name: '',
      },
      answers: [
        {_id: '', content: '', isTrue: true},
        {_id: '', content: '', isTrue: false},
        {_id: '', content: '', isTrue: false},
        {_id: '', content: '', isTrue: false},
      ],
    };
  }, []);

  const handleRadioChange = (index: number) => {
    store.questionDetails.answers.find((cauHoi) => cauHoi.isTrue === true)!.isTrue = false;
    store.questionDetails.answers[index].isTrue = true;
  };

  const handleChange = (index: number, value: string) => {
    store.questionDetails.answers[index].content = value;
  };

  const handleChangeNoiDung = (value: string) => {
    store.questionDetails.content = value;
  };

  const handleSaveBottonClick = () => {
    // post data
    // store.questions.push({
    //   id: store.questionDetails.id,
    //   noiDung: store.questionDetails.noiDung,
    //   doKho: levels[store.questionDetails.doKho],
    //   hocPhan: store.questionDetails.hocPhan.name,
    //   nguoiTao: '@default',
    // });
    const question: any = {
      content: store.questionDetails.content,
      chapterId: store.questionDetails.chapter._id,
      answers: store.questionDetails.answers.map((answer) => ({
        content: answer.content,
        isTrue: answer.isTrue,
      })),
      level: store.questionDetails.level,
      userId: localStorage.getItem('userId'),
      dateCreate: '2020-10-10',
    };

    store.createQuestion(question);
    console.log('post data details');
    history.push('/lecturer/questions');
  };
  const handleCancelBottonClick = () => {
    history.push('/lecturer/questions');
  };

  return (
    <>
      <Navbar role={Role.lecturer} />
      <Container>
        <WrapperButton>
          <>
            <Button onClick={() => handleCancelBottonClick()} text="Cancel" />
            <Button onClick={() => handleSaveBottonClick()} text="Save" />
          </>
        </WrapperButton>
        <WrapperContent>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Nội dung:</StyledKey>
            </Grid>
            <Grid xl={10}>
              <StyledValue>
                <StyledTextArea
                  value={store.questionDetails.content}
                  onChange={(event) => handleChangeNoiDung(event.target.value)}
                />
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
                    <input
                      style={{width: '100%', height: '3rem'}}
                      type="text"
                      value={cauHoi.content}
                      onChange={(evevt) => handleChange(index, evevt.target.value)}
                    />
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
              <div style={{width: '22rem'}}>
                <ModuleSelectBox />
              </div>
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Chương:</StyledKey>
            </Grid>
            <Grid xl={10}>
              <div style={{width: '22rem'}}>
                <ChapterSelectBox />
              </div>
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>Độ khó:</Grid>
            <Grid xl={10}>
              <div style={{width: '22rem'}}>
                <LevelSelectBox />
              </div>
            </Grid>
          </WrapperContentItem>
        </WrapperContent>
      </Container>
    </>
  );
};

export default observer(CreateQuestion);

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

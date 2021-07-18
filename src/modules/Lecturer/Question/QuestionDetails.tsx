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

import ModuleSelectBox from './ModuleSelectBox';
import LevelSelectBox from './LevelSelectBox';
import ChapterSelectBox from './ChapterSelectBox';

const QuestionDetails: React.FunctionComponent = () => {
  const store = useLectureStore();

  const [isEdit, setIsEdit] = React.useState(false);
  const [isRender, setIsRender] = React.useState(false);
  const {id}: {id: string} = useParams();

  React.useEffect(() => {
    store.getQuestionDetails(+id);
  }, []);

  const handleRadioChange = (answerId: number) => {
    if (!isEdit) {
      return;
    }
    store.questionDetails.listCauHoi.find(
      (cauHoi) => cauHoi.laCauTraLoiDung === true,
    )!.laCauTraLoiDung = false;
    store.questionDetails.listCauHoi.find(
      (cauHoi) => cauHoi.id === answerId,
    )!.laCauTraLoiDung = true;
    setIsRender(!isRender);
    console.log(isRender);
    console.log(store.questionDetails.listCauHoi);
  };

  const handleChange = (index: number, value: string) => {
    store.questionDetails.listCauHoi[index].noiDung = value;
  };

  const handleChangeNoiDung = (value: string) => {
    store.questionDetails.noiDung = value;
  };

  const handleEditBottonClick = () => {
    setIsEdit(true);
  };
  const handleSaveBottonClick = () => {
    setIsEdit(false);
    // post data
    console.log('post data details');
  };
  const handleCancelBottonClick = () => {
    setIsEdit(false);
    store.getQuestionDetails(+id);
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
                    value={store.questionDetails.noiDung}
                    onChange={(event) => handleChangeNoiDung(event.target.value)}
                  />
                ) : (
                  store.questionDetails.noiDung
                )}
              </StyledValue>
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Câu trả lời:</StyledKey>
            </Grid>
            <Grid xl={10}>
              {store.questionDetails.listCauHoi.map((cauHoi, index) => (
                <RadioWrapper key={index}>
                  <FontAwesomeIcon
                    onClick={() => handleRadioChange(cauHoi.id)}
                    icon={cauHoi.laCauTraLoiDung ? faCircleCheck : faCircleUncheck}
                  />
                  <NoiDungCauHoi>
                    {isEdit ? (
                      <input
                        style={{width: '100%', height: '3rem'}}
                        type="text"
                        value={cauHoi.noiDung}
                        onChange={(evevt) => handleChange(index, evevt.target.value)}
                      />
                    ) : (
                      cauHoi.noiDung
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
                  <ModuleSelectBox />
                </div>
              ) : (
                store.questionDetails.hocPhan.name
              )}
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Chương:</StyledKey>
            </Grid>
            <Grid xl={10}>
              {isEdit ? (
                <div style={{width: '22rem'}}>
                  <ChapterSelectBox />
                </div>
              ) : (
                store.questionDetails.chuong.name
              )}
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>Độ khó:</Grid>
            <Grid xl={10}>
              {isEdit ? (
                <div style={{width: '22rem'}}>
                  <LevelSelectBox />
                </div>
              ) : (
                levels[store.questionDetails.doKho]
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

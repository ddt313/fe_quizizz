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
      id: 11,
      noiDung: '',
      doKho: 0,
      hocPhan: {
        id: 0,
        name: '',
      },
      chuong: {
        id: 0,
        name: '',
      },
      listCauHoi: [
        {id: 1, noiDung: '', laCauTraLoiDung: true},
        {id: 2, noiDung: '', laCauTraLoiDung: false},
        {id: 3, noiDung: '', laCauTraLoiDung: false},
        {id: 4, noiDung: '', laCauTraLoiDung: false},
      ],
    };
  }, []);

  const handleRadioChange = (answerId: number) => {
    store.questionDetails.listCauHoi.find(
      (cauHoi) => cauHoi.laCauTraLoiDung === true,
    )!.laCauTraLoiDung = false;
    store.questionDetails.listCauHoi.find(
      (cauHoi) => cauHoi.id === answerId,
    )!.laCauTraLoiDung = true;
  };

  const handleChange = (index: number, value: string) => {
    store.questionDetails.listCauHoi[index].noiDung = value;
  };

  const handleChangeNoiDung = (value: string) => {
    store.questionDetails.noiDung = value;
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
                  value={store.questionDetails.noiDung}
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
              {store.questionDetails.listCauHoi.map((cauHoi, index) => (
                <RadioWrapper key={index}>
                  <FontAwesomeIcon
                    onClick={() => handleRadioChange(cauHoi.id)}
                    icon={cauHoi.laCauTraLoiDung ? faCircleCheck : faCircleUncheck}
                  />
                  <NoiDungCauHoi>
                    <input
                      style={{width: '100%', height: '3rem'}}
                      type="text"
                      value={cauHoi.noiDung}
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

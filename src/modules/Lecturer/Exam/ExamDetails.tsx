import {observer} from 'mobx-react';
import React from 'react';
import {Link, useParams} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {DateInput} from '@blueprintjs/datetime';
import moment from 'moment';

import Button from '../../../components/Button';
import Container from '../../../components/Container';
import Grid from '../../../components/Grid';
import Navbar from '../../../components/Navbar';
import {BaseColor} from '../../../theme';
import {Role} from '../../../types';
import {useLectureStore} from '../store';
import SelectBox from '../../../components/SelectBox';
import MultipleSelectBox from '../../../components/MultipleSelectBox';
import {getMomentFormatter} from '../../../infra/Datetime';
import {dateFormat, minDate} from '../../../config';

const ExamDetails: React.FunctionComponent = () => {
  const store = useLectureStore();

  const [isEdit, setIsEdit] = React.useState(false);

  const {id}: {id: string} = useParams();

  React.useEffect(() => {
    store.getExamById(id);
    store.getModules();
    store.getListNameClasses();
  }, []);

  const handleEditBottonClick = () => {
    setIsEdit(true);
  };
  const handleSaveBottonClick = () => {
    setIsEdit(false);
    store.updateExamQuestion(id, {
      content: store.examQuestionDetails.content,
      moduleId: store.examQuestionDetails.module._id,
      questions: store.examQuestionDetails.questions.map((question) => question._id),
      userId: store.userId,
    });
  };
  const handleCancelBottonClick = () => {
    setIsEdit(false);
  };
  const handleChangeNoiDung = (value: string) => {
    // store.examQuestionDetails.content = value;
    console.log(store.examDetails, value);
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
        {store.examDetails._id && (
          <WrapperContent>
            <WrapperContentItem>
              <Grid xl={2}>
                <StyledKey>Tên kỳ thi:</StyledKey>
              </Grid>
              <Grid xl={10}>
                <StyledValue>
                  {isEdit ? (
                    <StyledTextArea
                      value={store.examDetails.name}
                      onChange={(event) => handleChangeNoiDung(event.target.value)}
                    />
                  ) : (
                    store.examDetails.name
                  )}
                </StyledValue>
              </Grid>
            </WrapperContentItem>
            <WrapperContentItem>
              <Grid xl={2}>
                <StyledKey>Học phần:</StyledKey>
              </Grid>
              <Grid xl={10}>
                <StyledValue>
                  {isEdit ? (
                    <div style={{width: '22rem'}}>
                      <SelectBox
                        items={store.modules.map((module) => ({
                          _id: module._id,
                          name: module.name,
                        }))}
                        defaultSelected={store.examDetails.module}
                        onChange={(item) => {
                          store.examDetails.module = item;
                        }}
                      />
                    </div>
                  ) : (
                    store.examDetails.module.name
                  )}
                </StyledValue>
              </Grid>
            </WrapperContentItem>
            <WrapperContentItem>
              <Grid xl={2}>
                <StyledKey>Thời gian:</StyledKey>
              </Grid>
              <Grid xl={10}>
                <StyledValue>
                  {isEdit ? (
                    <div style={{width: '22rem'}}>
                      <DateInputWrapper>
                        <DateInput
                          {...getMomentFormatter(dateFormat)}
                          popoverProps={{position: 'right'}}
                          fill
                          inputProps={{leftIcon: 'calendar'}}
                          value={new Date(store.examDetails.examTime)}
                          minDate={minDate}
                          maxDate={new Date(Date.now())}
                          onChange={(date: Date) => {
                            store.examDetails.examTime = date;
                          }}
                        />
                      </DateInputWrapper>
                    </div>
                  ) : (
                    moment(store.examDetails.examTime).format(dateFormat)
                  )}
                </StyledValue>
              </Grid>
            </WrapperContentItem>
            <WrapperContentItem>
              <Grid xl={2}>
                <StyledKey>Thời lượng:</StyledKey>
              </Grid>
              <Grid xl={10}>
                <StyledValue>
                  {isEdit ? (
                    <div style={{width: '22rem'}}>
                      <input
                        value={store.examDetails.doingExamTime}
                        onChange={(event) => {
                          store.examDetails.doingExamTime = +event.target.value;
                        }}
                      />
                    </div>
                  ) : (
                    store.examDetails.doingExamTime + ' phút'
                  )}
                </StyledValue>
              </Grid>
            </WrapperContentItem>
            <WrapperContentItem>
              <Grid xl={2}>
                <StyledKey>Danh sách lớp:</StyledKey>
                {/* {isEdit && <Button text="Thêm" onClick={() => setInAddQuestions(true)} />} */}
              </Grid>
              <Grid xl={10}>
                <StyledValue>
                  <QuestionsWrapper>
                    {isEdit ? (
                      <div style={{width: '25%'}}>
                        <MultipleSelectBox
                          items={store.nameClasses}
                          onSelect={(items) => {
                            store.examDetails.class = items;
                          }}
                          selectedItems={store.examDetails.class}
                        />
                      </div>
                    ) : (
                      store.examDetails.class.map((c) => c.name + '; ')
                    )}
                  </QuestionsWrapper>
                </StyledValue>
              </Grid>
            </WrapperContentItem>
            <WrapperContentItem>
              <Grid xl={2}>
                <StyledKey>Danh sách đề:</StyledKey>
                {/* {isEdit && <Button text="Thêm" onClick={() => setInAddQuestions(true)} />} */}
              </Grid>
              <Grid xl={10}>
                <StyledValue>
                  <QuestionsWrapper>
                    {store.examDetails.examQuestions.map((question) => (
                      <QuestionWrapper key={question._id}>
                        <div>{question.content}</div>
                        <div>
                          <Link
                            style={{marginRight: '1rem'}}
                            to={`/lecturer/exam-questions/details/${question._id}`}
                            target="true"
                          >
                            Xem
                          </Link>
                          {isEdit && (
                            <a
                              style={{marginRight: '1rem'}}
                              onClick={() => console.log('xoa', question._id)}
                            >
                              Xoá
                            </a>
                          )}
                        </div>
                      </QuestionWrapper>
                    ))}
                  </QuestionsWrapper>
                </StyledValue>
              </Grid>
            </WrapperContentItem>
          </WrapperContent>
        )}
      </Container>
    </>
  );
};

export default observer(ExamDetails);

const WrapperButton = styled.div`
  margin: 3rem 0;
`;

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

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 8rem;
`;

const QuestionsWrapper = styled.div`
  ${({theme}) => css`
    max-height: 30rem;
    overflow-y: auto;

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

const QuestionWrapper = styled.div`
  display: flex;
  height: 3rem;
  margin-bottom: 1rem;
  justify-content: space-between;
  border-bottom: solid 0.1rem black;
`;

const DateInputWrapper = styled.div`
  width: 60%;

  span {
    margin: 1.3rem 0.7rem !important;
  }

  input {
    padding: 2.1rem 0 2.1rem 3rem;
  }
`;

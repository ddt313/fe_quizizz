import {observer} from 'mobx-react';
import React from 'react';
import {Link, useParams} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {DateInput, TimePrecision} from '@blueprintjs/datetime';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';

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
import {dateTimeFormat, maxDate, minDate} from '../../../config';

const ExamDetails: React.FunctionComponent = () => {
  const store = useLectureStore();

  const [isEdit, setIsEdit] = React.useState(false);
  const [inAddQuestions, setInAddQuestions] = React.useState(false);
  const [examQuestionsEnable, setExamQuestionsEnable] = React.useState(store.examQuestions);

  const {id}: {id: string} = useParams();

  React.useEffect(() => {
    store.getExamById(id);
    store.getModules();
    store.getListNameClasses();
    store.getExamQuestions({page: 1, limit: 1000});
  }, []);

  React.useEffect(() => {
    setExamQuestionsEnable(
      store.examQuestions.filter(
        (examQuestion) =>
          !store.examDetails.examQuestions.some((eq) => eq._id === examQuestion._id),
      ),
    );
  }, [store.examQuestions, store.examDetails.examQuestions]);

  const handleEditBottonClick = () => {
    setIsEdit(true);
  };
  const handleSaveBottonClick = () => {
    setIsEdit(false);
    store.updateExam(id, {
      name: store.examDetails.name,
      moduleId: store.examDetails.module._id,
      classId: store.examDetails.class.map((c) => c._id),
      examQuestions: store.examDetails.examQuestions.map((eq) => eq._id),
      doingExamTime: store.examDetails.doingExamTime,
      examTime: store.examDetails.examTime,
      lecturerId: store.userId,
    });
  };
  const handleCancelBottonClick = () => {
    setIsEdit(false);
    store.getExamById(id);
  };
  const handleChangeNoiDung = (value: string) => {
    store.examDetails.name = value;
  };

  const handleAddQuestion = ({_id, content}: {_id: string; content: string}) => {
    store.examDetails.examQuestions.push({_id, content});

    store.examDetails.examQuestions = [...store.examDetails.examQuestions];
  };

  return (
    <>
      <Navbar role={Role.lecturer} />
      <Container>
        {inAddQuestions && (
          <AddExamQuestionWrapper>
            <AddExamQuestionHeader>
              <Title>
                <h2>Th??m ????? thi</h2>
              </Title>
              <IconCloseWrapper>
                <StyledIcon onClick={() => setInAddQuestions(false)} icon={faTimesCircle} />
              </IconCloseWrapper>
            </AddExamQuestionHeader>
            <AddQuestionContent>
              <QuestionsWrapper>
                {examQuestionsEnable.map((examQuestion) => (
                  <QuestionWrapper key={examQuestion._id}>
                    {examQuestion.content}
                    <div>
                      <a
                        style={{marginRight: '1rem'}}
                        href={`/lecturer/exam-questions/details/${examQuestion._id}`}
                        target="blank"
                      >
                        Xem
                      </a>
                      {isEdit && (
                        <a
                          style={{marginRight: '1rem'}}
                          onClick={() =>
                            handleAddQuestion({
                              _id: examQuestion._id,
                              content: examQuestion.content,
                            })
                          }
                        >
                          Th??m
                        </a>
                      )}
                    </div>
                  </QuestionWrapper>
                ))}
              </QuestionsWrapper>
            </AddQuestionContent>
          </AddExamQuestionWrapper>
        )}
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
                <StyledKey>T??n k??? thi:</StyledKey>
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
                <StyledKey>H???c ph???n:</StyledKey>
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
                        selectedItem={store.examDetails.module}
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
                <StyledKey>Th???i gian:</StyledKey>
              </Grid>
              <Grid xl={10}>
                <StyledValue>
                  {isEdit ? (
                    <div style={{width: '30rem'}}>
                      <DateInputWrapper>
                        <DateInput
                          {...getMomentFormatter(dateTimeFormat)}
                          popoverProps={{position: 'right'}}
                          fill
                          closeOnSelection={false}
                          timePickerProps={{
                            precision: TimePrecision.MINUTE,
                            showArrowButtons: true,
                          }}
                          inputProps={{leftIcon: 'calendar'}}
                          value={new Date(store.examDetails.examTime)}
                          minDate={minDate}
                          maxDate={maxDate}
                          onChange={(date: Date) => {
                            store.examDetails.examTime = date;
                          }}
                        />
                      </DateInputWrapper>
                    </div>
                  ) : (
                    moment(store.examDetails.examTime).format(dateTimeFormat)
                  )}
                </StyledValue>
              </Grid>
            </WrapperContentItem>
            <WrapperContentItem>
              <Grid xl={2}>
                <StyledKey>Th???i l?????ng:</StyledKey>
              </Grid>
              <Grid xl={10}>
                <StyledValue>
                  {isEdit ? (
                    <div style={{width: '22rem'}}>
                      <Input
                        type="number"
                        value={store.examDetails.doingExamTime}
                        onChange={(event) => {
                          store.examDetails.doingExamTime = +event.target.value;
                        }}
                      />
                    </div>
                  ) : (
                    store.examDetails.doingExamTime + ' ph??t'
                  )}
                </StyledValue>
              </Grid>
            </WrapperContentItem>
            <WrapperContentItem>
              <Grid xl={2}>
                <StyledKey>Danh s??ch l???p:</StyledKey>
              </Grid>
              <Grid xl={10}>
                <StyledValue>
                  <QuestionsWrapper>
                    {isEdit ? (
                      <div style={{width: '25%'}}>
                        <MultipleSelectBox
                          items={store.nameClasses}
                          onSelect={(items) => {
                            store.examDetails.class = [...items];
                          }}
                          selectedItems={[...store.examDetails.class]}
                        />
                      </div>
                    ) : store.examDetails.class.length === 0 ? (
                      'Tr???ng'
                    ) : (
                      store.examDetails.class.map((c) => c.name + '; ')
                    )}
                  </QuestionsWrapper>
                </StyledValue>
              </Grid>
            </WrapperContentItem>
            <WrapperContentItem>
              <Grid xl={2}>
                <StyledKey>Danh s??ch ?????:</StyledKey>
                {isEdit && (
                  <Button
                    text="Th??m"
                    onClick={() => {
                      setInAddQuestions(true);
                    }}
                  />
                )}
              </Grid>
              <Grid xl={10}>
                <StyledValue>
                  <QuestionsWrapper>
                    {store.examDetails.examQuestions.map((examQuestion) => (
                      <QuestionWrapper key={examQuestion._id}>
                        <div>{examQuestion.content}</div>
                        <div>
                          <Link
                            style={{marginRight: '1rem'}}
                            to={`/lecturer/exam-questions/details/${examQuestion._id}`}
                            target="true"
                          >
                            Xem
                          </Link>
                          {isEdit && (
                            <a
                              style={{marginRight: '1rem'}}
                              onClick={() => {
                                store.examDetails.examQuestions = store.examDetails.examQuestions.filter(
                                  (eq) => eq._id !== examQuestion._id,
                                );
                              }}
                            >
                              Xo??
                            </a>
                          )}
                        </div>
                      </QuestionWrapper>
                    ))}
                  </QuestionsWrapper>
                </StyledValue>
              </Grid>
            </WrapperContentItem>
            {store.examDetails.finished && store.examDetails.finished.length > 0 && (
              <WrapperContentItem>
                <Grid xl={2}>
                  <StyledKey>Danh ??i???m Sinh vi??n:</StyledKey>
                </Grid>
                <Grid xl={10}>
                  <StyledValue>
                    <QuestionsWrapper>
                      {store.examDetails.finished.map((st) => (
                        <QuestionWrapper key={st._id}>
                          <div>
                            <span>MSSV: {st.studentId.studentId}</span>
                            <span style={{margin: '0 2rem'}}>H??? v?? t??n: {st.studentId.name}</span>
                            <span>??i???m: {Math.round(st.score * 100) / 100}</span>
                          </div>
                        </QuestionWrapper>
                      ))}
                    </QuestionsWrapper>
                  </StyledValue>
                </Grid>
              </WrapperContentItem>
            )}
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
  font-family: 'Roboto';
  font-size: 1.4rem;
  border-radius: 0.5rem;
  border: solid 0.1rem ${BaseColor.gray};
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

const Input = styled.input`
  height: 3.8rem;
  text-indent: 1rem;
  border-radius: 0.5rem;
  border: solid 0.1rem ${BaseColor.gray};
`;

const AddExamQuestionWrapper = styled.div`
  width: 110rem;
  height: 50rem;
  position: absolute;
  top: 10%;
  left: 10%;
  border-radius: 0.5rem;
  border: solid 0.2rem gray;
  background-color: white;
  z-index: 99;
`;

const AddExamQuestionHeader = styled.div`
  display: flex;
`;

const Title = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
`;

const IconCloseWrapper = styled.div`
  display: flex;
  width: 20%;
  padding: 1rem 1rem;
  justify-content: flex-end;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  height: 2rem;
  &&& {
    width: 2rem;
  }
  :hover {
    cursor: pointer;
    color: ${BaseColor.lightOrange};
  }
`;

const AddQuestionContent = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
`;

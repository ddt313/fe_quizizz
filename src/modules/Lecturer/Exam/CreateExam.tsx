import {observer} from 'mobx-react';
import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {DateInput, TimePrecision} from '@blueprintjs/datetime';
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

const CreateExam: React.FunctionComponent = () => {
  const store = useLectureStore();
  const history = useHistory();

  const [inAddQuestions, setInAddQuestions] = React.useState(false);
  const [examQuestionsEnable, setExamQuestionsEnable] = React.useState(store.examQuestions);

  React.useEffect(() => {
    store.examDetails = {
      _id: '',
      name: '',
      examTime: new Date(),
      doingExamTime: 0,
      class: [],
      examQuestions: [],
      module: {
        _id: '',
        name: '',
      },
    };
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

  const handleSaveBottonClick = () => {
    store.createExam({
      name: store.examDetails.name,
      moduleId: store.examDetails.module._id,
      classId: store.examDetails.class.map((c) => c._id),
      examQuestions: store.examDetails.examQuestions.map((eq) => eq._id),
      doingExamTime: store.examDetails.doingExamTime,
      examTime: store.examDetails.examTime,
      lecturerId: store.userId,
    });
    history.push('/lecturer/exams');
  };
  const handleCancelBottonClick = () => {
    history.push('/lecturer/exams');
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
                <h2>Thêm đề thi</h2>
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
                      <a
                        style={{marginRight: '1rem'}}
                        onClick={() =>
                          handleAddQuestion({
                            _id: examQuestion._id,
                            content: examQuestion.content,
                          })
                        }
                      >
                        Thêm
                      </a>
                    </div>
                  </QuestionWrapper>
                ))}
              </QuestionsWrapper>
            </AddQuestionContent>
          </AddExamQuestionWrapper>
        )}
        <WrapperButton>
          <>
            <Button onClick={() => handleCancelBottonClick()} text="Cancel" />
            <Button onClick={() => handleSaveBottonClick()} text="Save" />
          </>
        </WrapperButton>

        <WrapperContent>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Tên kỳ thi:</StyledKey>
            </Grid>
            <Grid xl={10}>
              <StyledValue>
                <StyledTextArea
                  value={store.examDetails.name}
                  onChange={(event) => handleChangeNoiDung(event.target.value)}
                />
              </StyledValue>
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Học phần:</StyledKey>
            </Grid>
            <Grid xl={10}>
              <StyledValue>
                <div style={{width: '22rem'}}>
                  <SelectBox
                    items={store.modules[0] ? store.modules : []}
                    selectedItem={store.examDetails.module}
                    onChange={(item) => {
                      store.examDetails.module = item;
                    }}
                  />
                </div>
              </StyledValue>
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Thời gian:</StyledKey>
            </Grid>
            <Grid xl={10}>
              <StyledValue>
                <div style={{width: '30rem'}}>
                  <DateInputWrapper>
                    <DateInput
                      {...getMomentFormatter(dateTimeFormat)}
                      popoverProps={{position: 'right'}}
                      fill
                      closeOnSelection={false}
                      timePickerProps={{precision: TimePrecision.MINUTE, showArrowButtons: true}}
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
              </StyledValue>
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Thời lượng:</StyledKey>
            </Grid>
            <Grid xl={10}>
              <StyledValue>
                <div style={{width: '22rem'}}>
                  <Input
                    type="number"
                    value={store.examDetails.doingExamTime}
                    onChange={(event) => {
                      store.examDetails.doingExamTime = +event.target.value;
                    }}
                  />
                </div>
              </StyledValue>
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Danh sách lớp:</StyledKey>
            </Grid>
            <Grid xl={10}>
              <StyledValue>
                <QuestionsWrapper>
                  <div style={{width: '25%'}}>
                    <MultipleSelectBox
                      items={store.nameClasses}
                      onSelect={(items) => {
                        store.examDetails.class = [...items];
                      }}
                      selectedItems={store.examDetails.class}
                    />
                  </div>
                </QuestionsWrapper>
              </StyledValue>
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Danh sách đề:</StyledKey>

              <Button
                text="Thêm"
                onClick={() => {
                  setInAddQuestions(true);
                }}
              />
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

                        <a
                          style={{marginRight: '1rem'}}
                          onClick={() => {
                            store.examDetails.examQuestions = store.examDetails.examQuestions.filter(
                              (eq) => eq._id !== examQuestion._id,
                            );
                          }}
                        >
                          Xoá
                        </a>
                      </div>
                    </QuestionWrapper>
                  ))}
                </QuestionsWrapper>
              </StyledValue>
            </Grid>
          </WrapperContentItem>
        </WrapperContent>
      </Container>
    </>
  );
};

export default observer(CreateExam);

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

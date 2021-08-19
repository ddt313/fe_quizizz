import {observer} from 'mobx-react';
import React from 'react';
import {Link, useParams} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Button from '../../../components/Button';
import Container from '../../../components/Container';
import Grid from '../../../components/Grid';
import Navbar from '../../../components/Navbar';
import {BaseColor} from '../../../theme';
import {QuestionTable, Role} from '../../../types';
import {useLectureStore} from '../store';
import {levels} from '../../../config';
import SelectBox from '../../../components/SelectBox';

const ExamQuestionDetails: React.FunctionComponent = () => {
  const store = useLectureStore();

  const [isEdit, setIsEdit] = React.useState(false);
  const [inAddQuestions, setInAddQuestions] = React.useState(false);
  const [questionsEnable, setQuestionsEnable] = React.useState(store.questions);

  const {id}: {id: string} = useParams();

  React.useEffect(() => {
    store.getExamQuestionDetails(id);
    store.getModules();
    store.getListNameExams();
    store.getQuestions({limit: 1000, page: 1});
  }, []);

  React.useEffect(() => {
    setQuestionsEnable(
      store.questions.filter(
        (question) => !store.examQuestionDetails.questions.some((q) => q._id === question._id),
      ),
    );
  }, [store.questions, store.examQuestionDetails.questions]);

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
    store.getExamQuestionDetails(id);
  };
  const handleChangeNoiDung = (value: string) => {
    store.examQuestionDetails.content = value;
  };

  const handleAddQuestion = (question: QuestionTable) => {
    const q = {
      _id: question._id,
      content: question.content,
      chapter: '',
      level: question.level,
    };

    // store.examQuestionDetails.questions = [...store.examQuestionDetails.questions];
    store.examQuestionDetails.questions.push(q);
    store.examQuestionDetails.questions = [...store.examQuestionDetails.questions];
  };

  return (
    <>
      <Navbar role={Role.lecturer} />
      <Container>
        {inAddQuestions && (
          <AddQuestionWrapper>
            <AddQuestionHeader>
              <Title>
                <h2>Thêm câu hỏi</h2>
              </Title>
              <IconCloseWrapper>
                <StyledIcon onClick={() => setInAddQuestions(false)} icon={faTimesCircle} />
              </IconCloseWrapper>
            </AddQuestionHeader>
            <AddQuestionContent>
              <QuestionsWrapper>
                {questionsEnable.map((question) => (
                  <QuestionWrapper key={question._id}>
                    {question.content}
                    <div>
                      <Link
                        style={{marginRight: '1rem'}}
                        to={`/lecturer/questions/details/${question._id}`}
                      >
                        Xem
                      </Link>
                      {isEdit && (
                        <a
                          style={{marginRight: '1rem'}}
                          onClick={() => handleAddQuestion(question)}
                        >
                          Thêm
                        </a>
                      )}
                    </div>
                  </QuestionWrapper>
                ))}
              </QuestionsWrapper>
            </AddQuestionContent>
          </AddQuestionWrapper>
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
        <WrapperContent>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Nội dung:</StyledKey>
            </Grid>
            <Grid xl={10}>
              <StyledValue>
                {isEdit ? (
                  <StyledTextArea
                    value={store.examQuestionDetails.content}
                    onChange={(event) => handleChangeNoiDung(event.target.value)}
                  />
                ) : (
                  store.examQuestionDetails.content
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
                      items={store.modules.map((module) => ({_id: module._id, name: module.name}))}
                      selectedItem={store.examQuestionDetails.module}
                      onChange={(item) => {
                        store.examQuestionDetails.module = item;
                      }}
                    />
                  </div>
                ) : (
                  store.examQuestionDetails.module.name
                )}
              </StyledValue>
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Kỳ thi:</StyledKey>
            </Grid>
            <Grid xl={10}>
              <StyledValue>
                {isEdit ? (
                  <div style={{width: '55rem'}}>
                    <SelectBox
                      items={store.listNameExams}
                      selectedItem={store.examQuestionDetails.exam}
                      onChange={(item) => {
                        store.examQuestionDetails.exam = item;
                      }}
                    />
                  </div>
                ) : (
                  store.examQuestionDetails.exam.name
                )}
              </StyledValue>
            </Grid>
          </WrapperContentItem>
          <WrapperContentItem>
            <Grid xl={2}>
              <StyledKey>Danh sách câu hỏi:</StyledKey>
              {isEdit && <Button text="Thêm" onClick={() => setInAddQuestions(true)} />}
            </Grid>
            <Grid xl={10}>
              <StyledValue>
                <QuestionsWrapper>
                  {store.examQuestionDetails.questions.map((question) => (
                    <QuestionWrapper key={question._id}>
                      <div>
                        {question.content} | {question.chapter} | {levels[question.level]}
                      </div>
                      <div>
                        <Link
                          style={{marginRight: '1rem'}}
                          to={`/lecturer/questions/details/${question._id}`}
                          target="true"
                        >
                          Xem
                        </Link>
                        {isEdit && (
                          <a
                            style={{marginRight: '1rem'}}
                            onClick={() => {
                              store.examQuestionDetails.questions = [
                                ...store.examQuestionDetails.questions.filter(
                                  (q) => q._id !== question._id,
                                ),
                              ] as [
                                {
                                  _id: string;
                                  content: string;
                                  chapter: string;
                                  level: number;
                                },
                              ];
                            }}
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
      </Container>
    </>
  );
};

export default observer(ExamQuestionDetails);

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

const AddQuestionWrapper = styled.div`
  width: 110rem;
  height: 50rem;
  position: absolute;
  top: 10%;
  left: 10%;
  border-radius: 0.5rem;
  border: solid 0.2rem gray;
  background-color: white;
`;

const AddQuestionHeader = styled.div`
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

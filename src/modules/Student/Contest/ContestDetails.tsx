import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {observer} from 'mobx-react';
import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import {faCircle as faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import {faCircle as faCircleUncheck} from '@fortawesome/free-regular-svg-icons';

import Container from '../../../components/Container';
import Navbar from '../../../components/Navbar';
import {BaseColor} from '../../../theme';
import {Role} from '../../../types';
import {useStudentStore} from '../store';
import Button from '../../../components/Button';
import ConfirmBox from '../../../components/ComfirmBox';

import CountDown from './CountDown';

const ContestDetails: React.FunctionComponent = () => {
  const store = useStudentStore();
  const {id}: {id: string} = useParams();
  const history = useHistory();

  const [selectedAnswer, setSelectedAnswer] = React.useState<number[]>([]);
  const [isShowConfirmBox, setIsShowConfirmBox] = React.useState(false);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = React.useState(0);

  React.useEffect(() => {
    store.getContestDetails(id);
  }, []);

  React.useEffect(() => {
    setSelectedAnswer([...store.contestDetails.examQuestions.questions.map(() => 0)]);
  }, [store.contestDetails]);

  React.useEffect(() => {
    if (store.contestCompleted) {
      let answerTrue = 0;

      store.contestDetails.examQuestions.questions.forEach((question, index) => {
        if (
          question.answers.some((answer, i) => answer.isTrue && selectedAnswer[index] === i + 1)
        ) {
          answerTrue++;
        }
      });
      setNumberOfCorrectAnswers(answerTrue);
    }
  }, [store.contestCompleted]);

  return (
    <>
      <Navbar role={Role.student} />
      {store.contestCompleted ? (
        <Container>
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', marginTop: '9rem'}}>
            <MessageResult>Kết quả làm bài</MessageResult>
            <NumberResult>
              {numberOfCorrectAnswers}/{store.contestDetails.numberOfQuestions}
            </NumberResult>
            <div style={{margin: '5rem auto'}}>
              <Button
                text="Thoát"
                onClick={() => {
                  history.push('/student/contests');
                }}
              />
            </div>
          </div>
        </Container>
      ) : (
        <Container>
          <ConfirmBox
            message="Bạn có chắc chắn muốn nộp bài?"
            isOpen={isShowConfirmBox}
            onCancel={() => {
              setIsShowConfirmBox(false);
            }}
            onConfirm={() => {
              store.contestCompleted = true;
              setIsShowConfirmBox(false);
            }}
          />
          <CountDown time={store.contestDetails.doingTimeExam * 60 * 1000} />
          <HeaderContest>
            <div style={{marginBottom: '1.5rem'}}>{store.contestDetails.name}</div>
            <div style={{display: 'flex'}}>
              <div>Số câu hỏi: {store.contestDetails.numberOfQuestions}</div>
              <div style={{marginLeft: '2rem'}}>
                Thời gian làm bài: {store.contestDetails.doingTimeExam} phút
              </div>
            </div>
          </HeaderContest>
          <Content>
            {store.contestDetails.examQuestions.questions.map((question, index) => (
              <QuestionWrapper key={index}>
                <QuestionContent>
                  Câu hỏi {index + 1}: {question.content}
                </QuestionContent>
                <AnswerWrapper>
                  {question.answers.map((answer, i) => (
                    <Answer
                      key={answer._id}
                      onClick={() => {
                        const newSelectedAnswer = [...selectedAnswer];

                        newSelectedAnswer[index] = i + 1;
                        setSelectedAnswer(newSelectedAnswer);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={selectedAnswer[index] === i + 1 ? faCircleCheck : faCircleUncheck}
                      />
                      <p style={{marginLeft: '1rem'}}>{answer.content}</p>
                    </Answer>
                  ))}
                </AnswerWrapper>
              </QuestionWrapper>
            ))}
          </Content>
          <Button
            text="Nộp bài"
            onClick={() => {
              setIsShowConfirmBox(true);
            }}
          />
        </Container>
      )}
    </>
  );
};

export default observer(ContestDetails);

const HeaderContest = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 2rem auto;
  padding-bottom: 0.5rem;
  align-items: center;
  justify-content: center;
  border-bottom: solid 0.1rem ${BaseColor.gray};
`;

const Content = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const QuestionWrapper = styled.div``;

const QuestionContent = styled.div``;

const AnswerWrapper = styled.div`
  margin-left: 5rem;
  margin-top: 0.5rem;
`;

const Answer = styled.div`
  display: flex;
  cursor: default;
`;

const MessageResult = styled.div`
  margin: 0 auto;
  font-size: 3.6rem;
`;

const NumberResult = styled.div`
  margin: 0 auto;
  font-size: 6rem;
  font-weight: bold;
`;

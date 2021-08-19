import {observer} from 'mobx-react';
import React from 'react';
import {useParams} from 'react-router-dom';
import styled, {css} from 'styled-components';

// import Button from '../../../components/Button';
import Container from '../../../components/Container';
import Grid from '../../../components/Grid';
import MultipleSelectBox from '../../../components/MultipleSelectBox';
import Navbar from '../../../components/Navbar';
import SelectBox from '../../../components/SelectBox';
import {BaseColor} from '../../../theme';
import {Role} from '../../../types';
import {useLectureStore} from '../store';

const ClassDetails: React.FunctionComponent = () => {
  const store = useLectureStore();
  const {id}: {id: string} = useParams();

  const [isEdit] = React.useState(false);
  // const [inAddQuestions, setInAddQuestions] = React.useState(false);

  React.useEffect(() => {
    store.getClassById(id);
  }, []);

  return (
    <>
      <Navbar role={Role.lecturer} />
      <Container>
        {store.classDetails._id && (
          <WrapperContent style={{marginTop: '5rem', marginLeft: '2rem'}}>
            <WrapperContentItem>
              <Grid xl={2}>
                <StyledKey>Tên lớp:</StyledKey>
              </Grid>
              <Grid xl={10}>
                <StyledValue>
                  {isEdit ? (
                    <StyledTextArea
                      value={store.classDetails.name}
                      onChange={(e) => {
                        store.classDetails.name = e.target.value;
                      }}
                    />
                  ) : (
                    store.classDetails.name
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
                        selectedItem={store.examDetails.module}
                        onChange={(item) => {
                          store.examDetails.module = item;
                        }}
                      />
                    </div>
                  ) : (
                    store.classDetails.module.name
                  )}
                </StyledValue>
              </Grid>
            </WrapperContentItem>
            <WrapperContentItem>
              <Grid xl={2}>
                <StyledKey>Năm học:</StyledKey>
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
                    store.classDetails.scholastic.name
                  )}
                </StyledValue>
              </Grid>
            </WrapperContentItem>
            <WrapperContentItem>
              <Grid xl={2}>
                <StyledKey>Danh sách sinh viên:</StyledKey>
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
                    ) : store.classDetails.students.length === 0 ? (
                      'Trống'
                    ) : (
                      store.classDetails.students.map((student) => (
                        <StudentWrapper key={student._id}>
                          <p className="mssv">MSSV: {student.studentId}</p>
                          <p className="name">Họ và tên: {student.name}</p>
                        </StudentWrapper>
                      ))
                    )}
                  </QuestionsWrapper>
                </StyledValue>
              </Grid>
            </WrapperContentItem>
            <WrapperContentItem></WrapperContentItem>
          </WrapperContent>
        )}
      </Container>
    </>
  );
};

export default observer(ClassDetails);

const StudentWrapper = styled.div`
  display: flex;

  border-bottom: solid 0.1rem ${BaseColor.gray};
  padding: 1rem 1rem 1rem 0;

  & .mssv {
    margin: 0;
    margin-right: 1rem;
  }

  & .name {
    margin: 0;
  }
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

// const QuestionWrapper = styled.div`
//   display: flex;
//   height: 3rem;
//   margin-bottom: 1rem;
//   justify-content: space-between;
//   border-bottom: solid 0.1rem black;
// `;

// const DateInputWrapper = styled.div`
//   width: 60%;

//   span {
//     margin: 1.3rem 0.7rem !important;
//   }

//   input {
//     padding: 2.1rem 0 2.1rem 3rem;
//   }
// `;

const Input = styled.input`
  height: 3.8rem;
  text-indent: 1rem;
  border-radius: 0.5rem;
  border: solid 0.1rem ${BaseColor.gray};
`;

// const AddExamQuestionWrapper = styled.div`
//   width: 110rem;
//   height: 50rem;
//   position: absolute;
//   top: 10%;
//   left: 10%;
//   border-radius: 0.5rem;
//   border: solid 0.2rem gray;
//   background-color: white;
//   z-index: 99;
// `;

// const AddExamQuestionHeader = styled.div`
//   display: flex;
// `;

// const Title = styled.div`
//   display: flex;
//   width: 80%;
//   justify-content: center;
// `;

// const IconCloseWrapper = styled.div`
//   display: flex;
//   width: 20%;
//   padding: 1rem 1rem;
//   justify-content: flex-end;
// `;

// const StyledIcon = styled(FontAwesomeIcon)`
//   height: 2rem;
//   &&& {
//     width: 2rem;
//   }
//   :hover {
//     cursor: pointer;
//     color: ${BaseColor.lightOrange};
//   }
// `;

// const AddQuestionContent = styled.div`
//   width: 80%;
//   margin: 0 auto;
//   margin-top: 2rem;
// `;

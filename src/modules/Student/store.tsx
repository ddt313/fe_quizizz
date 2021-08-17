import React from 'react';
import {makeAutoObservable, observable, configure} from 'mobx';

import {get} from '../../infra/http';

configure({enforceActions: 'observed'});

type ContestTable = {
  _id: string;
  name: string;
  module: string;
  numberOfQuestions: number;
  doingTimeExam: number;
  examTime: Date;
};

type Question = {
  _id: string;
  content: string;
  answers: {
    _id: string;
    content: string;
    isTrue: boolean;
  }[];
};

type ExamQuestion = {
  _id: string;
  questions: Question[];
};

type ContestDetails = {
  _id: string;
  name: string;
  module: string;
  numberOfQuestions: number;
  doingTimeExam: number;
  examTime: Date;
  examQuestions: ExamQuestion;
};

class StudentStore {
  @observable userId = '6117dd2061f12dafa120eb68';

  @observable contestCompleted = false;

  @observable contestDetails: ContestDetails = {
    _id: '',
    doingTimeExam: 1,
    examQuestions: {
      _id: '',
      questions: [],
    },
    examTime: new Date(),
    module: '',
    name: '',
    numberOfQuestions: 0,
  };

  @observable contestTable: ContestTable[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public *getContestDetails(id: string) {
    this.contestDetails = yield get(`/student/contests/${id}`);
  }

  public *getContestTable() {
    this.contestTable = yield get(`/student/${this.userId}/contests`);
  }
}

const StudentStoreContext = React.createContext({} as StudentStore);
let store: StudentStore | null = new StudentStore();

export const StudentStoreProvider = (prop: any) => {
  const {children} = prop;

  if (!store) {
    store = new StudentStore();
  }

  return <StudentStoreContext.Provider value={store}>{children}</StudentStoreContext.Provider>;
};

export const useStudentStore = () => React.useContext(StudentStoreContext);

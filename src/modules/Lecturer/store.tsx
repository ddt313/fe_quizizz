import React from 'react';
import {makeAutoObservable, observable, configure} from 'mobx';
import qs from 'qs';

import {$delete, get, post, put} from '../../infra/http';
import {Pagination, QuestionTable} from '../../types';

configure({enforceActions: 'observed'});

type SelectBoxType = {
  _id: string;
  name: string;
};

type QuestionTableResponse = {
  statusCode: number;
  payload: {
    questionTable: QuestionTable[];
    pageTotal: number;
    limit: number;
  };
};

type Answer = {
  _id: string;
  content: string;
  isTrue: boolean;
};

type ModuleResponse = {
  statusCode: number;
  payload: {
    modules: SelectBoxType[];
  };
};

type ChapterResponse = {
  statusCode: number;
  payload: {
    chapters: SelectBoxType[];
  };
};

type QuestionDetails = {
  _id: string;
  content: string;
  level: number;
  module: SelectBoxType;
  chapter: SelectBoxType;
  answers: Answer[];
};

type ExamQuestionTable = {
  _id: string;
  content: string;
  module: string;
  numberOfQuestions: number;
};

type ExamQuestionTableResponse = {
  examQuestions: ExamQuestionTable[];
  pagination: Pagination;
};

type ExamQuestionDetails = {
  _id: string;
  content: string;
  module: SelectBoxType;
  exam: SelectBoxType;
  questions: [
    {
      _id: string;
      content: string;
      chapter: string;
      level: number;
    },
  ];
};

type ExamTable = {
  _id: string;
  name: string;
  module: string;
  doingExamTime: Date;
  examTime: number;
};

type Exam = {
  _id: string;
  name: string;
  examTime: Date;
  doingExamTime: number;
  class: {_id: string; name: string}[];
  examQuestions: {_id: string; content: string}[];
  module: {
    _id: string;
    name: string;
  };
};

type NameClass = {
  _id: string;
  name: string;
};

class LecturerStore {
  @observable userId = '60fbd089621f7518507bf9c1';

  @observable nameClasses: NameClass[] = [];

  @observable exams: ExamTable[] = [];

  @observable examDetails: Exam = {} as Exam;

  @observable questions: QuestionTable[] = [];

  @observable examQuestions: ExamQuestionTable[] = [];

  @observable examQuestionDetails: ExamQuestionDetails = {
    _id: '',
    content: '',
    module: {
      _id: '',
      name: '',
    },
    exam: {
      _id: '',
      name: '',
    },
    questions: [
      {
        _id: '',
        content: '',
        chapter: '',
        level: 0,
      },
    ],
  };

  @observable pagination: Pagination = {
    pageTotal: 0,
    limit: 10,
  };

  @observable questionDetails: QuestionDetails = {
    _id: '',
    content: '',
    level: 1,
    module: {
      _id: '',
      name: '',
    },
    chapter: {
      _id: '',
      name: '',
    },
    answers: [],
  };

  @observable modules: SelectBoxType[] = [];

  @observable chapters: SelectBoxType[] = [];

  @observable listNameExams: SelectBoxType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public *getListNameClasses() {
    this.nameClasses = yield get('/classes/name');
  }

  public *getExams(query: any) {
    const getQuery = {
      ...query,
      year: query.year,
    };
    const queryString = qs.stringify(getQuery);

    const data: ExamTable[] = yield get(`/exams?${queryString}`);

    this.exams = data;
  }

  public *getExamById(id: string) {
    this.examDetails = yield get(`/exams/details/${id}`);
  }

  public *getQuestions(query: any) {
    const getQuery = {
      ...query,
      year: query.year,
    };
    const queryString = qs.stringify(getQuery);

    const data: QuestionTableResponse = yield get(`/questions?${queryString}`);

    console.log('data:', data);
    this.questions = data.payload.questionTable;
    this.pagination.pageTotal = data.payload.pageTotal;
    this.pagination.limit = data.payload.limit;
  }

  public *getModules() {
    const data: ModuleResponse = yield get('/modules');

    console.log('data modules:', data);
    this.modules = data.payload.modules;
  }

  public *getQuestionDetails(id: string) {
    console.log('id', id);
    const data: QuestionDetails = yield get(`/questions/details/${id}`);

    console.log('details:', data);

    this.questionDetails = data;
  }

  public *getChapter(moduleId: string) {
    const data: ChapterResponse = yield get(`/chapters/${moduleId}`);

    this.chapters = data.payload.chapters;
  }

  public *getListNameExams() {
    const data: SelectBoxType[] = yield get(`/exams/name`);

    this.listNameExams = data;
  }

  public *updateExamQuestion(id: string, data: any) {
    yield put(`/exam-questions/details/${id}`, data);
  }

  public *createQuestion(question: any) {
    yield post('/questions', question);
  }

  public *updateQuestion(question: any) {
    yield put(`/questions/${question._id}`, question);
  }

  public *deleteQuestion(id: string) {
    this.questions = this.questions.filter((question) => question._id !== id);
    yield $delete(`/questions/${id}`);
  }

  public *getExamQuestions(query: any) {
    const getQuery = {
      ...query,
      year: query.year,
    };
    const queryString = qs.stringify(getQuery);
    const data: ExamQuestionTableResponse = yield get(`/exam-questions?${queryString}`);

    this.examQuestions = data.examQuestions;
    this.pagination = data.pagination;
  }

  public *getExamQuestionDetails(id: string) {
    const data: ExamQuestionDetails = yield get(`/exam-questions/details/${id}`);

    this.examQuestionDetails = data;
    console.log('exam question data:', data);
  }
}

const LectureStoreContext = React.createContext({} as LecturerStore);
let store: LecturerStore | null = new LecturerStore();

export const LectureStoreProvider = (prop: any) => {
  const {children} = prop;

  if (!store) {
    store = new LecturerStore();
  }

  return <LectureStoreContext.Provider value={store}>{children}</LectureStoreContext.Provider>;
};

export const useLectureStore = () => React.useContext(LectureStoreContext);

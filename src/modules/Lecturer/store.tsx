import React from 'react';
import {makeAutoObservable, observable, configure} from 'mobx';
import qs from 'qs';

import {$delete, get, post, put} from '../../infra/http';
import {Pagination} from '../../types';

configure({enforceActions: 'observed'});

type QuestionTable = {
  _id: string;
  content: string;
  level: number;
  module: string;
  user: string;
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

type Module = {
  _id: string;
  name: string;
};

type ModuleResponse = {
  statusCode: number;
  payload: {
    modules: Module[];
  };
};

type Chapter = {
  _id: string;
  name: string;
};

type ChapterResponse = {
  statusCode: number;
  payload: {
    chapters: Chapter[];
  };
};

type QuestionDetails = {
  _id: string;
  content: string;
  level: number;
  module: Module;
  chapter: Chapter;
  answers: Answer[];
};

class LecturerStore {
  @observable questions: QuestionTable[] = [];

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

  @observable modules: Module[] = [];

  @observable chapters: Chapter[] = [];

  constructor() {
    makeAutoObservable(this);
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

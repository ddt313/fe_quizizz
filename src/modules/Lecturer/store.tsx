import React from 'react';
import {makeAutoObservable, observable, configure} from 'mobx';

configure({enforceActions: 'observed'});

type QuestionTable = {
  id: number;
  noiDung: string;
  doKho: string;
  hocPhan: string;
  nguoiTao: string;
};

type Answer = {
  id: number;
  noiDung: string;
  laCauTraLoiDung: boolean;
};

type Module = {
  id: number;
  name: string;
};

type Chapter = {
  id: number;
  name: string;
};

type ChapterResponse = {
  id: number;
  idHocPhan: number;
  name: string;
};

type QuestionDetails = {
  id: number;
  noiDung: string;
  doKho: number;
  hocPhan: Module;
  chuong: Chapter;
  listCauHoi: Answer[];
};

class LecturerStore {
  @observable questions: QuestionTable[] = [];

  @observable questionDetails: QuestionDetails = {
    id: 0,
    noiDung: '',
    doKho: 1,
    hocPhan: {
      id: 0,
      name: '',
    },
    chuong: {
      id: 0,
      name: '',
    },
    listCauHoi: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  public getQuestions() {
    const data = [
      {
        id: 1,
        noiDung:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repudiandae cumque atque corrupti, ipsam, quam deleniti culpa veniam eum rerum labore voluptatem pariatur et excepturi perferendis nulla accusantium debitis obcaecati.',
        doKho: 'Dễ',
        hocPhan: 'Kiểm thử',
        nguoiTao: '@Emiila Mayer',
      },
      {
        id: 2,
        noiDung: 'lorem',
        doKho: 'Dễ',
        hocPhan: 'Kiểm thử',
        nguoiTao: '@Emiila Mayer',
      },
      {
        id: 3,
        noiDung: 'lorem',
        doKho: 'Dễ',
        hocPhan: 'Kiểm thử',
        nguoiTao: '@Emiila Mayer',
      },
      {
        id: 4,
        noiDung: 'lorem',
        doKho: 'Dễ',
        hocPhan: 'Kiểm thử',
        nguoiTao: '@Emiila Mayer',
      },
      {
        id: 5,
        noiDung: 'lorem',
        doKho: 'Dễ',
        hocPhan: 'Kiểm thử',
        nguoiTao: '@Emiila Mayer',
      },
    ];

    this.questions = data;
  }

  public getModules(): Module[] {
    return [
      {
        id: 1,
        name: 'Kiểm thử',
      },
      {
        id: 2,
        name: 'C++',
      },
      {
        id: 3,
        name: 'Java',
      },
    ];
  }

  public getQuestionDetails(id: number) {
    const data: QuestionDetails = {
      id: id,
      noiDung: 'noi dung asdasfd',
      doKho: 1,
      hocPhan: {
        id: 2,
        name: 'C++',
      },
      chuong: {
        id: 3,
        name: 'Giải thuật C++',
      },
      listCauHoi: [
        {id: 1, noiDung: 'nd cau hoi 1', laCauTraLoiDung: false},
        {id: 2, noiDung: 'nd cau hoi 2', laCauTraLoiDung: true},
        {id: 3, noiDung: 'nd cau hoi 3', laCauTraLoiDung: false},
        {id: 4, noiDung: 'nd cau hoi 4', laCauTraLoiDung: false},
      ],
    };

    this.questionDetails = data;
  }

  public getChapter() {
    const data: ChapterResponse[] = [
      {id: 1, idHocPhan: 1, name: 'Kiểm thử hộp đen'},
      {id: 2, idHocPhan: 1, name: 'Kiểm thử hộp trắng'},
      {id: 3, idHocPhan: 2, name: 'Giải thuật C++'},
      {id: 4, idHocPhan: 3, name: 'Java nâng cao'},
      {id: 5, idHocPhan: 3, name: 'Class trong Java'},
    ];

    return data.filter((chapter) => chapter.idHocPhan === this.questionDetails.hocPhan.id);
  }

  public deleteQuestion(id: number) {
    console.log('delete question id:', id);
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

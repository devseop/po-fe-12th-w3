export interface ISick {
  sickCd: string;
  sickNm: string;
}

export interface ISearchState {
  query: string;
  sickList: ISick[];
  isLoading: boolean;
  error: string | null;
}

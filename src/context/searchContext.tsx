import React, { Dispatch, createContext, useContext, useReducer, useEffect } from 'react';
import { fetchSickList } from '../api/api';
import { ISearchState, ISick } from '../types/type';

type SearchAction =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_SICK_LIST'; payload: ISick[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

type DispatchType = Dispatch<SearchAction>;

const searchContext = createContext<{ state: ISearchState; dispatch: DispatchType } | undefined>(
  undefined,
);

const searchReducer = (state: ISearchState, action: SearchAction): ISearchState => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_SICK_LIST':
      return { ...state, sickList: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, {
    query: '',
    sickList: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const sickList = await fetchSickList();
        dispatch({ type: 'SET_SICK_LIST', payload: sickList });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error as string });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    if (state.query) {
      fetchData();
    } else {
      dispatch({ type: 'SET_SICK_LIST', payload: [] });
      dispatch({ type: 'SET_ERROR', payload: null });
    }
  }, [state.query]);

  return <searchContext.Provider value={{ state, dispatch }}>{children}</searchContext.Provider>;
};

export const useSearchContext = () => {
  const context = useContext(searchContext);
  if (context === undefined) {
    throw new Error('useIssueContext must be used within an IssueProvider');
  }

  return context;
};

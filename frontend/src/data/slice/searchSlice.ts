import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {AppRootState} from '../redux';
import {useAppSelector} from '../hooks';

interface SearchState {
  query: string | null;
}

const initialState: SearchState = {
  query: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clear(state) {
      state.query = null;
    },
    append(state, action: PayloadAction<string>) {
      state.query = (state.query ?? '') + action.payload;
    },
    backspace(state) {
      if (state.query) {
        state.query = state.query.substr(0, state.query.length - 1);
      }
    },
  }
});


export const useSearchQuery = () => useAppSelector(state => state.search.query);

export default searchSlice;

export function searchEngine(query: string, text: string): boolean {
  return text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) >= 0;
}

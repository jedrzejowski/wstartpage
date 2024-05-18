import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../hooks';

interface SearchState {
  query: string | null;
}

const initialState: SearchState = {
  query: null,
};

export const userTileSearchSlice = createSlice({
  name: 'userTileSearch',
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


export const useUserTileSearchQuery = () => useAppSelector(state => state.userTileSearch.query);

export default userTileSearchSlice;

export function isUserTileSearchMatch(query: string, text: string): boolean {
  return text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) >= 0;
}

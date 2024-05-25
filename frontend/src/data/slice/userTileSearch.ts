import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../hooks';

interface SearchState {
  searchQuery: string;
}

const initialState: SearchState = {
  searchQuery: '',
};

export const userTileSearchSlice = createSlice({
  name: 'userTileSearch',
  initialState,
  reducers: {
    setUserSearchQueryAction(state, action: PayloadAction<{ searchQuery: string; }>) {
      state.searchQuery = action.payload.searchQuery;
    },
  }
});

export const {setUserSearchQueryAction} = userTileSearchSlice.actions;

export const useUserTileSearchQuery = () => useAppSelector(state => state.userTileSearch.searchQuery);

export default userTileSearchSlice;

export function isUserTileSearchMatch(query: string, text: string): boolean {
  return text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) >= 0;
}

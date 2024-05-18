import React, {FC} from 'react';
import styled from 'styled-components';
import userTileSearchSlice, {useUserTileSearchQuery} from '../../data/slice/userTileSearch.ts';
import {useAppDispatch} from '../../data/hooks';
import {useEventListener} from 'usehooks-ts';

const SearchView: FC = props => {
  const searchQuery = useUserTileSearchQuery();
  const dispatch = useAppDispatch();

  useEventListener('keydown', event => {

    if (event.shiftKey || event.altKey || event.ctrlKey) {
      return;
    }

    if (event.code.match(/^Key[A-Z]$/)) {
      dispatch(userTileSearchSlice.actions.append(event.key));
    }

    if (event.code === 'Backspace') {
      dispatch(userTileSearchSlice.actions.backspace());
    }

    if (event.code === 'Escape') {
      dispatch(userTileSearchSlice.actions.clear());
    }
  });

  return (
    <Root>
      {searchQuery?.toUpperCase()}
    </Root>
  );
};

const Root = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  bottom: 10%;
  font-size: 5em;
  text-shadow: 0 0 20px black;
  color: white;
  text-align: center;
`;

export default SearchView;

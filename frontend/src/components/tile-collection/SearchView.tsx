import React, {FC} from 'react';
import styled from 'styled-components';
import {
  setUserSearchQueryAction,
  useUserTileSearchQuery
} from '../../data/slice/userTileSearch.ts';
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
      dispatch(setUserSearchQueryAction({
        searchQuery: searchQuery + event.key,
      }));
    }

    if (event.code === 'Backspace' && searchQuery.length > 0) {
      dispatch(setUserSearchQueryAction({
        searchQuery: searchQuery.substring(0, searchQuery.length - 1),
      }));
    }

    if (event.code === 'Escape') {
      dispatch(setUserSearchQueryAction({
        searchQuery: '',
      }));
    }
  });

  return (
    <Root>
      {searchQuery.toUpperCase()}
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

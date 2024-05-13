import {FC, memo} from 'react';
import styled from 'styled-components';
import SaveButton from '../SaveButton.tsx';
import Toolbar from '../../Toolbar.tsx';

export const EditorTopBar: FC = props => {
  return <Toolbar
    left={<Title>WStartpage</Title>}
    right={<SaveButton/>}
  />;
};

const Title = styled.h1`
  display: inline-block;
  margin: 0;
  font-size: 2em;
`;


export default memo(EditorTopBar);

import {FC, memo} from 'react';
import styled from 'styled-components';
import SaveButton from '../SaveButton.tsx';
import Toolbar from '../../Toolbar.tsx';

export const EditorTopBar: FC = props => {
  return <Toolbar>
    <Toolbar.Left>
      <Title>WStartpage</Title>
    </Toolbar.Left>
    <Toolbar.Right>
      <SaveButton/>
    </Toolbar.Right>
  </Toolbar>
};

const Title = styled.h1`
  display: inline-block;
  margin: 0;
  font-size: 2em;
`;


export default memo(EditorTopBar);

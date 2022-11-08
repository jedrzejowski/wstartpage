import React, {FC} from 'react';
import styled from 'styled-components';
import SaveButton from './SaveButton';
import Toolbar from '../Toolbar';

export const EditorTopBar: FC = React.memo(props => {
  return <Toolbar
    left={<Title>WStartpage</Title>}
    right={<SaveButton/>}
  />;
});

const Title = styled.h1`
  display: inline-block;
  margin: 0;
  font-size: 2em;
`;


export default EditorTopBar;

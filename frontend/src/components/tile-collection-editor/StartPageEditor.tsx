import React, {FC} from 'react';
import AppLayout from '../AppLayout';
import EditorTopBar from './layout/EditorTopBar.tsx';
import styled from 'styled-components';
import EditorCollectionList from './EditorCollectionList';
import {useAppSelector} from '../../data/hooks';
import StartPage from '../tile-collection/StartPage';
import FormContainer from './FormContainer';
import {EditorContextProvider, EditorQueryGuard} from './EditorContext';

const StartPageEditor: FC = () => {
  // const auth = useAuth();
  //
  // if (!auth) {
  //   return <EditorLoginPage/>;
  // }

  return <EditorContextProvider>
    <Root>
      <AppLayout
        fixed
        top={<HPanel border="bottom"><EditorTopBar/></HPanel>}
        middle={<StartPagePreview/>}
        left={<VPanel border="right"><EditorCollectionList/></VPanel>}
        right={<VPanel border="left"><EditorQueryGuard><FormContainer/></EditorQueryGuard></VPanel>}
      />
    </Root>
  </EditorContextProvider>;
};

const Root = styled.div`
  height: 100vh;
`;

const StartPagePreview = React.memo(props => {
  const selectedIconCollectionName = useAppSelector(state => state.editor.currentCollectionName);

  if (!selectedIconCollectionName) {
    return null;
  }

  return <EditorQueryGuard><StartPage tileCollectionName={selectedIconCollectionName}/></EditorQueryGuard>;
});

const HPanel = styled.div<{ border: 'top' | 'bottom' }>`
  width: 100%;
  height: 48px;
  border-${props => props.border}: 1px solid ${props => props.theme.color.border};
  box-sizing: border-box;
  padding: ${props => props.theme.spacing(1)};
`;

const VPanel = styled.div<{ border: 'right' | 'left' }>`
  height: 100%;
  width: 340px;
  border-${props => props.border}: 1px solid ${props => props.theme.color.border};
  box-sizing: border-box;
  overflow-y: scroll;
`;

export default StartPageEditor;

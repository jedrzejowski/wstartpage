import AppLayout from "../AppLayout.tsx";
import EditorCollectionList from "../tile-collection-editor/EditorCollectionList.tsx";
import {EditorContextProvider, EditorQGuard} from "../tile-collection-editor/EditorContext.tsx";
import styled from "styled-components";
import {useAppSelector} from "../../data/hooks.ts";
import StartPage from "../tile-collection/StartPage.tsx";

function TileEditorPage() {
  return <EditorContextProvider>
    <Root>
      <AppLayout
        fixed
        // top={<HPanel border="bottom"><EditorTopBar/></HPanel>}
        // middle={<StartPagePreview/>}
        left={<VPanel border="right"><EditorCollectionList/></VPanel>}
        // right={<VPanel border="left"><EditorQGuard><FormContainer/></EditorQGuard></VPanel>}
      />
    </Root>
  </EditorContextProvider>
}

export default TileEditorPage;

const Root = styled.div`
  height: 100vh;
`;

// const StartPagePreview = React.memo(props => {
//   const selectedIconCollectionName = useAppSelector(state => state.editor.currentCollectionName);
//
//   if (!selectedIconCollectionName) {
//     return null;
//   }
//
//   return <EditorQGuard><StartPage tileCollectionName={selectedIconCollectionName}/></EditorQGuard>;
// });

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

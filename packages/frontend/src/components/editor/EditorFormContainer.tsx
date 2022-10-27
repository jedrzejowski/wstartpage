import React, {FC} from 'react';
import TileForm from './TileForm';
import {useAppSelector} from '../../data/hooks';
import IconCollectionForm from './IconCollectionForm';
import TileSectionForm from './TileSectionForm';

export const EditorFormContainer: FC = React.memo(props => {
  const selectedObj = useAppSelector(state => state.editor.selectedObj);

  if (!selectedObj) {
    return null;
  }

  if ('iconCollectionName' in selectedObj) {
    return <IconCollectionForm iconCollectionName={selectedObj.iconCollectionName}/>;
  }

  if ('sectionId' in selectedObj) {
    return <TileSectionForm sectionId={selectedObj.sectionId}/>;
  }

  if ('tileId' in selectedObj) {
    return <TileForm tileId={selectedObj.tileId}/>;
  }

  return null;
});

export default EditorFormContainer;

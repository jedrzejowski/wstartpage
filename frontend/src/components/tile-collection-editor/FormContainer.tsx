import React, {FC} from 'react';
import TileEditForm from './TileEditForm.tsx';
import {useAppSelector} from '../../data/hooks';
import TileCollectionEditForm from './TileCollectionEditForm.tsx';
import TileSectionEditForm from './TileSectionEditForm.tsx';

export const FormContainer: FC = React.memo(props => {
  const selectedObj = useAppSelector(state => state.editor.selectedObj);

  if (!selectedObj) {
    return null;
  }

  if ('tileCollectionName' in selectedObj) {
    return <TileCollectionEditForm tileCollectionName={selectedObj.tileCollectionName}/>;
  }

  if ('sectionId' in selectedObj) {
    return <TileSectionEditForm sectionId={selectedObj.sectionId}/>;
  }

  if ('tileId' in selectedObj) {
    return <TileEditForm tileId={selectedObj.tileId}/>;
  }

  return null;
});

export default FormContainer;

import React, {FC} from 'react';
import TileForm from './TileForm';
import {useAppSelector} from '../../data/hooks';
import TileCollectionForm from './TileCollectionForm';
import TileSectionForm from './TileSectionForm';

export const FormContainer: FC = React.memo(props => {
  const selectedObj = useAppSelector(state => state.editor.selectedObj);

  if (!selectedObj) {
    return null;
  }

  if ('collectionName' in selectedObj) {
    return <TileCollectionForm tileCollectionName={selectedObj.collectionName}/>;
  }

  if ('sectionId' in selectedObj) {
    return <TileSectionForm sectionId={selectedObj.sectionId}/>;
  }

  if ('tileId' in selectedObj) {
    return <TileForm tileId={selectedObj.tileId}/>;
  }

  return null;
});

export default FormContainer;

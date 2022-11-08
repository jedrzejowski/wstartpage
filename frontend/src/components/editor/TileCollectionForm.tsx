import React, {FC} from 'react';
import {useNormalizedTileCollection} from '../../data/slice/normalizedIconCollections';

export const TileCollectionForm: FC<{
  tileCollectionName: string;
}> = props => {
  const {tileCollectionName} = props;

  const collection = useNormalizedTileCollection(tileCollectionName);

  const collectionIncludes = collection.includes ?? [];

  return <>
    Kolekcja
    hej akup se kleja

    {collectionIncludes.map(name => (
      <IncludedCollection key={name} tileCollectionName={tileCollectionName} includeName={name}/>
    ))}

  </>;
};

export default React.memo(TileCollectionForm);

const IncludedCollection: FC<{
  tileCollectionName: string;
  includeName: string;
}> = props => {
  const {tileCollectionName, includeName} = props;


  return <>{includeName}</>;
};

import {memo, FC, useEffect} from 'react';
import AppLayout from '../AppLayout';
import TileContainer from './TileContainer';
import SearchView from './SearchView';
import StartPageHeader from './StartPageHeader';
import {useNormalizedTileCollection} from '../../data/slice/normalizedTileCollections';
import {useAppSelector} from '../../data/hooks';
import {useIsEditor} from "../tile-collection-editor/EditorContext.tsx";

const StartPage: FC<({
  tileCollectionName: string;
})> = ({tileCollectionName}) => {
  const backgroundUrl = useAppSelector(state => state.pageSettings.backgroundUrl);
  const tileCollection = useNormalizedTileCollection(tileCollectionName);
  const isEditor = useIsEditor();

  useEffect(() => {
    document.body.style.backgroundImage = backgroundUrl ? `url(${backgroundUrl})` : '';
  }, [backgroundUrl]);

  if (!tileCollection) {
    return null;
  }

  return (<div>

    <AppLayout
      top={<>
        <StartPageHeader/>
        {tileCollection.top ? (
          <TileContainer
            iconCollectionName={tileCollectionName}
            containerName="top"
            textOnly
            sections={tileCollection.top}
          />
        ) : null}
      </>}
      left={tileCollection.left ? (
        <TileContainer
          iconCollectionName={tileCollectionName}
          containerName="left"
          sections={tileCollection.left}
          direction="column"
        />
      ) : null}
      middle={tileCollection.middle ? (
        <TileContainer
          iconCollectionName={tileCollectionName}
          containerName="middle"
          sections={tileCollection.middle}
        />
      ) : null}
      right={tileCollection.right ? (
        <TileContainer
          iconCollectionName={tileCollectionName}
          containerName="right"
          sections={tileCollection.right}
          direction="column"
        />
      ) : null}
      bottom={tileCollection.bottom ? (
        <TileContainer
          iconCollectionName={tileCollectionName}
          containerName="bottom"
          textOnly sections={tileCollection.bottom}
        />
      ) : null}
    />

    {!isEditor && <SearchView/>}
  </div>);
};

export default memo(StartPage);

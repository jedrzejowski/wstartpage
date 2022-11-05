import React, {FC, useEffect} from 'react';
import AppLayout from '../AppLayout';
import TileContainer from './TileContainer';
import SearchView from './SearchView';
import StartPageHeader from './StartPageHeader';
import {useNormalizedIconCollection} from '../../data/slice/normalizedIconCollections';
import {useAppSelector} from '../../data/hooks';

const StartPage: FC<({
  iconCollectionName: string;
})> = React.memo(({iconCollectionName}) => {
  const backgroundUrl = useAppSelector(state => state.pageSettings.backgroundUrl);
  const iconCollection = useNormalizedIconCollection(iconCollectionName);

  useEffect(() => {
    document.body.style.backgroundImage = backgroundUrl ? `url(${backgroundUrl})` : '';
  }, [backgroundUrl]);

  if (!iconCollection) {
    return null;
  }

  return (<div>

    <AppLayout
      top={<>
        <StartPageHeader/>
        {iconCollection.top ? (
          <TileContainer
            iconCollectionName={iconCollectionName}
            containerName="top"
            textOnly
            sections={iconCollection.top}
          />
        ) : null}
      </>}
      left={iconCollection.left ? (
        <TileContainer
          iconCollectionName={iconCollectionName}
          containerName="left"
          sections={iconCollection.left}
          direction="column"
        />
      ) : null}
      middle={iconCollection.middle ? (
        <TileContainer
          iconCollectionName={iconCollectionName}
          containerName="middle"
          sections={iconCollection.middle}
        />
      ) : null}
      right={iconCollection.right ? (
        <TileContainer
          iconCollectionName={iconCollectionName}
          containerName="right"
          sections={iconCollection.right}
          direction="column"
        />
      ) : null}
      bottom={iconCollection.bottom ? (
        <TileContainer
          iconCollectionName={iconCollectionName}
          containerName="bottom"
          textOnly sections={iconCollection.bottom}
        />
      ) : null}
    />

    <SearchView/>
  </div>);
});

export default StartPage;

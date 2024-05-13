import type {FC} from 'react';
import StartPageShortcuts from './components/tile-collection/StartPageShortcuts';
import appRender from './appRender';
import {useAppSelector} from './data/hooks';
import {useGetMergedTileCollectionQuery} from './data/api/apiSlice.ts';
import StartPage from './components/tile-collection/StartPage';

const Viewer: FC = () => {

  const tileCollectionName = useAppSelector(state => state.pageSettings.viewerTileCollectionName);
  const qq = useGetMergedTileCollectionQuery(tileCollectionName ?? '', {skip: !tileCollectionName});


  return <>
    {qq.isSuccess && <StartPage tileCollectionName={tileCollectionName + '?recursiveMerged'}/>}
  </>;
};

appRender(<>
  <StartPageShortcuts/>
  <Viewer/>
</>);


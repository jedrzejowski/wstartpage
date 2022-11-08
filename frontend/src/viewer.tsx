import React, {FC} from 'react';
import StartPageShortcuts from './components/startpage/StartPageShortcuts';
import appRender from './appRender';
import {useAppSelector} from './data/hooks';
import {useGetMergedTileCollectionQuery} from './data/api/apiBackend';
import StartPage from './components/startpage/StartPage';

const Viewer: FC = () => {

  const tileCollectionName = useAppSelector(state => state.pageSettings.viewerIconCollectionName);
  useGetMergedTileCollectionQuery(tileCollectionName ?? '', {skip: !tileCollectionName});

  return <>

    <StartPage tileCollectionName={tileCollectionName + '?recursiveMerged'}/>

  </>;
};

export default () => {
  appRender(<>
    <StartPageShortcuts/>
    <Viewer/>
  </>);
}


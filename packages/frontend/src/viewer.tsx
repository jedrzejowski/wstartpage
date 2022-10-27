import React, {FC} from 'react';
import StartPageShortcuts from './components/startpage/StartPageShortcuts';
import appRender from './appRender';
import {useAppSelector} from './data/hooks';
import {useGetViewerIconCollectionQuery} from './data/api/iconCollections';
import StartPage from './components/startpage/StartPage';

const Viewer: FC = () => {

  const iconCollectionName = useAppSelector(state => state.pageSettings.viewerIconCollectionName);
  useGetViewerIconCollectionQuery(iconCollectionName ?? '', {skip: !iconCollectionName});

  return <>

    <StartPage iconCollectionName={iconCollectionName + '?recursiveMerged'}/>

  </>;
};

export default () => {
  appRender(<>
    <StartPageShortcuts/>
    <Viewer/>
  </>);
}


import {createContext, FC, ReactNode, useContext} from 'react';
import {useAppSelector} from '../../data/hooks';
import {selectEditorSelectedIconCollectionName} from '../../data/slice/normalizedIconCollections';
import {useGetTileCollectionQuery} from '../../data/api/apiBackend';
import RtkQueryGuard from '../RtkQueryGuard';

const EditorContext = createContext(false);

export const EditorContextProvider: FC<{ children: ReactNode }> = ({children}) => {

  const currentCollectionName = useAppSelector(selectEditorSelectedIconCollectionName);

  useGetTileCollectionQuery(currentCollectionName ?? 'null', {skip: currentCollectionName == null});

  return <EditorContext.Provider value={true}>{children}</EditorContext.Provider>;
};

export const useIsEditor = () => useContext(EditorContext);

export const EditorQGuard: FC<{ children: ReactNode }> = props => {
  const currentCollectionName = useAppSelector(state => state.editor.currentCollectionName);
  const query = useGetTileCollectionQuery(currentCollectionName ?? 'null', {skip: currentCollectionName == null});


  return <RtkQueryGuard query={query} strict>{() => props.children}</RtkQueryGuard>;
};


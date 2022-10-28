import {createContext, FC, ReactNode, useContext} from 'react';
import {useAppSelector} from '../../data/hooks';
import {selectEditorSelectedIconCollectionName} from '../../data/slice/normalizedIconCollections';
import {useGetIconCollectionQuery} from '../../data/api/apiBackend';

const EditorContext = createContext(false);

export const EditorContextProvider: FC<{ children: ReactNode }> = ({children}) => {

  const selectedIconCollectionName = useAppSelector(selectEditorSelectedIconCollectionName);

  useGetIconCollectionQuery(selectedIconCollectionName ?? 'null', {skip: selectedIconCollectionName == null});

  return <EditorContext.Provider value={true}>{children}</EditorContext.Provider>;
};

export const useIsEditor = () => useContext(EditorContext);

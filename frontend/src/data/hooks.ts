import {createDispatchHook, TypedUseSelectorHook, useSelector, createStoreHook} from 'react-redux';
import type {AppRootState} from './redux';

export const useAppDispatch = createDispatchHook<AppRootState>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
export const useAppStore = createStoreHook<AppRootState>();


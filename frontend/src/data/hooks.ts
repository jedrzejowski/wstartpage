import {createDispatchHook, TypedUseSelectorHook, useSelector} from 'react-redux';
import type {AppRootState} from './redux'

export const useAppDispatch = createDispatchHook<AppRootState>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;


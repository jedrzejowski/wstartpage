import type {FC} from 'react';
import {
  selectPageSettingsZoomLevel,
  setDarkModeAction,
  setShowDisplayTitlesAction,
  setZoomLevelAction,
} from '../../data/slice/pageSettings';
import {useAppDispatch, useAppSelector} from '../../data/hooks';
import {useEventListener} from 'usehooks-ts';

export const StartPageShortcuts: FC = props => {
  const dispatch = useAppDispatch();
  const pageSettings = useAppSelector(state => state.pageSettings);
  const zoomLevel = useAppSelector(selectPageSettingsZoomLevel);

  useEventListener('keydown', event => {

    if (event.shiftKey && event.key === 'T') {
      dispatch(setShowDisplayTitlesAction(!pageSettings.showTitles));
      return;
    }

    if (event.shiftKey && event.key === 'D') {
      dispatch(setDarkModeAction(!pageSettings.darkMode));
      return;
    }

    if (event.key === '+') {
      dispatch(setZoomLevelAction(zoomLevel + 10));
      return;
    }

    if (event.key === '-') {
      dispatch(setZoomLevelAction(zoomLevel - 10));
      return;
    }
  });

  return null;
};

export default StartPageShortcuts;

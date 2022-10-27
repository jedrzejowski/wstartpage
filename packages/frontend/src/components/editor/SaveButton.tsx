import React, {FC, useState} from 'react';
import Button from '../input/Button';
import {useAppSelector} from '../../data/hooks';
import {
  IconCollectionT,
  TileSectionT,
  TileT,
  NormalizedIconCollectionT,
} from '../../types';

type MyState = 'idle' | 'fetching';

export const SaveButton: FC = React.memo(props => {
  const [myState, setMyState] = useState<MyState>('idle');
  const selectedIconCollectionName = useAppSelector(state => state.editor.selectedIconCollectionName);
  const iconCollectionSlice = useAppSelector(state => state.normalizedIconCollection);

  return <Button
    disabled={myState === 'fetching'}
    onClick={handleSave}
    startIcon="content-save-icon"
  >
    Zapisz
  </Button>;

  function handleSave() {
    if (!selectedIconCollectionName) {
      return;
    }

    function unnormalizaIconCollection(iconCollection: NormalizedIconCollectionT): IconCollectionT {
      return {
        name: iconCollection.name,
        includes: iconCollection.includes,
        settings: iconCollection.settings,
        top: unnormalizeIconSections(iconCollection.top),
        left: unnormalizeIconSections(iconCollection.left),
        right: unnormalizeIconSections(iconCollection.right),
        middle: unnormalizeIconSections(iconCollection.middle),
        bottom: unnormalizeIconSections(iconCollection.bottom),
      };
    }

    function unnormalizeIconSections(sections: string[]): TileSectionT[] {
      return sections.map(sectionId => {
        const section = iconCollectionSlice.sections[sectionId];

        if (!section) {
          throw new Error('slice is corrupted');
        }

        return {
          ...section,
          tiles: unnormalizeTileWidgets(section.tiles)
        };
      });
    }

    function unnormalizeTileWidgets(widgets: string[]): TileT[] {
      return widgets.map(widgetId => {
        const widget = iconCollectionSlice.tiles[widgetId];

        if (!widget) {
          throw new Error('slice is corrupted');
        }

        return {
          ...widget,
        };
      });
    }

    const current = iconCollectionSlice.collections[selectedIconCollectionName];
    if (!current) {
      return;
    }
    const iconCollection = unnormalizaIconCollection(current);


  }
});


export default SaveButton;

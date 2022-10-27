import {createAction} from '@reduxjs/toolkit';
import type {TileContainersT} from '../types';

export const addTileAction = createAction<{ sectionId: string, tileId: string }>('addTile');
export const addTileSectionAction = createAction<{
  iconCollectionName: string,
  containerName: TileContainersT,
  sectionId: string,
}>('addTileSection');

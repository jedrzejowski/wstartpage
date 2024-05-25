import {createSlice, isAnyOf, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../hooks';
import type {
  TileCollectionT,
  TileContainerT,
  TileT,
  NormalizedTileCollectionT,
  NormalizedTileSectionT
} from '../tileCollection';
import {makeUniqueId} from '../uniqueId';
import {apiSlice} from './apiSlice.ts';
import {AppSelector} from '../redux';
import {TileContainerNameT, TileSectionT} from '../tileCollection';
import {throwErr} from '../../util/function';
import {typedObjectAssign} from '../../util/typescript';

interface NormalizedTileCollectionStateT {
  tiles: Partial<Record<string, TileT>>;
  sections: Partial<Record<string, NormalizedTileSectionT>>;
  collections: Partial<Record<string, NormalizedTileCollectionT>>;
}

const initialState: NormalizedTileCollectionStateT = {
  tiles: {},
  sections: {},
  collections: {},
};

export const normalizedTileCollectionSlice = createSlice({
  name: 'normalizedTileCollection',
  initialState,
  reducers: {
    addTile(state, action: PayloadAction<{ sectionId: string, tileId: string }>) {
      const {sectionId, tileId} = action.payload;
      state.tiles[tileId] = {
        title: 'Example',
        url: 'https://example.com',
        order: null,
        icon: {
          text: 'Example',
          bgColor: '#FF000',
          fontSize: 30
        }
      };
      state.sections[sectionId]?.tiles.push(tileId);
    },
    addTileSection(state, action: PayloadAction<{
      iconCollectionName: string,
      containerName: TileContainerNameT,
      sectionId: string,
    }>) {
      const {iconCollectionName, containerName, sectionId} = action.payload;

      const collection = state.collections[iconCollectionName];

      if (!collection) {
        throw new Error(`iconCollectionName=${iconCollectionName} not found`);
      }

      const container = collection[containerName] ?? (collection[containerName] = []);
      container.push(sectionId);

      state.sections[sectionId] = {
        title: 'Nowa sekcja',
        tiles: [],
        order: 1000,
        width: null,
      };
    },

    updateTile(state, action: PayloadAction<{ tileId: string, tile: Partial<TileT> }>) {
      const tile = state.tiles[action.payload.tileId];
      if (tile) typedObjectAssign(tile, action.payload.tile);
    },
    updateTileIcon(state, action: PayloadAction<{ tileId: string, iconType: null | 'text' | 'url' }>) {
      const tile = state.tiles[action.payload.tileId];
      if (tile) switch (action.payload.iconType) {
        case 'text':
          tile.icon = {
            text: tile.title.substring(0, 3),
            bgColor: '#FF0000',
            fontSize: 30,
          };
          break;
        case 'url':
          tile.icon = {
            url: '',
          };
          break;
        case null:
          tile.icon = null;
          break;
      }
    },
    updateTileSection(state, action: PayloadAction<{
      sectionId: string,
      section: Partial<NormalizedTileSectionT>
    }>) {
      const section = state.sections[action.payload.sectionId];
      if (section) typedObjectAssign(section, action.payload.section);
    },
    updateTileCollection(state, action: PayloadAction<{
      collectionName: string;
      collection: Partial<NormalizedTileCollectionT>
    }>) {
      const {collectionName, collection} = action.payload;
      const currentState = state.collections[collectionName];
      if (currentState) {
        state.collections[collectionName] = {
          ...currentState,
          ...collection,
        };
      }
    },

    moveTile(state, action: PayloadAction<{ tileId: string, offset: number }>) {
      const {tileId, offset} = action.payload;

      const sectionId = Object.keys(state.sections).find(key => {
        return state.sections[key]?.tiles.includes(tileId);
      }) ?? throwErr('section with widgetId was not found');

      const section = state.sections[sectionId]
        ?? throwErr('no section with such id');

      const currentIndex = section.tiles.indexOf(tileId);
      const newIndex = currentIndex + offset;

      if (newIndex < 0 || section.tiles.length <= newIndex) {
        return;
      }

      section.tiles[currentIndex] = section.tiles[newIndex];
      section.tiles[newIndex] = tileId;
    },
    moveIconSection(state, action: PayloadAction<{ sectionId: string, offset: number }>) {

    },

    deleteTile(state, action: PayloadAction<{ tileId: string }>) {
      const {tileId} = action.payload;

      const sectionId = Object.keys(state.sections).find(key => {
        return state.sections[key]?.tiles.includes(tileId);
      }) ?? throwErr('section with widgetId was not found');

      const section = state.sections[sectionId]
        ?? throwErr('no section with such id');

      const tileIndex = section.tiles.indexOf(tileId);
      section.tiles.splice(tileIndex, 1);

      delete state.tiles[tileId];
    },
    deleteTileSection(state, action: PayloadAction<{ sectionId: string }>) {
      const {sectionId} = action.payload;

      const section = state.sections[sectionId]
        ?? throwErr('no section with such id');

      for (const tileId in section.tiles) {
        delete state.tiles[tileId];
      }

      delete state.sections[sectionId];

      function removeSectionFrom(collection: NormalizedTileCollectionT, container: TileContainerNameT) {
        const index = collection[container].indexOf(sectionId);
        if (index >= 0) {
          collection[container].splice(index, 1);
          return true;
        }
        return false;
      }

      for (const collectionId in state.collections) {
        const collection = state.collections[collectionId]!;
        if (removeSectionFrom(collection, 'top')) break;
        if (removeSectionFrom(collection, 'left')) break;
        if (removeSectionFrom(collection, 'middle')) break;
        if (removeSectionFrom(collection, 'right')) break;
        if (removeSectionFrom(collection, 'bottom')) break;
      }
    }

  },
  extraReducers: (builder) => builder
    .addMatcher(apiSlice.endpoints.getTileCollection.matchFulfilled, (state, action) => {
      addCollectionToState(state, action.payload);
    })
    .addMatcher(apiSlice.endpoints.getMergedTileCollection.matchFulfilled, (state, action) => {
      addCollectionToState(state, action.payload);
    })
});

export const tileMutActions = normalizedTileCollectionSlice.actions;

export const anyTileMutAction = isAnyOf(...Object.keys(tileMutActions).map((key) => tileMutActions[key]));

export const selectEditorSelectedIconCollectionName: AppSelector<string | null> = state => state.editor.currentCollectionName;


export const useNormalizedTileCollection = (name: string) => useAppSelector(
  state => state.normalizedTileCollection.collections[name]
    ?? throwErr(`tile collection with name=${name} not found`));
export const useNormalizedTileSection = (id: string) => useAppSelector(
  state => state.normalizedTileCollection.sections[id]
    ?? throwErr(`tile section with id=${id} not found`));
export const useNormalizedTile = (id: string) => useAppSelector(
  state => state.normalizedTileCollection.tiles[id]
    ?? throwErr(`tile with id=${id} not found`));


function addCollectionToState(state: NormalizedTileCollectionStateT, collection: TileCollectionT) {

  function normalizeContainer(iconContainer: TileContainerT | null | undefined): string[] {
    iconContainer = iconContainer ?? [];
    return iconContainer.map(iconSection => {
      const id = makeUniqueId();

      state.sections[id] = {
        ...iconSection,
        tiles: normalizeTiles(iconSection.tiles)
      };

      return id;
    });
  }

  function normalizeTiles(iconWidgets: TileT[]): string[] {
    return iconWidgets.map(iconWidget => {
      const id = makeUniqueId();

      state.tiles[id] = iconWidget;

      return id;
    });
  }

  state.collections[collection.name] = {
    ...collection,
    includes: collection.includes ?? [],
    top: normalizeContainer(collection.top),
    right: normalizeContainer(collection.right),
    bottom: normalizeContainer(collection.bottom),
    left: normalizeContainer(collection.left),
    middle: normalizeContainer(collection.middle),
  };
}

export function getTileCollectionFromState(state: NormalizedTileCollectionStateT, name: string): TileCollectionT {

  function unnormalizaTileCollection(iconCollection: NormalizedTileCollectionT): TileCollectionT {
    return {
      ...iconCollection,
      top: unnormalizeIconSections(iconCollection.top),
      left: unnormalizeIconSections(iconCollection.left),
      right: unnormalizeIconSections(iconCollection.right),
      middle: unnormalizeIconSections(iconCollection.middle),
      bottom: unnormalizeIconSections(iconCollection.bottom),
    };
  }

  function unnormalizeIconSections(sections: string[]): TileSectionT[] {
    return sections.map(sectionId => {
      const section = state.sections[sectionId];

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
      const widget = state.tiles[widgetId];

      if (!widget) {
        throw new Error('slice is corrupted');
      }

      return {
        ...widget,
      };
    });
  }

  const collection = state.collections[name];

  if (!collection) {
    throw new Error('collection not found');
  }

  return unnormalizaTileCollection(collection);
}

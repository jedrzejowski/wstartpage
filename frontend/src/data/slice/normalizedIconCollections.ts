import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../hooks';
import type {
  IconCollectionT,
  TileContainerT,
  TileT,
  NormalizedIconCollectionT,
  NormalizedTileSectionT
} from '../../types';
import {makeUniqueId} from '../uniqueId';
import {iconCollectionsApi} from '../api/apiBackend';
import {AppSelector} from '../redux';
import {TileContainersT} from '../../types';

interface NormalizedTileCollectionStateT {
  tiles: Partial<Record<string, TileT>>;
  sections: Partial<Record<string, NormalizedTileSectionT>>;
  collections: Partial<Record<string, NormalizedIconCollectionT>>;
}

let i = 0;

const initialState: NormalizedTileCollectionStateT = {
  tiles: {},
  sections: {},
  collections: {},
};

export const normalizedIconCollectionSlice = createSlice({
  name: 'normalizedIconCollection',
  initialState,
  reducers: {
    updateTileAction(state, action: PayloadAction<{ tileId: string, tile: TileT }>) {
      const {tileId, tile} = action.payload;
      state.tiles[tileId] = tile;
    },
    updateTileSectionAction(state, action: PayloadAction<{ sectionId: string, section: NormalizedTileSectionT }>) {
      const {sectionId, section} = action.payload;
      state.sections[sectionId] = section;
    },
    moveTileAction(state, action: PayloadAction<{ tileId: string, sectionId?: string, offset: number }>) {
      let {tileId, sectionId, offset} = action.payload;

      if (sectionId === undefined) {
        sectionId = Object.keys(state.sections).find(key => {
          return state.sections[key]?.tiles.includes(tileId);
        });

        if (sectionId === undefined) {
          throw new Error('section with widgetId was not found');
        }
      }

      const section = state.sections[sectionId];

      if (!section) {
        throw new Error('no section with such id');
      }

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
    addTileAction(state, action: PayloadAction<{ sectionId: string, tileId: string }>) {
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
    addTileSectionAction(state, action: PayloadAction<{
      iconCollectionName: string,
      containerName: TileContainersT,
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
    }

  },
  extraReducers: (builder) => builder
    .addMatcher(iconCollectionsApi.endpoints.getIconCollection.matchFulfilled, (state, action) => {
      addCollectionToState(state, action.payload);
    })
    .addMatcher(iconCollectionsApi.endpoints.getMergedIconCollection.matchFulfilled, (state, action) => {
      addCollectionToState(state, action.payload);
    })
});

export const {
  addTileAction,
  updateTileAction,
  addTileSectionAction,
  updateTileSectionAction,
  moveTileAction,
} = normalizedIconCollectionSlice.actions;

export const selectEditorSelectedIconCollectionName: AppSelector<string | null> = state => state.editor.selectedIconCollectionName;
export const useNormalizedIconCollection = (name: string) => useAppSelector(state => state.normalizedIconCollection.collections[name] ?? null);
export const useNormalizedTileSection = (id: string) => useAppSelector(state => state.normalizedIconCollection.sections[id] ?? null);
export const useNormalizedTile = (id: string) => useAppSelector(state => state.normalizedIconCollection.tiles[id] ?? null);


function addCollectionToState(state: NormalizedTileCollectionStateT, collection: IconCollectionT) {

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
    top: normalizeContainer(collection.top),
    right: normalizeContainer(collection.right),
    bottom: normalizeContainer(collection.bottom),
    left: normalizeContainer(collection.left),
    middle: normalizeContainer(collection.middle),
  };
}

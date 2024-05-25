export type Normalize<T, K extends keyof T> = Omit<T, K> & { [k in K]: string[] };
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type UrlIconT = { url: string };

export function isUrlIconT(icon: AnyIconT | null): icon is UrlIconT {
  return icon !== null && 'url' in icon;
}

export type TextIconT = {
  text: string;
  bgColor: string;
  fontSize: number;
};

export function isTextIconT(icon: AnyIconT | null): icon is TextIconT {
  return icon !== null && 'text' in icon;
}

export type AnyIconT = UrlIconT | TextIconT;

export type TileT = {
  title: string;
  icon: AnyIconT | null;
  url: string;
  order: number | null;
}

export type TileSectionT = {
  title: string;
  width: number | null;
  tiles: TileT[];
  order: number;
}

export type NormalizedTileSectionT = Normalize<TileSectionT, 'tiles'>;

export type TileContainerT = TileSectionT[];

export type TileContainerNameT =
  | 'top'
  | 'middle'
  | 'left'
  | 'right'
  | 'bottom';

export enum TileCollectionTheme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  SYSTEM_DEFAULT = 'SYSTEM_DEFAULT',
}

export type TileCollectionT = {
  readonly name: string;
  theme: TileCollectionTheme;
  includes: string[] | null;
  settings: Partial<TileCollectionSettingsT>;
} & Record<TileContainerNameT, TileContainerT | null>;

export interface TileCollectionSettingsT {
  logoUrl: string;
  backgroundUrl: string;
  darkMode: boolean;
  showTitles: boolean;
  zoomLevel: number;
}

export type NormalizedTileCollectionT = Normalize<TileCollectionT, TileContainerNameT>;

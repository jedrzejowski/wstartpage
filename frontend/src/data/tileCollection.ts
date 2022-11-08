export type Normalize<T, K extends keyof T> = Omit<T, K> & { [k in K]: string[] };
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};


export const isProduction = process.env.NODE_ENV === 'production';

export type UrlIconT = string;

export function isUrlIconT(icon: AnyIconT | null): icon is UrlIconT {
  return typeof icon === 'string';
}

export type TextIconT = {
  text: string;
  bgColor: string;
  fontSize: number;
};

export function isTextIconT(icon: AnyIconT | null): icon is TextIconT {
  return icon !== null && typeof icon === 'object';
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

export type TileContainersT =
  | 'top'
  | 'middle'
  | 'left'
  | 'right'
  | 'bottom';

export type TileCollectionT = {
  readonly name: string;
  includes: string[] | null;
  settings: Partial<TileCollectionSettingsT>;
} & Record<TileContainersT, TileContainerT | null>;

export interface TileCollectionSettingsT {
  logoUrl: string;
  backgroundUrl: string;
  darkMode: boolean;
  showTitles: boolean;
  zoomLevel: number;
}

export type NormalizedTileCollectionT = Normalize<TileCollectionT, TileContainersT>;

export function textIconFromStr(iconText: string): TextIconT {
  const data: any = {};
  iconText = iconText.substring(1);
  const params = new URLSearchParams(iconText);
  for (let [key, value] of params.entries()) {
    data[key] = value;
  }

  return {
    text: data.text ?? '',
    bgColor: data.bgColor ?? '',
    fontSize: data.fontSize ?? '',
  };
}

export function textIconToStr(iconText: TextIconT): string {
  // @ts-ignore
  return '!' + new URLSearchParams(iconText).toString();
}

export type ImageInode = ImageFile | ImageDir;

export type ImageDir = {
  type: 'dir';
  name: string;
  fullPath: string;
  children: ImageInode[] | null;
}

export type ImageFile = {
  type: 'file';
  name: string;
  fullPath: string;
}

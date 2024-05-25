import React, {FC, useCallback, useState} from "react";
import Dialog, {DialogContent, DialogTitle, makeDialogLatch} from "../Dialog.tsx";
import {apiSlice} from "../../data/slice/apiSlice.ts";
import {ImageDir, ImageFile} from "../../data/images.ts";
import imgUrl from "../../data/fetch.ts";
import styled from "styled-components";
import MdiIcon from "../MdiIcon.tsx";


const ImageBrowser: FC<{
  onFileClick?: (file: ImageFile) => void;
  onBrowse?: (dir: string) => void;
  tileWidth?: number;
}> = (props) => {
  const [browsePath, setBrowsePath] = useState<string[]>([]);
  const browseImageDirectoryQuery = apiSlice.useBrowseImageDirectoryQuery({
    path: browsePath.join('/'),
  });

  function handleDirBrowse(dirName: string) {
    let newBrowsePath: string[]
    if (dirName == "..") {
      newBrowsePath = browsePath.slice(0, -1);
    } else {
      newBrowsePath = [...browsePath, dirName];
    }
    setBrowsePath(newBrowsePath);
    props.onBrowse?.(newBrowsePath.join('/'));
  }

  return <ContainerRoot>

    {browsePath.length > 0 && (
      <DirImageTileItem
        dir={{
          type: "dir",
          name: "..",
          fullPath: ".",
          children: null,
        }}
        onClick={() => handleDirBrowse("..")}
      />
    )}

    {browseImageDirectoryQuery.data?.map(inode => {
      if (inode.type === 'file') {
        return <FileImageTileItem
          key={inode.name}
          file={inode}
          onClick={() => props.onFileClick?.(inode)}
        />;
      }

      if (inode.type === 'dir') {
        return <DirImageTileItem
          key={inode.name}
          dir={inode}
          onClick={() => handleDirBrowse(inode.name)}
        />;
      }

      return null;
    })}
  </ContainerRoot>;
}

export default ImageBrowser;

const DirImageTileItem: FC<{
  dir: ImageDir;
  onClick?: () => void;
}> = (props) => {
  return <TileRoot onClick={props.onClick}>
    <TileImageRoot>
      <MdiIcon icon="folder-outline" size={72}/>
    </TileImageRoot>
    <TileName>
      {props.dir.name}
    </TileName>
  </TileRoot>
}

const FileImageTileItem: FC<{
  file: ImageFile;
  onClick?: () => void;
}> = (props) => {
  return <TileRoot onClick={props.onClick}>
    <TileImageRoot>
      <img
        src={imgUrl(props.file.fullPath)}
        alt={props.file.name}
      />
    </TileImageRoot>
    <TileName>
      {props.file.name}
    </TileName>
  </TileRoot>
}

const ContainerRoot = styled.div`
  display: flex;
  max-width: 1024px;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing(1)};
`;

const TileRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  width: fit-content;
  padding: ${props => props.theme.spacing(1)};
  gap: ${props => props.theme.spacing(1)};
  cursor: pointer;
`;

const TileImageRoot = styled.div`
  display: flex;
  align-items: center;
  width: 72px;
  height: 72px;

  > img {
    width: 100%;
  }
`;

const TileName = styled.div`
  width: 128px;
  word-wrap: break-word;
  text-align: center;
`;

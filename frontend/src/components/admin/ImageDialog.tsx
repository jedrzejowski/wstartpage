import React, {FC} from "react";
import Dialog, {DialogContent, DialogTitle, makeDialogLatch} from "../Dialog.tsx";
import ImageBrowser from "./ImageBrowser.tsx";
import type {ImageFile} from "../../data/images.ts";

const ImageDialog: FC<{
  open: boolean;
  title?: string;
  onFilePicked: (file: ImageFile) => void;
  onClose?: () => void;
}> = (props) => {

  return <Dialog open={props.open} onBackdropClick={props.onClose}>

    <DialogTitle>
      {props.title ?? 'Obrazki'}
    </DialogTitle>

    <DialogContent>
      <ImageBrowser
        onFileClick={props.onFilePicked}
      />
    </DialogContent>

  </Dialog>;
}

export default makeDialogLatch(ImageDialog);

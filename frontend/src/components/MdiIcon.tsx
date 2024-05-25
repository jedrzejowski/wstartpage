import type {FC} from 'react';
import Icon from '@mdi/react';
import type {IconProps} from '@mdi/react/dist/IconProps';
import * as mdi from "@mdi/js";

// skopiowane z biblioteki
type MdiIconProps = Omit<IconProps, 'path'> & {
  icon: keyof typeof icons;
}

const MdiIcon: FC<MdiIconProps> = props => {
  const {icon, ...rest} = props;

  return <Icon style={{height: '1.15em'}} path={icons[icon]} {...rest}/>;
};

const icons = {
  'content-save-icon': mdi.mdiContentSave,
  'arrow-left': mdi.mdiArrowLeft,
  'arrow-right': mdi.mdiArrowRight,
  'arrow-down': mdi.mdiArrowDown,
  'arrow-up': mdi.mdiArrowUp,
  'delete': mdi.mdiDelete,
  'plus': mdi.mdiPlus,
  'folder-outline': mdi.mdiFolderOutline,
  'file-outline': mdi.mdiFileOutline,
  'image': mdi.mdiImage,
};

export type MdiIconKey = keyof typeof icons;

export default MdiIcon;

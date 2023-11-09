import type {FC} from 'react';
import Icon from '@mdi/react';
import type {IconProps} from '@mdi/react/dist/IconProps';
import {mdiArrowDown, mdiArrowLeft, mdiArrowRight, mdiArrowUp, mdiContentSave, mdiDelete, mdiPlus} from "@mdi/js";

// skopiowane z biblioteki
type MdiIconProps = Omit<IconProps, 'path'> & {
  icon: keyof typeof icons;
}

const MdiIcon: FC<MdiIconProps> = props => {
  const {icon, ...rest} = props;

  return <Icon style={{height: '1.15em'}} path={icons[icon]} {...rest}/>;
};

const icons = {
  'content-save-icon': mdiContentSave,
  'arrow-left': mdiArrowLeft,
  'arrow-right': mdiArrowRight,
  'arrow-down': mdiArrowDown,
  'arrow-up': mdiArrowUp,
  'delete': mdiDelete,
  'plus': mdiPlus,
};

export type MdiIconKey = keyof typeof icons;

export default MdiIcon;

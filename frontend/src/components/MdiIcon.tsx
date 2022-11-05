import {CSSProperties, FC, RefObject} from 'react';
import Icon from '@mdi/react';
import {mdiArrowLeft, mdiArrowRight, mdiContentSave, mdiDelete} from '@mdi/js';
import {HTMLProps} from '@mdi/react/dist/IconProps';

// skopiowane z biblioteki
interface IconProps extends HTMLProps {
  id?: string;
  icon: keyof typeof icons;
  ref?: RefObject<SVGSVGElement>;
  title?: string | null;
  description?: string | null;
  size?: number | string | null;
  color?: string | null;
  horizontal?: boolean;
  vertical?: boolean;
  rotate?: number;
  spin?: boolean | number;
  style?: CSSProperties;
  inStack?: boolean;
}

const MdiIcon: FC<IconProps> = props => {
  const {icon, ...rest} = props;

  return <Icon path={icons[icon]} {...rest}/>;
};

const icons = {
  'content-save-icon': mdiContentSave,
  'arrow-left': mdiArrowLeft,
  'arrow-right': mdiArrowRight,
  'delete': mdiDelete,
};

export type MdiIconKey = keyof typeof icons;

export default MdiIcon;

import type {FC} from 'react';
import Icon from '@mdi/react';
import type {IconProps} from '@mdi/react/dist/IconProps';

// skopiowane z biblioteki
type MdiIconProps = Omit<IconProps, 'path'> & {
  icon: keyof typeof icons;
}

const MdiIcon: FC<MdiIconProps> = props => {
  const {icon, ...rest} = props;

  return <Icon style={{height: '1.15em'}} path={icons[icon]} {...rest}/>;
};

const icons = {
  'content-save-icon': require('@mdi/js').mdiContentSave,
  'arrow-left': require('@mdi/js').mdiArrowLeft,
  'arrow-right': require('@mdi/js').mdiArrowRight,
  'arrow-down': require('@mdi/js').mdiArrowDown,
  'arrow-up': require('@mdi/js').mdiArrowUp,
  'delete': require('@mdi/js').mdiDelete,
  'plus': require('@mdi/js').mdiPlus,
};

export type MdiIconKey = keyof typeof icons;

export default MdiIcon;

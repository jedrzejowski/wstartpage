import React, {ComponentType, FC, MouseEventHandler, ReactElement, ReactFragment, ReactNode} from 'react';
import styled from 'styled-components';
import {InputRoot} from './styled';
import MdiIcon, {MdiIconKey} from '../MdiIcon';

interface ButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  startIcon?: ReactElement | ReactFragment | MdiIconKey | null | undefined;
  endIcon?: ReactElement | ReactFragment | MdiIconKey | null | undefined;
}

const Button: FC<ButtonProps> = props => {
  let {onClick, children, startIcon, endIcon} = props;

  if (typeof startIcon === 'string') startIcon = <MdiIcon icon={startIcon as MdiIconKey}/>;
  if (typeof endIcon === 'string') endIcon = <MdiIcon icon={endIcon as MdiIconKey}/>;

  return <ButtonInput onClick={onClick}>
    {startIcon && <StartIconRoot>{startIcon}</StartIconRoot>}
    {children && <span>{children}</span>}
    {endIcon && <EndIconRoot>{endIcon}</EndIconRoot>}
  </ButtonInput>;
};

export default React.memo(Button);

const ButtonInput = styled.button`
  display: flex;
  box-sizing: border-box;
  background: white;
  border: 1px solid ${props => props.theme.color.border};
  align-items: center;
  background: none;
  outline: none;
  padding: ${props => props.theme.spacing4(1, 2, 1, 2)};
  cursor: pointer;

  & > span + span {
    margin-left: ${props => props.theme.spacing(1.5)};
  }
`;

const IconRoot = styled.span`
  svg {
    height: 1.55em;
  }
`;

const StartIconRoot = styled(IconRoot)`
`;
const EndIconRoot = styled(IconRoot)``;

export const InlineButton: FC<ButtonProps> = React.memo(props => {

  return <InlineButtonInput onClick={props.onClick}>
    <InlineBackground>
      {props.children}
    </InlineBackground>
    <span>{props.children}</span>
  </InlineButtonInput>;
});

const InlineBackground = styled.span`
  display: none;
  position: absolute;
  content: "";
  background: red;
  margin: ${props => props.theme.spacing(-1)};
  padding: ${props => props.theme.spacing(1)};
  border-radius: 2px;
`;

const InlineButtonInput = styled.button`
  display: inline-block;
  background: none;
  position: relative;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  padding: ${props => props.theme.spacing(1)};

  &:hover > ${InlineBackground} {
    display: inline-block;
  }
`;


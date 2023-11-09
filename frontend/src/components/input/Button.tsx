import {memo, FC, MouseEventHandler, ReactElement, ReactNode} from 'react';
import styled from 'styled-components';
import MdiIcon, {MdiIconKey} from '../MdiIcon';

interface ButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  startIcon?: ReactElement | MdiIconKey | null | undefined;
  endIcon?: ReactElement | MdiIconKey | null | undefined;
}

const Button: FC<ButtonProps> = props => {
  let {onClick, children, startIcon, endIcon} = props;

  if (typeof startIcon === 'string') startIcon = <MdiIcon icon={startIcon as MdiIconKey}/>;
  if (typeof endIcon === 'string') endIcon = <MdiIcon icon={endIcon as MdiIconKey}/>;

  return <ButtonRoot onClick={onClick}>
    {startIcon && <IconRoot>{startIcon}</IconRoot>}
    {children && <ButtonContent>{children}</ButtonContent>}
    {endIcon && <IconRoot>{endIcon}</IconRoot>}
  </ButtonRoot>;
};

export default memo(Button);

const ButtonRoot = styled.button`
  display: flex;
  box-sizing: border-box;
  border: 1px solid ${props => props.theme.color.border};
  align-items: center;
  background: white;
  outline: none;
  padding: ${props => props.theme.spacing(0.5, 1)};
  cursor: pointer;

  & > span + span {
    margin-left: ${props => props.theme.spacing(1)};
  }

  &:hover {
    background: ${props => props.theme.color.hover};
  }
`;

const IconRoot = styled.span`
  display: inline-flex;
`;

const ButtonContent = styled.span`
  display: inline-flex;
`;

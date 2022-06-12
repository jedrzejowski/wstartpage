import React, {ComponentType, FC, MouseEventHandler, ReactNode} from 'react';
import styled from 'styled-components';
import {InputRoot} from './styled';

interface ButtonProps {
  children: ReactNode;
  icon?: ComponentType;
  disabled?: boolean;
  onClick?: MouseEventHandler;
}

export const Button: FC<ButtonProps> = React.memo(props => {

  return <InputRoot>
    <ButtonInput onClick={props.onClick}>
      {props.icon ? React.createElement(props.icon) : null}
      {props.children}
    </ButtonInput>
  </InputRoot>;
});

const ButtonInput = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  padding: ${props => props.theme.spacing4(1, 2, 1, 2)};
  cursor: pointer;
  //font-size: 1.05em;

  & > svg:first-child {
      //margin-right: ${props => props.theme.spacing(1.5)};
  }
`;

export default Button;

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


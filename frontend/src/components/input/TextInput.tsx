import React, {DOMAttributes, FC, InputHTMLAttributes} from 'react';
import styled from 'styled-components';
import {useUniqueId} from '../../data/uniqueId';
import {BaseInputProps} from './BaseInput';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & BaseInputProps<string> & {
  password?: boolean;
};

const TextInput: FC<TextInputProps> = (props) => {
  const {
    value,
    label,
    inputRef,
    password,
    onValueChange,
    ...rest
  } = props;

  const myId = useUniqueId('input-');

  return <Root>
    <Label htmlFor={myId}>{label}</Label>
    <Input
      ref={inputRef}
      id={myId}
      value={value}
      onChange={onValueChange ? (e => onValueChange(e.target.value)) : undefined}
      type={password ? 'password' : undefined}
      {...rest}
    />
  </Root>;
};

const Root = styled.div`
  box-sizing: border-box;
  background: ${props => props.theme.color.background};
  color: ${props => props.theme.color.text};
  border: 1px solid ${props => props.theme.color.border};

  &:focus-within {
    box-shadow: ${props => props.theme.shadow()};
  }
`;

const Label = styled.label`
  display: block;
  box-sizing: border-box;
  padding: ${props => props.theme.spacing(1, 1, 0, 1)};
  font-size: 0.7em;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  background: transparent;
  padding: ${props => props.theme.spacing(1)};
  outline: none;
  border: none;
  font-size: 1em;
  color: ${props => props.theme.color.text};
`;

export default TextInput;

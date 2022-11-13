import React, {FC} from 'react';
import styled from 'styled-components';
import {useUniqueId} from '../../data/uniqueId';
import {BaseInputProps} from './BaseInput';

export type TextInputProps = BaseInputProps<string> & {
  password?: boolean;
};

const TextInput: FC<TextInputProps> = (props) => {
  const {label, inputRef, password, onValueChange} = props;

  const myId = useUniqueId('input-');

  return <Root>
    <Label htmlFor={myId}>{label}</Label>
    <Input
      ref={inputRef}
      id={myId}
      value={props.value}
      onChange={onValueChange ? (e => onValueChange(e.target.value)) : undefined}
      type={password ? 'password' : undefined}
    />
  </Root>;
};

const Root = styled.div`
  box-sizing: border-box;
  background: white;
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

`;

export default TextInput;

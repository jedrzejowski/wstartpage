import React, {FC, MutableRefObject, ReactNode, RefObject} from 'react';
import styled from 'styled-components';
import {useUniqueId} from '../../data/uniqueId';
import {BaseInputProps} from './_';

export type TextInputProps = BaseInputProps<string>;

const TextInput: FC<TextInputProps> = (props) => {
  const {label, inputRef} = props;

  const id = useUniqueId('text-input-');

  return <Root>
    <Label htmlFor={id}>{label}</Label>
    <Input
      ref={inputRef}
      id={id}
      value={props.value}
      onChange={e => {
        props.onChange(e.target.value);
      }}
    />
  </Root>;
};

const Root = styled.div`
  box-sizing: border-box;
  background: white;
  border: 1px solid ${props => props.theme.color.border};
`;

const Label = styled.label`
  display: block;
  box-sizing: border-box;
  padding: ${props => props.theme.spacing4(1, 1, 0, 1)};
  font-size: ${props => 0.8 * props.theme.zoomFactor}em;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  background: transparent;
  padding: ${props => props.theme.spacing(1)};
  outline: none;
  border: none;
  font-size: ${props => 1.2 * props.theme.zoomFactor}em;
`;

export default TextInput;

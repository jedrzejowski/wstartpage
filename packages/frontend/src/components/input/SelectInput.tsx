import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import {BaseInputProps} from './_';
import styled from 'styled-components';
import {useUniqueId} from '../../data/uniqueId';

export type SelectInputProps<T = any> = BaseInputProps<T> & {
  options: { value: T, label: ReactNode }[];
}


const SelectInput: FC<SelectInputProps> = props => {
  const {options, label, value, onChange} = props;

  const [isOpen, setIsOpen] = useState(false);
  const id = useUniqueId('select-input-');
  const rootRef = useRef();
  const optionsRootRef = useRef();

  useEffect(() => {
    if (isOpen) {
      if (!optionsRootRef.current) return;

    }
  }, [isOpen]);

  const selectedItem = options.find(it => it.value === value);

  return <Root>
    <Label htmlFor={id}>{label}</Label>
    <Option onClick={handleOpen}>{selectedItem && selectedItem.label}</Option>

    {isOpen && <>
      <TransparentShutter onClick={handleClose}/>
      <OptionsRoot>
        {options.map(option => {
          return <Option onClick={() => handleOptionClick(option.value)}>
            {option.label}
          </Option>;
        })}
      </OptionsRoot>
    </>}
  </Root>;

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleOptionClick(value: any) {
    handleClose();
    onChange(value);
  }
};

export default SelectInput;

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

const Option = styled.div`
  display: block;
  box-sizing: border-box;
  width: 100%;
  background: transparent;
  padding: ${props => props.theme.spacing(1)};
  outline: none;
  border: none;
  font-size: ${props => 1.2 * props.theme.zoomFactor}em;
`;

const OptionsRoot = styled.div`
  position: fixed;
  background: ${props => props.theme.color.background1};
  border: 1px solid ${props => props.theme.color.border};
`;

const TransparentShutter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border: 0;
  width: 100%;
  height: 100%;
  background: transparent;
`;

import React, {MouseEvent, ReactElement, ReactNode, useEffect, useRef, useState} from 'react';
import {BaseInputProps} from './BaseInput';
import styled from 'styled-components';
import {noop} from '../../util/typescript';
import {useEventListener} from 'usehooks-ts';

export type SelectInputProps<T = any> = BaseInputProps<T> & {
  options: Readonly<{ readonly value: T, readonly  label: ReactNode }[]>;
}

function SelectInput<T>(props: SelectInputProps<T>): ReactElement | null {
  const {options, label, value, onValueChange = noop} = props;

  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const popupRootRef = useRef<HTMLDivElement>(null);
  const selectedItem = options.find(it => it.value === value);

  useEffect(() => {
    if (isOpen) {
      if (!popupRootRef.current || !rootRef.current) return;

      popupRootRef.current.style.left = rootRef.current.offsetLeft + 'px';
      popupRootRef.current.style.top = rootRef.current.offsetTop + 'px';
      popupRootRef.current.style.width = rootRef.current.offsetWidth + 'px';

    }
  }, [isOpen]);

  useEventListener('focus', () => {
    setIsOpen(true);
  }, rootRef);

  useEventListener('blur', () => {
    setIsOpen(false);
  }, rootRef);

  return <Root ref={rootRef} tabIndex={0}>
    <Label>{label}</Label>
    <BaseOption onClick={handleOpen}>{selectedItem && selectedItem.label}</BaseOption>

    {isOpen && <>
      <TransparentShutter onClick={handleClose}/>
      <PopupRoot ref={popupRootRef}>
        <Label>{label}</Label>
        <OptionsRoot>
          {options.map((option, i) => {
            return <Option key={i} onClick={handleOptionClickFactory(option.value)}>
              {option.label}
            </Option>;
          })}
        </OptionsRoot>
      </PopupRoot>
    </>}
  </Root>;

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleOptionClickFactory(value: any) {
    return (e: MouseEvent) => {
      handleClose();
      onValueChange(value);
    };
  }
}

export default SelectInput;

const Root = styled.div`
  box-sizing: border-box;
  background: white;
  border: 1px solid ${props => props.theme.color.border};

  &:focus-within {
    outline: none;
  }
`;

const Label = styled.label`
  display: block;
  box-sizing: border-box;
  padding: ${props => props.theme.spacing(1, 1, 0, 1)};
  font-size: 0.7em;
`;

const BaseOption = styled.div`
  display: block;
  box-sizing: border-box;
  width: 100%;
  background: transparent;
  padding: ${props => props.theme.spacing(1)};
  outline: none;
  border: none;
  font-size: 1em;
  cursor: pointer;
`;

const Option = styled(BaseOption)`
  & + & {
    border-top: 1px solid ${props => props.theme.color.border};
  }

  &:hover {
    background-color: ${props => props.theme.color.hover};
  }
`;

const PopupRoot = styled.div`
  position: fixed;
  background: ${props => props.theme.color.background1};
  border: 1px solid ${props => props.theme.color.border};
  box-shadow: ${props => props.theme.shadow()};
`;

const OptionsRoot = styled.div`
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

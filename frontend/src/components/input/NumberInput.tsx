import React, {FC, RefObject, useEffect, useState} from 'react';
import TextInput from './TextInput';
import {useRefOrMyRef} from '../../util/react';
import {useEventListener} from 'usehooks-ts';
import {BaseInputProps} from './_';

export type NumberInputProps = BaseInputProps<number> & {
  rootRef?: RefObject<HTMLInputElement>;
};

const NumberInput: FC<NumberInputProps> = props => {
  const {onChange, value, rootRef, ...rest} = props;

  const [strValue, setStrValue] = useState(value.toString());
  const ref = useRefOrMyRef(rootRef);

  useEventListener('focusout', () => {
    setStrValue(value.toString());
  }, ref);

  useEffect(() => {
    if (value !== parseFloat(strValue))
      setStrValue(value.toString());
  }, [value]);

  return <TextInput {...rest} value={strValue} onChange={handleOnChange}/>;

  function handleOnChange(newValue: string) {

    const oldNumber = parseFloat(strValue);
    const newNumber = parseFloat(newValue);

    if (isNaN(newNumber)) {
      return;
    }

    setStrValue(newValue);

    if (oldNumber != newNumber) {
      onChange(newNumber);
    }
  }
};
export default React.memo(NumberInput);

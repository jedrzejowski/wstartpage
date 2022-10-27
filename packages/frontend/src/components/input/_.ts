import {ReactNode, RefObject} from 'react';

export type BaseInputProps<T> = {
  id?: string;
  label: ReactNode;
  value: T;
  onChange: (newValue: T) => void;
  inputRef?: RefObject<HTMLInputElement> | undefined;
}

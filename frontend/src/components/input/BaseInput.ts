import {ReactNode, RefObject, SyntheticEvent} from 'react';

export type BaseInputProps<T> = {
  id?: string;
  label: ReactNode;
  value: T;
  onValueChange?: (newValue: T) => void;
  inputRef?: RefObject<HTMLInputElement> | undefined;
}

import React, {FC} from "react";
import {TextInput, TextInputProps} from "./TextInput";

export type NumberInputProps = Omit<TextInputProps, "value" | "onChange"> & {
    value: number;
    onChange: (newValue: number) => void;
}

export const NumberInput: FC<NumberInputProps> = React.memo(props => {

    return <TextInput {...props} value={props.value + ""} onChange={handleOnChange}/>;

    function handleOnChange(newValue: string) {

        const newNumber = parseFloat(newValue);

        if (isNaN(newNumber)) {
            return;
        }

        props.onChange(newNumber);
    }
});

export default NumberInput;

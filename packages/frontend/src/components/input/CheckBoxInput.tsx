import React, {ChangeEvent, ChangeEventHandler, FC, ReactNode, useMemo, useRef} from "react";
import styled from "styled-components";
import genId from "../../data/genId()";

export const CheckBoxInput: FC<{
    label: ReactNode;
} & ({
    tristate?: false;
    value: boolean;
    onChange: (newValue: boolean) => void;
} | {
    tristate: true;
    value: boolean | null;
    onChange: (newValue: boolean | null) => void;
})> = React.memo(({label, tristate, value, onChange}) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const id = useMemo(() => genId("check-input-"), []);

    return <Root htmlFor={id}>
        <Input
            id={id}
            type="checkbox"
            ref={inputRef}
            checked={value ?? undefined}
            onChange={handleCheck}
        />
        <AfterInput/>
        <Label>{label}</Label>
    </Root>;

    function handleCheck(e: ChangeEvent<HTMLInputElement>) {
        onChange(e.target.checked)
    }
});

export default CheckBoxInput;

const Root = styled.label`
    display: flex;
    height: 34px;
    box-sizing: border-box;
    align-items: center;
`

const Input = styled.input`
    display: none;
`;

const Label = styled.span`
    display: block;
    box-sizing: border-box;
    font-size: ${props => 0.8 * props.theme.zoomFactor}em;
    padding: 0 0 0 ${props => props.theme.spacing(2)};
    user-select: none;
`;

const AfterInput = styled.div` 
    display: block;
    height: 34px;
    width: 34px;
    background: white;
    position: relative;
    box-sizing: border-box;
    border: 1px solid ${props => props.theme.color.border};
    
    &:after {
        content: "";
        position: absolute;
        display: none;
        left: 10px;
        top: 5px;
        width: 8px;
        height: 13px;
        border: solid black;
        border-width: 0 4px 4px 0;
        transform: rotate(45deg);
    }
    
    input:checked + &:after {
        display: block;
    }
    
`;

import React, {
    FC,
    ReactNode,
    useMemo,
    useRef,
} from "react";
import styled from "styled-components";
import genId from "../../data/genId";

let i = 0;

export type TextInputProps = {
    id?: string;
    label: ReactNode;
    value: string;
    pattern?: string;
    onChange: (newValue: string) => void;
}

export const TextInput: FC<TextInputProps> = React.memo(props => {
    const {label} = props;

    const ref = useRef<HTMLInputElement>(null);
    const id = useMemo(() => props.id ?? genId("text-input-"), [props.id]);

    return <Root>
        <Label htmlFor={id}>{label}</Label>
        <Input
            ref={ref}
            id={id}
            value={props.value}
            pattern={props.pattern}
            onChange={e => {
                props.onChange(e.target.value)
            }}
        />
    </Root>
});

const Root = styled.div`
    box-sizing: border-box;
    background: white;
    border: 1px solid ${props => props.theme.color.border};
`

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
import React, {FC, ReactNode, useMemo} from "react";
import IconWidgetForm from "./IconWidgetForm";
import styled from "styled-components";

let i = 0;

export const TextInput: FC<{
    label?: ReactNode;
}> = React.memo(props => {
    const {label} = props;

    const id = useMemo(() => (++i) + "", []);

    return <Root>
        {label ? <Label htmlFor={id}>{label}</Label> : null}
        <Input id={id}/>
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
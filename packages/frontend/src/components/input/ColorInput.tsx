import React, {FC, ReactNode, useMemo} from "react";
import {SketchPicker, Color, ColorChangeHandler} from "react-color";
import styled from "styled-components";
import genId from "../../data/genId()";

export const ColorInput: FC<{
    id?: string;
    label: ReactNode;
    value: Color;
    onChange: ColorChangeHandler;
}> = React.memo(props => {

    const id = useMemo(() => props.id ?? genId("color-input-"), [props.id]);

    return <Root>
        <Label htmlFor={id}>{props.label}</Label>
        <SketchPicker
            color={props.value}
            onChangeComplete={props.onChange}
            width="inherit"
            disableAlpha
            styles={SKETCH_PICKER_STYLES}
        />
    </Root>;
});

const Label = styled.label`
    display: block;
    box-sizing: border-box;
    padding: ${props => props.theme.spacing4(1, 1, 0, 1)};
    font-size: ${props => 0.8 * props.theme.zoomFactor}em;
`;

const Root = styled.div`
    box-sizing: border-box;
    background: white;
    border: 1px solid ${props => props.theme.color.border};
`;

const SKETCH_PICKER_STYLES = {
    default: {
        picker: {
            background: "transparent",
            boxShadow: "",
        }
    }
};

export default ColorInput;
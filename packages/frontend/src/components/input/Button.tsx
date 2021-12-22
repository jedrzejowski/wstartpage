import React, {FC} from "react";
import styled from "styled-components";
import {InputRoot} from "./styled";

export const Button: FC = React.memo(props => {

    return <InputRoot>
        <ButtonInput>{props.children}</ButtonInput>
    </InputRoot>;
});

const ButtonInput = styled.button`
    background: none;
    border: none;
    outline: none;
    padding: ${props => props.theme.spacing4(1, 2, 1, 2)};
    cursor: pointer;
`;


export default Button;
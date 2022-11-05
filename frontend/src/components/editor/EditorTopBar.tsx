import React, {FC} from "react";
import styled from "styled-components";
import {FlexExpand, FlexToolbar} from "../UtilityElements";
import SaveButton from "./SaveButton";

export const EditorTopBar: FC = React.memo(props => {
    return <FlexToolbar style={{height: "100%"}}>
        <Title>WStartpage</Title>
        <FlexExpand/>

        <SaveButton/>

    </FlexToolbar>;

});

const Title = styled.h1`
    display: inline-block;
    margin: 0;
    font-size: 2em;
`;


export default EditorTopBar;
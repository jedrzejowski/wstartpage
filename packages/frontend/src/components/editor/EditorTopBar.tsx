import React, {FC} from "react";
import styled from "styled-components";
import Button from "../input/Button";

export const EditorTopBar: FC = React.memo(props => {
    return <Root>
        <Title>WStartpage</Title>
        <Spacer/>
        <Button onClick={() => null}>Zapisz</Button>
    </Root>
});

const Root = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const Spacer = styled.div`
    flex: 1;
`;

const Title = styled.h1`
    display: inline-block;
    margin: 0;
    font-size: 2em;
`;


export default EditorTopBar;
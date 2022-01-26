import React, {FC, useEffect} from "react";
import AppLayout from "../AppLayout";
import EditorTopBar from "./EditorTopBar";
import styled from "styled-components";
import EditorIconCollectionList from "./EditorIconCollectionList";
import {useAppDispatch, useAppSelector} from "../../data/hooks";
import StartPage from "../startpage/StartPage";
import EditorFormContainer from "./EditorFormContainer";
import editorSlice from "../../data/slice/editorSlice";

const StartPageEditor: FC = props => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(editorSlice.actions.setIsOn(true));
    }, [])

    return <Root>
        <AppLayout
            fixed
            top={<HPanel border="bottom"><EditorTopBar/></HPanel>}
            middle={<StartPagePreview/>}
            left={<VPanel border="right"><EditorIconCollectionList/></VPanel>}
            right={<VPanel border="left"><EditorFormContainer/></VPanel>}
        />
    </Root>;
}

const Root = styled.div`
    height: 100vh;
`;

const StartPagePreview = React.memo(props => {
    const selectedIconCollectionName = useAppSelector(state => state.editor.selectedIconCollectionName);

    if (!selectedIconCollectionName) {
        return null;
    }

    return <StartPage iconCollectionName={selectedIconCollectionName}/>;
});

const HPanel = styled.div<{ border: "top" | "bottom" }>`
    width: 100%;
    height: 48px;
    border-${props => props.border}: 1px solid ${props => props.theme.color.border};
    box-sizing: border-box;
    padding: ${props => props.theme.spacing(1)};
`

const VPanel = styled.div<{ border: "right" | "left" }>`
    min-height: 100%;
    width: 340px;
    border-${props => props.border}: 1px solid ${props => props.theme.color.border};
    box-sizing: border-box;
`

export default StartPageEditor
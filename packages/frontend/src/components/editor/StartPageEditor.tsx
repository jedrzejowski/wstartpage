import React, {FC, useEffect} from "react";
import AppLayout from "../AppLayout";
import EditorHeader from "./EditorHeader";
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
            top={<EditorHeader/>}
            middle={<StartPagePreview/>}
            left={<SidePanel border="right"><EditorIconCollectionList/></SidePanel>}
            right={<SidePanel border="left"><EditorFormContainer/></SidePanel>}
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


const SidePanel = styled.div<{ border: "right" | "left" }>`
    min-height: 100%;
    width: 340px;
    border-${props => props.border}: 1px solid ${props => props.theme.color.border};
    box-sizing: broder-box;
`

export default StartPageEditor
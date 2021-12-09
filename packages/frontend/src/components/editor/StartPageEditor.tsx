import React, {FC} from "react";
import AppLayout from "../AppLayout";
import EditorHeader from "./EditorHeader";
import styled from "styled-components";
import EditorIconList from "./EditorIconList";
import {useAppSelector} from "../../data/hooks";
import StartPage from "../startpage/StartPage";
import {useIconCollection} from "../../data/iconCollection";

const StartPageEditor: FC = props => {

    return <AppLayout
        top={<EditorHeader/>}
        middle={<StartPagePreview/>}
        left={<SidePanel border="right"><EditorIconList/></SidePanel>}
        right={<SidePanel border="left"></SidePanel>}
    />;
}

const StartPagePreview = React.memo(props => {
    const selectedIconCollectionName = useAppSelector(state => state.editor.selectedIconCollectionName);
    const iconCollection = useIconCollection(selectedIconCollectionName);

    if (!iconCollection.data) {
        return null;
    }

    return <StartPage iconCollection={iconCollection.data}/>;
});

const SidePanel = styled.div<{ border: "right" | "left" }>`
    min-height: 100%;
    width: 340px;
    border-${props => props.border}: 1px solid ${props => props.theme.color.border};
`

export default StartPageEditor
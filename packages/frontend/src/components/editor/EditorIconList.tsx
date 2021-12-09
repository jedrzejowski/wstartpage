import React, {FC} from "react";
import {useIconCollectionList} from "../../data/iconCollection";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../data/hooks";
import editorSlice from "../../data/slice/editorSlice";

export const EditorIconList: FC = React.memo(props => {
    const collectionList = useIconCollectionList();
    const selectedIconCollectionName = useAppSelector(state => state.editor.selectedIconCollectionName);
    const dispatch = useAppDispatch();

    if (!collectionList.data) {
        return null;
    }

    return <>
        {collectionList.data.map(iconCollectionName => {

            const Root = iconCollectionName === selectedIconCollectionName ? SelectedItem : Item;

            return <Root
                key={iconCollectionName}
                onClick={() => dispatch(editorSlice.actions.setSelectedIconCollectionName(iconCollectionName))}
            >{iconCollectionName}</Root>
        })}
    </>;
});

const Item = styled.div`
    padding: ${props => props.theme.spacing(2)};
    cursor: pointer;
    user-select: none;
    
    & + & {
        border-top: 1px solid ${props => props.theme.color.border};
    }
    
    &:hover {
        background-color: ${props => props.theme.color.border};
    }
`;

const SelectedItem = styled(Item)`
    background-color: ${props => props.theme.color.border};
`;

export default EditorIconList;

import React, {FC} from "react";
import {useIconCollectionList} from "../../data/iconCollection";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../data/hooks";
import editorSlice from "../../data/slice/editorSlice";
import iconCollectionSlice from "../../data/slice/iconCollectionSlice";

export const EditorIconCollectionList: FC = React.memo(props => {
    const collectionList = useIconCollectionList();
    const selectedIconCollectionName = useAppSelector(state => state.editor.selectedIconCollectionName);
    const editedIconCollections = useAppSelector(state => state.editor.editedIconCollections);
    const dispatch = useAppDispatch();

    if (!collectionList.data) {
        return null;
    }

    return <>
        {collectionList.data.map(iconCollectionName => {

            const Root = iconCollectionName === selectedIconCollectionName ? SelectedItem : Item;

            return <Root
                key={iconCollectionName}
                onClick={handleClickFactory(iconCollectionName)}
            >
                {iconCollectionName}
                {editedIconCollections.includes(iconCollectionName) ? "*" : null}
            </Root>
        })}
    </>;

    function handleClickFactory(iconCollectionName: string) {
        return () => {
            dispatch(iconCollectionSlice.actions.requestCollectionLoad({collectionName: iconCollectionName}));
            dispatch(editorSlice.actions.setSelectedIconCollectionName(iconCollectionName));
        }
    }
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

export default EditorIconCollectionList;

import React, {FC} from "react";
import styled from "styled-components";
import {iconCollectionSlice, useIconSection, useIconWidget} from "../../data/slice/iconCollectionSlice";
import {useAppDispatch} from "../../data/hooks";
import {FlexExpand, HFlexContainer, PaddedRoot} from "../UtilityElements";
import Button from "../input/Button";
import ArrowLeftIcon from "mdi-react/ArrowLeftIcon";
import DeleteIcon from "mdi-react/DeleteIcon";
import ArrowRightIcon from "mdi-react/ArrowRightIcon";
import TextInput from "../input/TextInput";
import CheckBoxInput from "../input/CheckBoxInput";
import {IconSectionT, IconWidgetT, isTextIconT, isUrlIconT, NormalizedIconSectionT, TextIconT} from "../../types";
import ColorInput from "../input/ColorInput";
import editorSlice from "../../data/slice/editorSlice";
import NumberInput from "../input/NumberInput";

export const IconSectionForm: FC<{
    sectionId: string;
}> = React.memo(({sectionId}) => {
    const section = useIconSection(sectionId);
    const dispatch = useAppDispatch();

    if (!section) {
        return null;
    }

    return <PaddedRoot>

        <HFlexContainer>
            <Button onClick={handleMoveToLeftClick}>
                <ArrowLeftIcon/>
            </Button>
            <FlexExpand/>
            <Button onClick={handleDeleteClick}>
                <DeleteIcon color="red"/>
            </Button>
            <FlexExpand/>
            <Button onClick={handleMoveToRightClick}>
                <ArrowRightIcon/>
            </Button>
        </HFlexContainer>

        <TextInput label="Tytuł" value={section.title} onChange={handleChangeFactory("title")}/>
        <NumberInput label="Kolejność" value={section.order} onChange={handleChangeFactory("order")}/>
    </PaddedRoot>;

    function handleChangeFactory(field: keyof NormalizedIconSectionT) {
        return (newValue: any) => {
            if (!section) {
                return null;
            }

            const newSection = {
                ...section,
                [field]: newValue,
            };

            dispatch(iconCollectionSlice.actions.updateSection({sectionId, section: newSection}));
            dispatch(editorSlice.actions.markCurrentCollectionAsEdited());
        }
    }

    function handleMoveToLeftClick(e: React.MouseEvent) {
        dispatch(iconCollectionSlice.actions.moveIconSection({sectionId, offset: -1}));
    }

    function handleDeleteClick(e: React.MouseEvent) {

    }

    function handleMoveToRightClick(e: React.MouseEvent) {
        dispatch(iconCollectionSlice.actions.moveIconSection({sectionId, offset: 1}));
    }
});


export default IconSectionForm;

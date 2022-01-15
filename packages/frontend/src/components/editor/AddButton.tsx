import React, {FC} from "react";
import {InlineButton} from "../input/Button";
import {useAppDispatch} from "../../data/hooks";
import actions from "../../data/actions";
import genId from "../../data/genId";
import type {IconContainersT} from "../../types";


export const AddIconButton: FC<{
    sectionId: number;
}> = React.memo(({sectionId}) => {
    const dispatch = useAppDispatch();

    return <InlineButton onClick={handleClick}>Dodaj ikonę</InlineButton>

    function handleClick() {
        dispatch(actions.addWidgetIcon({sectionId, widgetId: genId()}));
    }
});

export const AddSectionButton: FC<{
    containerName: IconContainersT;
}> = React.memo(({containerName}) => {
    const dispatch = useAppDispatch();

    return <InlineButton onClick={handleClick}>Dodaj sekcję</InlineButton>

    function handleClick() {
        dispatch(actions.addIconSection({containerName}));
    }
});


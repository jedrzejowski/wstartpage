import React, {FC} from "react";
import TextInput from "../TextInput";
import {iconCollectionSlice, useIconWidget} from "../../data/slice/iconCollectionSlice";
import type {IconWidgetT} from "../../types";
import {useAppDispatch} from "../../data/hooks";

export const IconWidgetForm: FC<{
    widgetId: number;
}> = React.memo(({widgetId}) => {
    const widget = useIconWidget(widgetId);
    const dispatch = useAppDispatch();

    if (!widget) {
        return null;
    }

    return <>
        <TextInput label="Tytuł" value={widget.title} onChange={handleChangeFactory("title")}/>
        <TextInput label="URL" value={widget.url} onChange={handleChangeFactory("url")}/>
        {widget?.icon?.[0] === '!' ? (
            null
        ) : (
            <TextInput label="Ikona" value={widget.icon ?? ""} onChange={handleChangeFactory("icon")}/>
        )}
    </>;

    function handleChangeFactory(field: keyof IconWidgetT) {
        return (newValue: string) => {
            if (!widget) {
                return null;
            }

            const newWidget = {
                ...widget,
                [field]: newValue,
            };
            dispatch(iconCollectionSlice.actions.updateWidget({widgetId, widget: newWidget}));
        }
    }
});

export default IconWidgetForm;
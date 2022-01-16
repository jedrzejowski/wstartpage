import React, {FC, useState} from "react";
import TextInput from "../input/TextInput";
import {iconCollectionSlice, useIconWidget} from "../../data/slice/iconCollectionSlice";
import type {IconWidgetT, TextIconT, UrlIconT} from "../../types";
import {useAppDispatch, useAppSelector} from "../../data/hooks";
import CheckBoxInput from "../input/CheckBoxInput";
import {isTextIconT, isUrlIconT} from "../../types";
import styled from "styled-components";
import {SketchPicker} from "react-color";
import editorSlice from "../../data/slice/editorSlice";
import ColorInput from "../input/ColorInput";

const ICON_RESTORE_CACHE: Partial<Record<string, {
    urlIcon?: UrlIconT;
    textIcon?: TextIconT;
}>> = {};

export const IconWidgetForm: FC<{
    widgetId: number;
}> = React.memo(({widgetId}) => {
    const widget = useIconWidget(widgetId);
    const dispatch = useAppDispatch();

    if (!widget) {
        return null;
    }

    return <Root>
        <TextInput label="Tytuł" value={widget.title} onChange={handleChangeFactory("title")}/>
        <TextInput label="URL" value={widget.url} onChange={handleChangeFactory("url")}/>
        <CheckBoxInput label="Ikona tekstowa" value={isTextIconT(widget.icon)} onChange={handleIconTypeChange}/>
        {isTextIconT(widget.icon) ? (<>
            <TextInput label="Test" value={widget.icon.text ?? ""}
                       onChange={handleIconChangeFactory("text")}/>
            <ColorInput label="Kolor" value={widget.icon.bgColor}
                        onChange={handleIconChangeFactory("bgColor")}/>
            <TextInput label="Wielkość czcionki" value={(widget.icon.fontSize ?? "").toString()}
                       onChange={handleIconChangeFactory("fontSize")}/>
        </>) : (
            <TextInput label="Ikona" value={widget.icon ?? ""} onChange={handleChangeFactory("icon")}/>
        )}
    </Root>;

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
            dispatch(editorSlice.actions.makeCurrentCollectionAsEdited());
        }
    }

    function handleIconChangeFactory(field: keyof TextIconT) {
        return (newValue: any) => {
            if (!widget) {
                return null;
            }

            if (!isTextIconT(widget.icon)) {
                return;
            }

            if (field === "bgColor") {
                newValue = newValue.hex;
            }

            const newWidget: IconWidgetT = {
                ...widget,
                icon: {
                    ...widget.icon,
                    [field]: newValue
                }
            };

            dispatch(iconCollectionSlice.actions.updateWidget({widgetId, widget: newWidget}));
            dispatch(editorSlice.actions.makeCurrentCollectionAsEdited());
        }
    }

    function handleIconTypeChange(isText: boolean) {
        if (!widget) {
            return null;
        }

        const current_cache = ICON_RESTORE_CACHE[widget.url] ?? (ICON_RESTORE_CACHE[widget.url] = {});

        if (isText) {

            dispatch(iconCollectionSlice.actions.updateWidget({
                widgetId,
                widget: {
                    ...widget,
                    icon: current_cache.textIcon ?? {
                        text: widget.title.substring(0, 3),
                        bgColor: "#FF0000",
                        fontSize: "30",
                    },
                }
            }));

        } else {

            dispatch(iconCollectionSlice.actions.updateWidget({
                widgetId,
                widget: {
                    ...widget,
                    icon: current_cache.urlIcon ?? "",
                }
            }));

        }

        dispatch(editorSlice.actions.makeCurrentCollectionAsEdited());

        if (isUrlIconT(widget.icon))
            current_cache.urlIcon = widget.icon;
        if (isTextIconT(widget.icon))
            current_cache.textIcon = widget.icon;
    }
});

const Root = styled.div`
    box-sizing: border-box;
    padding: ${props => props.theme.spacing(2)};
    > * + * {
        margin-top: ${props => props.theme.spacing(2)};
    }
`


export default IconWidgetForm;
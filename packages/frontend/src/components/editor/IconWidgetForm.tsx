import React, {FC, useState} from "react";
import TextInput from "../TextInput";
import {iconCollectionSlice, useIconWidget} from "../../data/slice/iconCollectionSlice";
import type {IconWidgetT, TextIconT, UrlIconT} from "../../types";
import {useAppDispatch} from "../../data/hooks";
import CheckBoxInput from "../CheckBoxInput";
import {isTextIconT, isUrlIconT} from "../../types";
import styled from "styled-components";
import {SketchPicker} from "react-color";

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

    const isTextIcon = typeof widget.icon === "object";

    return <Root>
        <TextInput label="Tytuł" value={widget.title} onChange={handleChangeFactory("title")}/>
        <TextInput label="URL" value={widget.url} onChange={handleChangeFactory("url")}/>
        <CheckBoxInput label="Ikona tekstowa" value={isTextIcon} onChange={handleIconTypeChange}/>
        {typeof widget.icon === "object" ? (<>
            <TextInput label="Test" value={widget.icon.text ?? ""}
                       onChange={handleIconChangeFactory("text")}/>
            <SketchPicker color={widget.icon.bgColor} onChangeComplete={handleIconChangeFactory("bgColor")}/>
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
        }
    }

    function handleIconChangeFactory(field: keyof TextIconT) {
        return (newValue: any) => {
            if (!widget) {
                return null;
            }

            if (typeof widget.icon !== "object") {
                return;
            }

            const newWidget: IconWidgetT = {
                ...widget,
                icon: {
                    ...widget.icon,
                    [field]: newValue
                }
            };
            dispatch(iconCollectionSlice.actions.updateWidget({widgetId, widget: newWidget}));
        }
    }

    function handleIconTypeChange(isText: boolean) {
        console.log("HERE", isText);
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
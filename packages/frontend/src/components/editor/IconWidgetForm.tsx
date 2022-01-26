import React, {FC, useState} from "react";
import TextInput from "../input/TextInput";
import {iconCollectionSlice, useIconWidget} from "../../data/slice/iconCollectionSlice";
import type {IconWidgetT, TextIconT, UrlIconT} from "../../types";
import {useAppDispatch, useAppSelector} from "../../data/hooks";
import CheckBoxInput from "../input/CheckBoxInput";
import {isTextIconT, isUrlIconT} from "../../types";
import styled from "styled-components";
import editorSlice from "../../data/slice/editorSlice";
import ColorInput from "../input/ColorInput";
import {FlexExpand, HFlexContainer, PaddedRoot} from "../UtilityElements";
import Button from "../input/Button";
import ArrowLeftIcon from "mdi-react/ArrowLeftIcon";
import ArrowRightIcon from "mdi-react/ArrowRightIcon";
import DeleteIcon from "mdi-react/DeleteIcon";
import NumberInput from "../input/NumberInput";

const ICON_RESTORE_CACHE: Partial<Record<string, {
    urlIcon?: UrlIconT;
    textIcon?: TextIconT;
}>> = {};

export const IconWidgetForm: FC<{
    widgetId: string;
}> = React.memo(({widgetId}) => {
    const widget = useIconWidget(widgetId);
    const dispatch = useAppDispatch();

    if (!widget) {
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

        <TextInput label="Tytuł" value={widget.title} onChange={handleChangeFactory("title")}/>
        <TextInput label="URL" value={widget.url} onChange={handleChangeFactory("url")}/>
        <CheckBoxInput label="Ikona tekstowa" value={isTextIconT(widget.icon)} onChange={handleIconTypeChange}/>
        {isTextIconT(widget.icon) ? (<>
            <TextInput label="Test" value={widget.icon.text ?? ""}
                       onChange={handleIconChangeFactory("text")}/>
            <ColorInput label="Kolor" value={widget.icon.bgColor}
                        onChange={handleIconChangeFactory("bgColor")}/>
            <NumberInput label="Wielkość czcionki" value={widget.icon.fontSize}
                       onChange={handleIconChangeFactory("fontSize")}/>
        </>) : (
            <TextInput label="Ikona" value={widget.icon ?? ""} onChange={handleChangeFactory("icon")}/>
        )}
    </PaddedRoot>;

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
            dispatch(editorSlice.actions.markCurrentCollectionAsEdited());
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

            switch (field) {
                case "bgColor":
                    newValue = newValue.hex;
                    break;
            }

            const newWidget: IconWidgetT = {
                ...widget,
                icon: {
                    ...widget.icon,
                    [field]: newValue
                }
            };

            dispatch(iconCollectionSlice.actions.updateWidget({widgetId, widget: newWidget}));
            dispatch(editorSlice.actions.markCurrentCollectionAsEdited());
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
                        fontSize: 30,
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

        dispatch(editorSlice.actions.markCurrentCollectionAsEdited());

        if (isUrlIconT(widget.icon))
            current_cache.urlIcon = widget.icon;
        if (isTextIconT(widget.icon))
            current_cache.textIcon = widget.icon;
    }

    function handleMoveToLeftClick(e: React.MouseEvent) {
        dispatch(iconCollectionSlice.actions.moveIconWidget({widgetId, offset: -1}));
    }

    function handleDeleteClick(e: React.MouseEvent) {

    }

    function handleMoveToRightClick(e: React.MouseEvent) {
        dispatch(iconCollectionSlice.actions.moveIconWidget({widgetId, offset: 1}));
    }
});


export default IconWidgetForm;
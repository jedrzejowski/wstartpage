import React, {FC, MouseEvent, MouseEventHandler, useEffect, useState} from "react";
import Icon from "../Icon";
import styled from "styled-components";
import {searchEngine, useSearchQuery} from "../../data/slice/searchSlice";
import {useSettings} from "../../data/slice/settingsSlice";
import {editorSlice, useIsEditor} from "../../data/slice/editorSlice";
import {useAppDispatch} from "../../data/hooks";
import {useIconWidget} from "../../data/slice/iconCollectionSlice";

export const IconWidget: FC<{
    widgetId: number;
}> = ({widgetId}) => {
    const searchQuery = useSearchQuery();
    const [visible, setVisible] = useState(true);
    const displayTitles = useSettings.displayTitles();
    const widget = useIconWidget(widgetId);
    const isEditor = useIsEditor();
    const dispatch = useAppDispatch();

    if (!widget) {
        return null;
    }

    useEffect(() => {

        if (searchQuery) {
            setVisible(widget.title ? searchEngine(searchQuery, widget.title) : false);
        } else {
            setVisible(true);
        }
    }, [searchQuery])

    const url = widget.url === "#" ? undefined : widget.url;

    return (
        <Root
            href={url}
            target="_parent"
            style={{
                display: visible ? undefined : "none",
            }}
            onClick={handleClick}
        >
            <IconRoot>
                <Icon icon={widget.icon ?? '!text=: (&bgColor=#0079d9&fontSize=32'}/>
            </IconRoot>

            <TitleRoot
                style={{
                    display: displayTitles ? undefined : "none",
                }}
            >
                {widget.title}
            </TitleRoot>

        </Root>
    );

    function handleClick(e: MouseEvent) {
        if (isEditor) {
            e.preventDefault();
            dispatch(editorSlice.actions.setSelectedObj({widgetId}))
        }
    }
};

const Root = styled.a`
    display: block;
    cursor: pointer;
    width: ${props => props.theme.iconSize}px;
    box-sizing: border-box;
    text-decoration: none;
    margin-top: ${props => props.theme.spacing(1.5)};
    margin-left: ${props => props.theme.spacing(1.5)};
    margin-right: ${props => props.theme.spacing(1.5)};
    margin-bottom: ${props => props.theme.spacing(0.5)};
`

const IconRoot = styled.div`
    margin-bottom: ${props => props.theme.spacing(1)};
`;

const TitleRoot = styled.div`
    display: block;
    width: 100%;
    color: black;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    opacity: 0.5;
    font-size: 0.8em;
`;

export default IconWidget;
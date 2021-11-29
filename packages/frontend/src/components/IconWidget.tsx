import React, {FC, useEffect, useState} from "react";
import Icon from "../lib/Icon";
import styled from "@emotion/styled";
import type {IconT} from "../types";
import {searchEngine, useSearchQuery} from "../data/slice/searchSlice";
import {useSettings} from "../data/slice/settingsSlice";

export const IconWidget: FC<{
    widget: IconT
}> = ({widget}) => {
    const searchQuery = useSearchQuery();
    const [visible, setVisible] = useState(true);
    const displayTitles = useSettings.displayTitles();

    useEffect(() => {

        if (searchQuery) {
            setVisible(searchEngine(searchQuery, widget.title));
        } else {
            setVisible(true);
        }
    }, [searchQuery])

    const url = widget.url === "#" ? undefined : widget.url;

    return (
        <Root href={url} style={{
            display: visible ? undefined : "none",
        }}>
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
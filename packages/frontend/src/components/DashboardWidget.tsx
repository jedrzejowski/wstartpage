import React, {FC, useEffect, useState} from "react";
import Icon from "../lib/Icon";
import styled from "@emotion/styled";
import type {DashboardWidgetT} from "../types";
import {searchEngine, useSearchQuery} from "../data/slice/searchSlice";
import {useDisplayTitles} from "../data/slice/settingsSlice";

export const DashboardWidget: FC<{
    widget: DashboardWidgetT
}> = ({widget}) => {
    const searchQuery = useSearchQuery();
    const [visible, setVisible] = useState(true);
    const displayTitles = useDisplayTitles();

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
            <Icon icon={widget.icon}/>

            <Title
                style={{
                    display: displayTitles ? undefined : "none",
                }}
            >
                {widget.title}
            </Title>

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

const Title = styled.div`
  display: block;
  width: 100%;
  padding-top: ${props => props.theme.spacing(1)};
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

export default DashboardWidget;
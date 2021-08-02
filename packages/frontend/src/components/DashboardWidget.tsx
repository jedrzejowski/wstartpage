import React, {FC} from "react";
import Icon from "../lib/Icon";
import styled from "@emotion/styled";
import type {DashboardWidgetT} from "../types";

export const DashboardWidget: FC<{
    widget: DashboardWidgetT
}> = ({widget}) => {

    const url = widget.url === "#" ? undefined : widget.url;

    return (
        <Root href={url}>
            <Icon icon={widget.icon}/>
            <Title>{widget.title}</Title>
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
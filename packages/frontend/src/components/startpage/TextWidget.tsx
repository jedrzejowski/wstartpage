import styled from "styled-components";
import React, {FC} from "react";
import {useIconWidget} from "../../data/slice/iconCollectionSlice";

export const TextWidget:FC<{
    widgetId: number;
}> = React.memo(({widgetId}) => {
    const widget = useIconWidget(widgetId);

    if (!widget) {
        throw new Error(`IconWidget of id '${widgetId}' does not exists`);
    }

    return <Root href={widget.url} target="_parent">
        {widget.title}
    </Root>
});

export default TextWidget

const Root = styled.a`
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 2em;
  color: var(--font-color);
  padding: ${props => props.theme.spacing(1)} ${props => props.theme.spacing(3)};
  text-decoration: none;

  &:hover {
    background: #bbbebf;
  }

  + a {
    margin-left: ${props => props.theme.spacing()};
  }
`;

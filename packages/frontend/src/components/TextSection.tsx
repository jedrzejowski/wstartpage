import React, {FC} from "react";
import type {IconSectionT} from "../types";
import styled from "styled-components";

export const TextSection: FC<{
    section?: IconSectionT;
}> = React.memo(props => {
    if (!props.section) return null;

    const widgets = props.section.widgets ?? [];

    return <Root>
        <div>
            {widgets.map((widget, i) => {
                if (typeof widget === "string") {
                    if (widget === "<br>") {
                        return <br key={i}/>
                    }

                } else {
                    return <TextWidget key={i} href={widget.url}>{widget.title}</TextWidget>
                }
            })}
        </div>
    </Root>
});

export default TextSection;

const Root = styled.div`
  margin: ${props => props.theme.spacing()};
`;

const TextWidget = styled.a`
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

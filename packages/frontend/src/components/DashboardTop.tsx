import React, {FC} from "react";
import {IconSectionT} from "../types";
import styled from "@emotion/styled";
import theme from "../theme";
import UserMenu from "./UserMenu";
import {FlexExpand, HFlexContainer} from "../lib/UtilityElements";

const DashboardTop: FC<{
    sections: IconSectionT[]
}> = React.memo(props => {
    return (
        <Root>
            <HFlexContainer>
                <div style={{margin: theme.spacing(2)}}>
                    <img src={`/img/logo/${location.hostname}.png`}/>
                </div>
                <FlexExpand/>
                <UserMenu/>
            </HFlexContainer>
            <TextSection section={(props.sections ?? [])[0]}/>
        </Root>
    )
});

const Root = styled.div`
  margin: ${props => theme.spacing()};
`;

const Widget = styled.a`
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 30px;
  color: var(--font-color);
  padding: ${props => theme.spacing(1)} ${props => theme.spacing(3)};
  text-decoration: none;

  &:hover {
    background: #bbbebf;
  }

  + a {
    margin-left: ${props => theme.spacing()};
  }
`;

function TextSection(props: {
    section?: IconSectionT,
    className?: string
}) {
    if (!props.section) return null;

    const widgets = props.section.widgets ?? [];

    return <div>
        <div>
            {widgets.map((widget, i) => {
                if (typeof widget === "string") {
                    if (widget === "<br>") {
                        return <br key={i}/>
                    }

                } else {
                    return <Widget key={i} href={widget.url}>{widget.title}</Widget>
                }
            })}
        </div>
    </div>
}


export default DashboardTop;
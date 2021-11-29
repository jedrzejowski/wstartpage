import React, {FC} from "react";
import {IconSectionT} from "../types";
import styled from "@emotion/styled";
import {FlexExpand, HFlexContainer} from "../lib/UtilityElements";
import {useSettings} from "../data/slice/settingsSlice";
import {useTheme} from "@emotion/react";

const IconTextSection: FC<{
    sections: IconSectionT[]
}> = React.memo(props => {
    const log_url = useSettings.logoUrl();
    const theme = useTheme();

    return (
        <Root>
            <HFlexContainer>

                {log_url ? (<div style={{margin: theme.spacing(2)}}>
                    <img src={log_url}/>
                </div>) : null}

                <FlexExpand/>

                {/*<UserMenu/>*/}

            </HFlexContainer>
            <TextSection section={(props.sections ?? [])[0]}/>
        </Root>
    )
});

const Root = styled.div`
  margin: ${props => props.theme.spacing()};
`;

const Widget = styled.a`
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


export default IconTextSection;
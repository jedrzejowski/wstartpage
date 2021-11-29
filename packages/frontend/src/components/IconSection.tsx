import React, {FC} from "react";
import IconWidget from "./IconWidget";
import type {IconSectionT} from "../types";
import styled from "@emotion/styled";
import {isNumber} from "../lib/util";
import {useTheme} from "@emotion/react";
import {useSettings} from "../data/slice/settingsSlice";
import {isMobile} from "react-device-detect";

const IconSection: FC<{
    section: IconSectionT;
}> = ({section}) => {
    const theme = useTheme();
    const displayTitles = useSettings.displayTitles();

    return (
        <SectionRoot>
            <Title style={{
                display: displayTitles ? undefined : "none"
            }}>
                {section.title}
            </Title>

            <WidgetsContainer style={{
                width: isNumber(section.width) ? section.width * (theme.spacingNum(3) + theme.iconSize) : undefined
            }}>
                {section.widgets.map((widget, i) => {
                    return <IconWidget key={i} widget={widget}/>
                })}
            </WidgetsContainer>

        </SectionRoot>
    );

};

const SectionRoot = styled.div`
  width: ${isMobile ? "inherit" : "max-content"};
  display: flex;
  flex-direction: column;
  background-color: white;

  margin: ${props => props.theme.spacing()};
  padding: ${props => props.theme.spacing()} ${props => props.theme.spacing(2)};
  border: 1px solid ${props => props.theme.color.border};
`;

const Title = styled.label`
  display: block;
  font-size: 0.8em;
  opacity: 0.5;
  text-transform: uppercase;
  margin: ${props => props.theme.spacing(-0.5)} 0 0 ${props => props.theme.spacing(-1.3)};
`;

const WidgetsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default IconSection;

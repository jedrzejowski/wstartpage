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

    const title = (
        <Title style={{
            display: displayTitles ? undefined : "none"
        }}>
            {section.title}
        </Title>
    );

    const widgets = section.widgets.map((widget, i) => {
        return <IconWidget key={i} widget={widget}/>
    });

    if (isMobile) {
        return <>
            {title}
            {widgets}
        </>
    } else {
        return (
            <SectionRoot>
                {title}

                <WidgetsContainer style={{
                    width: isNumber(section.width) ? section.width * (theme.spacingNum(3) + theme.iconSize) : undefined
                }}>
                    {widgets}
                </WidgetsContainer>
            </SectionRoot>
        );
    }
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

const Title = isMobile ? styled.div`  
    text-align: center;
    opacity: 0.5;
    text-transform: uppercase;
    margin: 0 ${props => props.theme.spacing(2)};
  
    writing-mode: tb-rl;
    transform: rotate(-170deg);
` : styled.div`
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

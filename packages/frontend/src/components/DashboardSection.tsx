import React, {FC} from "react";
import DashboardWidget from "./DashboardWidget";
import type {DashboardSectionT} from "../types";
import styled from "@emotion/styled";
import {isNumber} from "../lib/is";
import {useTheme} from "@emotion/react";

const DashboardSection: FC<{
    section: DashboardSectionT;
}> = ({section}) => {
    const theme = useTheme();

    return (
        <SectionRoot>
            <Title>{section.title}</Title>

            <WidgetsContainer style={{
                width: isNumber(section.width) ? section.width * (theme.spacingNum(3) + theme.iconSize) : undefined
            }}>
                {section.widgets.map((widget, i) => {
                    return <DashboardWidget key={i} widget={widget}/>
                })}
            </WidgetsContainer>

        </SectionRoot>
    );

};

const SectionRoot = styled.div`
  width: max-content;
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

export default DashboardSection;

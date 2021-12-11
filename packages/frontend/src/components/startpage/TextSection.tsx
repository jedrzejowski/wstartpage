import React, {FC} from "react";
import styled from "styled-components";
import {useIconSection} from "../../data/slice/iconCollectionSlice";
import TextWidget from "./TextWidget";

export const TextSection: FC<{
    sectionId: number;
}> = React.memo(({sectionId}) => {
    const section = useIconSection(sectionId);

    if (!section) {
        return null;
    }

    const widgetIds = section.widgets ?? [];

    return <Root>
        <div>
            {widgetIds.map(widgetId => {
                return <TextWidget key={widgetId} widgetId={widgetId}/>
            })}
        </div>
    </Root>
});

export default TextSection;

const Root = styled.div`
  margin: ${props => props.theme.spacing()};
`;


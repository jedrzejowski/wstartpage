import React, {FC} from "react";
import {IconContainerT} from "../../types";
import IconSection from "./IconSection";
import styled from "styled-components";
import TextSection from "./TextSection";

const IconContainer: FC<{
    textOnly?: boolean;
    sections: number[];
}> = React.memo(({sections, textOnly = false}) => {

    return <Root>

        {sections.map(sectionId => {
            if (textOnly) {
                return <TextSection key={sectionId} sectionId={sectionId}/>
            } else {
                return <IconSection key={sectionId} sectionId={sectionId}/>
            }
        })}

    </Root>;
});

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default IconContainer;
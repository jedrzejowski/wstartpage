import React, {FC} from "react";
import {IconContainerT} from "../types";
import IconSection from "./IconSection";
import styled from "@emotion/styled";
import TextSection from "./TextSection";

const IconContainer: FC<{
    textOnly?: boolean;
    sections: IconContainerT;
}> = React.memo(({sections, textOnly = false}) => {

    return <Root>

        {sections.map((section, i) => {
            if (textOnly) {
                return <TextSection key={i} section={section}/>
            } else {
                return <IconSection key={i} section={section}/>
            }
        })}

    </Root>;
});

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default IconContainer;
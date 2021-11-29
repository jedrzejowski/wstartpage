import React, {FC} from "react";
import {IconContainerT} from "../types";
import IconSection from "./IconSection";
import styled from "@emotion/styled";

const IconContainer: FC<{
    sections: IconContainerT;
}> = React.memo(({sections}) => {

    return <Root>

        {sections.map((section, i) => (
            <IconSection key={i} section={section}/>
        ))}

    </Root>;
});

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default IconContainer;
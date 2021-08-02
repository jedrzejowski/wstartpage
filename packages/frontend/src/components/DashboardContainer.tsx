import React, {FC} from "react";
import {DashboardContainerT} from "../types";
import DashboardSection from "./DashboardSection";
import styled from "@emotion/styled";

const DashboardContainer: FC<{
    sections: DashboardContainerT;
}> = React.memo(({sections}) => {

    return <Root>

        {sections.map((section, i) => (
            <DashboardSection key={i} section={section}/>
        ))}

    </Root>;
});

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default DashboardContainer;
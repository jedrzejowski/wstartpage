import React, {FC} from "react";
import CenterJS from "./CenterJS";
import styled from "styled-components";
import {useTheme} from "styled-components";
import {useSettings} from "../data/slice/settingsSlice";
import {TextIconT} from "../types";

const Background = styled.div`
    width: ${props => props.theme.iconSize}px;
    height: ${props => props.theme.iconSize}px;

    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
`;

const Icon: FC<{
    icon: string | TextIconT;
}> = React.memo(({icon}) => {
    const theme = useTheme();
    const zoom_ratio = useSettings.zoomRatio();

    if (typeof icon === "object") {

        return (
            <CenterJS
                height={theme.iconSize} width={theme.iconSize}
                text={icon.text}
                backgroundColor={icon.bgColor}
                fontSize={Number.parseFloat(icon.fontSize) * zoom_ratio}
                fontFamily="'Yanone Kaffeesatz', sans-serif"
            />
        );
    } else {
        return <Background style={{backgroundImage: `url(/img/${icon})`}}/>;
    }
});

export default Icon;

import React, {FC} from "react";
import CenterJS from "./CenterJS";
import styled from "styled-components";
import {useTheme} from "styled-components";
import {useSettings} from "../data/slice/settingsSlice";
import {textIconFromStr} from "../types";

const Background = styled.div`
  width: ${props => props.theme.iconSize}px;
  height: ${props => props.theme.iconSize}px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`;

const Icon: FC<{
    icon: string;
}> = React.memo(props => {
    const theme = useTheme();
    const zoom_ratio = useSettings.zoomRatio();

    if (props.icon[0] === '!') {
        const textIcon = textIconFromStr(props.icon);

        console.log(textIcon)

        return (
            <CenterJS
                height={theme.iconSize} width={theme.iconSize}
                text={textIcon.text}
                backgroundColor={textIcon.bgColor}
                fontSize={Number.parseFloat(textIcon.fontSize) * zoom_ratio}
                fontFamily="'Yanone Kaffeesatz', sans-serif"
            />
        );
    } else {
        return <Background style={{backgroundImage: `url(/img/${props.icon})`}}/>;
    }
});

export default Icon;

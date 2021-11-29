import React, {FC} from "react";
import CenterJS from "./CenterJS";
import styled from "@emotion/styled";
import {useTheme} from "@emotion/react";

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

    if (props.icon[0] === '!') {
        const data: any = {};
        for (let entry of props.icon.substr(1).split('&')) {
            const [name, value] = entry.split(/=(.+)/);
            data[name] = value;
        }

        return (
            <CenterJS
                height={theme.iconSize} width={theme.iconSize}
                text={data.text}
                backgroundColor={data.bgColor}
                fontSize={Number.parseFloat(data.fontSize) || 32}
                fontFamily="'Yanone Kaffeesatz', sans-serif"
            />
        );
    } else {
        return <Background style={{backgroundImage: `url(/img/${props.icon})`}}/>;
    }
});

export default Icon;
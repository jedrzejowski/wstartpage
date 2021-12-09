import React, {FC} from "react";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const Top = styled.div`
  flex-shrink: 0;
  box-sizing: border-box;
`;

const Bottom = styled.div`
  flex-shrink: 0;
  box-sizing: border-box;
`;

const Center = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  box-sizing: border-box;
`;

const Left = styled.div`
  min-height: 100%;
  flex-grow: 0;
  box-sizing: border-box;
`;

const Right = styled.div`
  min-height: 100%;
  flex-grow: 0;
  box-sizing: border-box;
`;

const Middle = styled.div`
  height: 100%;
  flex-grow: 1;
  box-sizing: border-box;
`;

export interface AppLayoutI {
    top?: any,
    left?: any,
    middle?: any,
    right?: any,
    bottom?: any,
    spread?: boolean
}

const AppLayout: FC<AppLayoutI> = React.memo(props => {

    return <Root>

        <Top>{props.top}</Top>

        <Center>
            <Left>{props.left}</Left>
            <Middle>{props.middle}</Middle>
            <Right>{props.right}</Right>
        </Center>

        <Bottom>{props.bottom}</Bottom>

    </Root>
});

export default AppLayout;

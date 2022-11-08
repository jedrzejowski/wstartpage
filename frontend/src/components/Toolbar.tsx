import React, {FC, ReactNode} from 'react';
import styled from 'styled-components';

interface Props {
  left?: ReactNode;
  middle?: ReactNode;
  right?: ReactNode;
}

const Toolbar: FC<Props> = props => {

  return <Root>

    {props.left && <Left>{props.left}</Left>}

    <Middle>{props.middle}</Middle>

    {props.right && <Right>{props.right}</Right>}

  </Root>;
};

export default Toolbar;


const Root = styled.div`
  display: flex;
  align-items: center;
`;

const Left = styled.div`
`;

const Middle = styled.div`
  flex-grow: 1;
`;

const Right = styled.div`
`;

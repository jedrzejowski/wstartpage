import React, {FC, ReactNode} from 'react';
import styled from 'styled-components';

function Toolbar(props: {
  children: ReactNode;
}) {

  return <Root>

    {props.children}

  </Root>;
}

const Root = styled.div`
  display: flex;
  align-items: center;
`;

Toolbar.Expand = styled.div`
  flex-grow: 1;
`;

Toolbar.Left = styled.div`
  display: flex;
  flex-grow: 1;
`;

Toolbar.Middle = styled.div`
  display: flex;
  flex-grow: 1;
`;

Toolbar.Right = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: right;
`;


export default Toolbar;

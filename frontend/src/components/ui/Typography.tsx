import {FC, ReactNode} from 'react';
import styled, {useTheme} from 'styled-components';

const Typography: FC<{
  children: ReactNode;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}> = props => {

  switch (props.variant) {
    case 'h1':
      return <h1>{props.children}</h1>;
    case 'h6':
      return <H6>{props.children}</H6>;
    default :
      return null;
  }
};


export default Typography;

const H6 = styled.h6`
  font-size: 0.8em;
  margin: ${props => props.theme.spacing(1, 0)};
`;

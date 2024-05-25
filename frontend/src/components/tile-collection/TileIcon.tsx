import React, {FC} from 'react';
import CenterJS from '../CenterJS';
import styled from 'styled-components';
import {useTheme} from 'styled-components';
import {AnyIconT, isTextIconT, isUrlIconT} from '../../data/tileCollection';
import imgUrl from '../../data/fetch';
import {useAppSelector} from '../../data/hooks';
import {selectPageSettingsZoomRatio} from '../../data/slice/pageSettings';


const TileIcon: FC<{
  icon: AnyIconT | null;
}> = ({icon}) => {
  const theme = useTheme();
  const zoomRatio = useAppSelector(selectPageSettingsZoomRatio);
  const fontFamily = 'Yanone Kaffeesatz';


  if (isTextIconT(icon)) {
    return (
      <CenterJS
        height={theme.iconSize} width={theme.iconSize}
        text={icon.text}
        backgroundColor={icon.bgColor}
        fontSize={icon.fontSize * zoomRatio}
        fontFamily={fontFamily}
      />
    );
  }

  if (isUrlIconT(icon)) {
    return <Background style={{backgroundImage: 'url(' + imgUrl(icon.url) + ')'}}/>;
  }

  return null;//'!text=: (&bgColor=#0079d9&fontSize=32'
};

export default React.memo(TileIcon);

const Background = styled.div`
  width: ${props => props.theme.iconSize}px;
  height: ${props => props.theme.iconSize}px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`;

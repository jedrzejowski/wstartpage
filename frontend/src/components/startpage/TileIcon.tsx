import React, {FC} from 'react';
import CenterJS from '../CenterJS';
import styled from 'styled-components';
import {useTheme} from 'styled-components';
import type {TextIconT} from '../../data/tileCollection';
import imgUrl from '../../data/fetch';
import {useAppSelector} from '../../data/hooks';
import {selectPageSettingsZoomRatio} from '../../data/slice/pageSettings';


const TileIcon: FC<{
  icon: string | TextIconT;
}> = ({icon}) => {
  const theme = useTheme();
  const zoomRatio = useAppSelector(selectPageSettingsZoomRatio);
  const fontFamily = 'Yanone Kaffeesatz';


  if (typeof icon === 'object') {

    return (
      <CenterJS
        height={theme.iconSize} width={theme.iconSize}
        text={icon.text}
        backgroundColor={icon.bgColor}
        fontSize={icon.fontSize * zoomRatio}
        fontFamily={fontFamily}
      />
    );
  } else {
    return <Background style={{backgroundImage: 'url(' + imgUrl(icon) + ')'}}/>;
  }
};

export default React.memo(TileIcon);

const Background = styled.div`
  width: ${props => props.theme.iconSize}px;
  height: ${props => props.theme.iconSize}px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`;

import React, {FC} from 'react';
import CenterJS from './CenterJS';
import styled from 'styled-components';
import {useTheme} from 'styled-components';
import {useSettings} from '../data/slice/settingsSlice';
import {TextIconT} from '../types';
import imgUrl from '../data/fetch';
import useFontFaceObserver from '../lib/useFontFaceObserver';

const Background = styled.div`
  width: ${props => props.theme.iconSize}px;
  height: ${props => props.theme.iconSize}px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`;

const MyIcon: FC<{
  icon: string | TextIconT;
}> = React.memo(({icon}) => {
  const theme = useTheme();
  const zoom_ratio = useSettings.zoomRatio();
  const fontFamily = 'Yanone Kaffeesatz';


  if (typeof icon === 'object') {

    return (
      <CenterJS
        height={theme.iconSize} width={theme.iconSize}
        text={icon.text}
        backgroundColor={icon.bgColor}
        fontSize={icon.fontSize * zoom_ratio}
        fontFamily={fontFamily}
      />
    );
  } else {
    return <Background style={{backgroundImage: 'url(' + imgUrl(icon) + ')'}}/>;
  }
});

export default MyIcon;

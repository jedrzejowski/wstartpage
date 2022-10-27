import React, {FC} from 'react';
import {FlexExpand, HFlexContainer} from '../UtilityElements';
import {useTheme} from 'styled-components';
import imgUrl from '../../data/fetch';
import {useAppSelector} from '../../data/hooks';

const StartPageHeader: FC = props => {
  const logoUrl = useAppSelector(state => state.pageSettings.logoUrl);
  const theme = useTheme();

  return <HFlexContainer>

    {logoUrl ? (<div style={{margin: theme.spacing(2)}}>
      <img src={imgUrl(logoUrl)} alt="logo"/>
    </div>) : null}

    <FlexExpand/>

  </HFlexContainer>;
};

export default StartPageHeader;

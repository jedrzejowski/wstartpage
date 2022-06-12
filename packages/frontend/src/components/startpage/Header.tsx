import React, {FC} from 'react';
import {FlexExpand, HFlexContainer} from '../UtilityElements';
import {useSettings} from '../../data/slice/settingsSlice';
import {useTheme} from 'styled-components';
import imgUrl, {backendFetch} from '../../data/fetch';

export const Header: FC = props => {
  const log_url = useSettings.logoUrl();
  const theme = useTheme();

  return <HFlexContainer>

    {log_url ? (<div style={{margin: theme.spacing(2)}}>
      <img src={imgUrl(log_url)}/>
    </div>) : null}

    <FlexExpand/>

    {/*<UserMenu/>*/}

  </HFlexContainer>;
};

export default Header;

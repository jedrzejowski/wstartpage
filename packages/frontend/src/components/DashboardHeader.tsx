import React, {FC} from "react";
import {FlexExpand, HFlexContainer} from "../lib/UtilityElements";
import {useSettings} from "../data/slice/settingsSlice";
import {useTheme} from "@emotion/react";

export const DashboardHeader: FC = props => {
    const log_url = useSettings.logoUrl();
    const theme = useTheme();

    return <HFlexContainer>

        {log_url ? (<div style={{margin: theme.spacing(2)}}>
            <img src={log_url} />
        </div>) : null}

        <FlexExpand/>

        {/*<UserMenu/>*/}

    </HFlexContainer>
};

export default DashboardHeader
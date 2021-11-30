import React from "react";
import AppLayout from "../lib/AppLayout";
import IconContainer from "./IconContainer";
import {useIconSets} from "../data/iconSets";
import {mergeIconSets} from "../types";
import SearchView from "./SearchView";
import {useSettings} from "../data/slice/settingsSlice";
import DashboardHeader from "./DashboardHeader";

function Dashboard() {
    const dashboard = mergeIconSets(useIconSets(useSettings.iconSetNames(), {recursive: true}));

    if (!dashboard) return null;

    return (<div>

        <AppLayout
            top={<>
                <DashboardHeader/>
                <IconContainer textOnly sections={dashboard.top}/>
            </>}
            left={<IconContainer sections={dashboard.left}/>}
            middle={<IconContainer sections={dashboard.middle}/>}
            right={<IconContainer sections={dashboard.right}/>}
            bottom={<IconContainer textOnly sections={dashboard.bottom}/>}
        />

        <SearchView/>
    </div>);
}

export default Dashboard;
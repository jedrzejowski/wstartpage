import React from "react";
import AppLayout from "../lib/AppLayout";
import DashboardTop from "./DashboardTop";
import DashboardContainer from "./DashboardContainer";
import {useNamedIconSets} from "../data/useNamedIconSet";
import {mergeDashboards} from "../types";
import SearchView from "./SearchView";
import {useIconSetNames} from "../data/slice/settingsSlice";

function Dashboard() {
    const dashboard = mergeDashboards(useNamedIconSets(useIconSetNames()));

    if (!dashboard) return null;

    return (<div>

        <AppLayout
            top={<DashboardTop sections={dashboard.top}/>}
            left={<DashboardContainer sections={dashboard.left}/>}
            middle={<DashboardContainer sections={dashboard.middle}/>}
            right={<DashboardContainer sections={dashboard.right}/>}
            bottom={<DashboardContainer sections={dashboard.bottom}/>}
        />

        <SearchView/>
    </div>);
}

export default Dashboard;
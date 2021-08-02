import React from "react";
import AppLayout from "../lib/AppLayout";
import DashboardTop from "./DashboardTop";
import DashboardContainer from "./DashboardContainer";
import {useNamedDashboards} from "../data/useNamedDashboard";
import {useCurrentDashboardNames} from "../data/currentDashboards";
import {mergeDashboards} from "../types";

function Dashboard() {
    const dashboard = mergeDashboards(useNamedDashboards(useCurrentDashboardNames()));

    if (!dashboard) return null;

    return (<div>
        <AppLayout
            top={<DashboardTop sections={dashboard.top}/>}
            left={<DashboardContainer sections={dashboard.left}/>}
            middle={<DashboardContainer sections={dashboard.middle}/>}
            right={<DashboardContainer sections={dashboard.right}/>}
            bottom={<DashboardContainer sections={dashboard.bottom}/>}
        />
    </div>);
}

export default Dashboard;
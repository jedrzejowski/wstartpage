import React, {FC, useContext, useState} from "react";
import {List} from "immutable";

const SEPARATOR = ";";
const default_names = List<string>((localStorage.getItem("dashboardNames") ?? "").split(SEPARATOR));

export const Context = React.createContext({
    setNames: (names: List<string> | string) => {
    },
    names: default_names,
});

export function useCurrentDashboardNames() {
    return useContext(Context).names;
}


export function useSetCurrentDashboardNames() {
    return useContext(Context).setNames;
}

export const CurrentDashboardsNamesContext: FC = React.memo(props => {
    const [names, _setNames] = useState(default_names);

    function setNames(names: List<string> | string) {

        if (typeof names === "string") {
            names = List(names.split(SEPARATOR))
        }

        localStorage.setItem("dashboardNames", names.join(SEPARATOR));

        _setNames(names);
    }

    return (
        <Context.Provider value={{names, setNames}}>
            {props.children}
        </Context.Provider>
    )
});
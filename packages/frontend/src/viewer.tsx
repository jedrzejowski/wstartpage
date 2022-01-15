import React, {FC, useEffect, useMemo, useState} from "react";
import StartPage from "./components/startpage/StartPage";
import StartPageShortcuts from "./components/startpage/StartPageShortcuts";
import {SettingsSaver, settingsSlice, useSettings} from "./data/slice/settingsSlice";
import app_render from "./app_render";
import {IconCollectionT, mergeIconCollections, NormalizedIconCollectionT} from "./types";
import {fromLocalStorage} from "./lib/localStorage";
import {useAppDispatch, useAppSelector} from "./data/hooks";
import iconCollectionSlice from "./data/slice/iconCollectionSlice";

const CACHE_NAME = "icon_sets";

const CachedStartPage: FC = () => {
    const dispatch = useAppDispatch();

    const requestedIconCollectionNames = useSettings.iconSetNames();
    const fetchedIconCollections = useAppSelector(state => state.iconCollection.collections);
    // const fetchedIconCollections = useAppSelector(state => Object.entries(state.iconCollection.collections).map(entry => entry[1]));

    // const [iconCollections, setIconCollections] = useState<IconCollectionT[]>([]);
    // const mergedIconCollection = useMemo(() => mergeIconCollections(iconCollections), [iconCollections]);

    useEffect(() => {
        const settings = fetchedIconCollections[requestedIconCollectionNames[0]]?.settings;

        if (!settings) {
            return
        }

        dispatch(settingsSlice.actions.setIfNotDefault(settings));

    }, [fetchedIconCollections[requestedIconCollectionNames[0]]])

    useEffect(() => {
        for (const collectionName of requestedIconCollectionNames) {
            dispatch(iconCollectionSlice.actions.requestCollectionLoad({collectionName}));
        }
        for (const fetchedCollectionName in fetchedIconCollections) {
            for (const collectionName of fetchedIconCollections[fetchedCollectionName]?.includes ?? []) {
                dispatch(iconCollectionSlice.actions.requestCollectionLoad({collectionName}));
            }
        }
    }, [requestedIconCollectionNames, fetchedIconCollections]);

    // useEffect(() => {
    //     setIconCollections(fromLocalStorage<IconCollectionT[]>(CACHE_NAME, []));
    // }, [fetchedIconCollectionNames.sort().join()]);

    const iconCollectionNames = useMemo(() => {
        const iconCollectionNames = new Set<string>();

        function add(iconCollectionName: string) {
            const iconCollection = fetchedIconCollections[iconCollectionName];
            if (iconCollection) {
                iconCollectionNames.add(iconCollectionName);

                if (Array.isArray(iconCollection.includes)) {
                    iconCollection.includes.forEach(add);
                }
            }
        }

        requestedIconCollectionNames.forEach(add)

        return Array.from(iconCollectionNames)
    }, [requestedIconCollectionNames, fetchedIconCollections]);

    return <StartPage iconCollectionName={iconCollectionNames}/>
}

app_render(<>
    <StartPageShortcuts/>
    <SettingsSaver/>
    <CachedStartPage/>
</>);


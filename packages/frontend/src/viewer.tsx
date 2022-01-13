import React, {FC, useEffect, useMemo, useState} from "react";
import StartPage from "./components/startpage/StartPage";
import StartPageShortcuts from "./components/startpage/StartPageShortcuts";
import {SettingsSaver, useSettings} from "./data/slice/settingsSlice";
import app_render from "./app_render";
import {IconCollectionT, mergeIconCollections} from "./types";
import {fromLocalStorage} from "./lib/localStorage";
import {fetchIconCollection} from "./data/iconCollection";
import {useAppDispatch, useAppSelector} from "./data/hooks";
import iconCollectionSlice from "./data/slice/iconCollectionSlice";

const CACHE_NAME = "icon_sets";

const CachedStartPage: FC = () => {
    const dispatch = useAppDispatch();
    const iconCollectionNames = useSettings.iconSetNames();

    const fetchedIconCollectionNames = useAppSelector(state => Object.keys(state.iconCollection.collections));
    const fetchedIconCollections = useAppSelector(state => Object.entries(state.iconCollection.collections).map(entry => entry[1]));

    const [iconCollections, setIconCollections] = useState<IconCollectionT[]>([]);
    const mergedIconCollection = useMemo(() => mergeIconCollections(iconCollections), [iconCollections]);

    useEffect(() => {
        iconCollectionNames.forEach(iconCollectionName => {
            dispatch(iconCollectionSlice.actions.requestCollectionLoad(iconCollectionName));
        });
    }, [iconCollectionNames.sort().join()]);

    useEffect(() => {
        setIconCollections(fromLocalStorage<IconCollectionT[]>(CACHE_NAME, []));
    }, [fetchedIconCollectionNames.sort().join()]);

    return <StartPage iconCollectionName={fetchedIconCollectionNames}/>
}

app_render(<>
    <StartPageShortcuts/>
    <SettingsSaver/>
    <CachedStartPage/>
</>);


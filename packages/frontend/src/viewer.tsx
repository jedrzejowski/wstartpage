import React, {FC, useEffect, useMemo, useState} from "react";
import StartPage from "./components/startpage/StartPage";
import StartPageShortcuts from "./components/startpage/StartPageShortcuts";
import {SettingsSaver, useSettings} from "./data/slice/settingsSlice";
import app_render from "./app_render";
import {IconCollectionT, mergeIconCollections} from "./types";
import {fromLocalStorage, toLocalStorage} from "./lib/localStorage";
import {fetchIconCollection} from "./data/iconCollection";

const CACHE_NAME = "icon_sets";

const CachedStartPage: FC = () => {
    const iconCollectionNames = useSettings.iconSetNames();
    const [iconCollections, setIconCollections] = useState<IconCollectionT[]>([]);
    const mergedIconCollection = useMemo(() => mergeIconCollections(iconCollections), [iconCollections]);

    useEffect(() => {
        setIconCollections(fromLocalStorage<IconCollectionT[]>(CACHE_NAME, []));

        let canceled = false;

        const icon_sets: IconCollectionT[] = [];
        const loaded = new Set<string>();
        const loading = new Set<string>();

        function load(id: string) {
            if (loaded.has(id)) {
                return;
            }

            loading.add(id);

            fetchIconCollection(id).then(icon_set => {
                icon_sets.push(icon_set);

                icon_set.includes?.forEach(load);
            }).finally(() => {
                loaded.add(id);
                loading.delete(id);

                if (loading.size === 0) {
                    toLocalStorage(CACHE_NAME, icon_sets);
                    setIconCollections(icon_sets);
                }
            });
        }

        iconCollectionNames.forEach(load);

        return () => {
            canceled = true;
        };
    }, [iconCollectionNames.join(";")]);

    return <StartPage iconCollection={mergedIconCollection}/>
}

app_render(<>
    <StartPageShortcuts/>
    <SettingsSaver/>
    <CachedStartPage/>
</>);


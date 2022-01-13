import React, {FC, useEffect} from "react";
import AppLayout from "../AppLayout";
import IconContainer from "./IconContainer";
import type {IconCollectionT} from "../../types";
import SearchView from "./SearchView";
import {useSettings} from "../../data/slice/settingsSlice";
import Header from "./Header";
import {useIconCollection} from "../../data/slice/iconCollectionSlice";

export const StartPage: FC<({
    iconCollectionName: string | string[];
})> = React.memo(({iconCollectionName}) => {
    const backgroundUrl = useSettings.backgroundUrl();
    const iconCollection = useIconCollection(iconCollectionName);

    useEffect(() => {
        document.body.style.backgroundImage = backgroundUrl ? `url(${backgroundUrl})` : '';
    }, [backgroundUrl]);

    if (!iconCollection) {
        return null;
    }

    return (<div>

        <AppLayout
            top={<>
                <Header/>
                {iconCollection.top ?
                    <IconContainer containerName="top" textOnly sections={iconCollection.top}/> : null}
            </>}
            left={iconCollection.left ? <IconContainer containerName="left" sections={iconCollection.left}/> : null}
            middle={iconCollection.middle ?
                <IconContainer containerName="middle" sections={iconCollection.middle}/> : null}
            right={iconCollection.right ? <IconContainer containerName="right" sections={iconCollection.right}/> : null}
            bottom={iconCollection.bottom ?
                <IconContainer containerName="bottom" textOnly sections={iconCollection.bottom}/> : null}
        />

        <SearchView/>
    </div>);
});

export default StartPage;

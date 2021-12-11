import React, {FC, useEffect} from "react";
import AppLayout from "../AppLayout";
import IconContainer from "./IconContainer";
import type {IconCollectionT} from "../../types";
import SearchView from "./SearchView";
import {useSettings} from "../../data/slice/settingsSlice";
import Header from "./Header";
import {useIconCollection} from "../../data/slice/iconCollectionSlice";

const StartPage: FC<({
    iconCollectionName: string;
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
                {iconCollection.top ? <IconContainer textOnly sections={iconCollection.top}/> : null}
            </>}
            left={iconCollection.left ? <IconContainer sections={iconCollection.left}/> : null}
            middle={iconCollection.middle ? <IconContainer sections={iconCollection.middle}/> : null}
            right={iconCollection.right ? <IconContainer sections={iconCollection.right}/> : null}
            bottom={iconCollection.bottom ? <IconContainer textOnly sections={iconCollection.bottom}/> : null}
        />

        <SearchView/>
    </div>);
});

export default StartPage;

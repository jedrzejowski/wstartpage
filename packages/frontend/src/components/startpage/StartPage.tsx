import React, {FC, useEffect} from "react";
import AppLayout from "../AppLayout";
import IconContainer from "./IconContainer";
import type {IconCollection} from "../../types";
import SearchView from "./SearchView";
import {useSettings} from "../../data/slice/settingsSlice";
import Header from "./Header";

const StartPage: FC<{
    iconCollection: IconCollection;
}> = React.memo(({iconCollection}) => {
    const backgroundUrl = useSettings.backgroundUrl();
    console.log('iconCollection', iconCollection)

    useEffect(() => {
        document.body.style.backgroundImage = backgroundUrl ? `url(${backgroundUrl})` : undefined;
    }, [backgroundUrl]);

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

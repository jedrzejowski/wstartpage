import React, {FC, useEffect} from "react";
import AppLayout from "../AppLayout";
import IconContainer from "./IconContainer";
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

    const firstIconCollectionName = Array.isArray(iconCollectionName) ? iconCollectionName[0] : iconCollectionName;

    return (<div>

        <AppLayout
            top={<>
                <Header/>
                {iconCollection.top ? (
                    <IconContainer
                        iconCollectionName={firstIconCollectionName}
                        containerName="top"
                        textOnly
                        sections={iconCollection.top}
                    />
                ) : null}
            </>}
            left={iconCollection.left ? (
                <IconContainer
                    iconCollectionName={firstIconCollectionName}
                    containerName="left"
                    sections={iconCollection.left}
                />
            ) : null}
            middle={iconCollection.middle ? (
                <IconContainer
                    iconCollectionName={firstIconCollectionName}
                    containerName="middle"
                    sections={iconCollection.middle}
                />
            ) : null}
            right={iconCollection.right ? (
                <IconContainer
                    iconCollectionName={firstIconCollectionName}
                    containerName="right"
                    sections={iconCollection.right}
                />
            ) : null}
            bottom={iconCollection.bottom ? (
                <IconContainer
                    iconCollectionName={firstIconCollectionName}
                    containerName="bottom"
                    textOnly sections={iconCollection.bottom}
                />
            ) : null}
        />

        <SearchView/>
    </div>);
});

export default StartPage;

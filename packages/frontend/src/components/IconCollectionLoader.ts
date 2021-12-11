import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../data/hooks";
import {fetchIconCollection, useIconCollection} from "../data/iconCollection";
import iconCollectionSlice from "../data/slice/iconCollectionSlice";

export const IconCollectionLoader: FC = React.memo(props => {
    const [fetching, setFetching] = useState<string[]>([]);
    const requests = useAppSelector(state => state.iconCollection.requests);
    const collections = useAppSelector(state => state.iconCollection.collections);
    const dispatch = useAppDispatch();

    useEffect(() => {

        const fetchStarted = requests.filter(request => {
            if (request in collections) {
                return false;
            }
            if (fetching.includes(request)) {
                return false;
            }
            return true;
        }).map(request => {

            fetchIconCollection(request).then(collection => {
                dispatch(iconCollectionSlice.actions.addCollection({
                    name: request,
                    collection
                }));
            });

            return request
        });

        setFetching([...fetching, ...fetchStarted]);

    }, [requests]);

    return null;
});

export default IconCollectionLoader;

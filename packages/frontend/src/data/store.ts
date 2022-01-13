import {configureStore, Middleware} from "@reduxjs/toolkit";
import searchSlice from "./slice/searchSlice";
import settingsSlice from "./slice/settingsSlice";
import editorSlice from "./slice/editorSlice";
import iconCollectionSlice from "./slice/iconCollectionSlice";
import {createLogger} from "redux-logger";
import {isProduction} from "../types";


const middleware: Middleware[] = []

if (isProduction) {
    const logger = createLogger({});
    middleware.push(logger);
}

export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        settings: settingsSlice.reducer,
        editor: editorSlice.reducer,
        iconCollection: iconCollectionSlice.reducer,
    },
    middleware,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


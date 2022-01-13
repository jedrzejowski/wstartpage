import {configureStore} from "@reduxjs/toolkit";
import searchSlice from "./slice/searchSlice";
import settingsSlice from "./slice/settingsSlice";
import editorSlice from "./slice/editorSlice";
import iconCollectionSlice from "./slice/iconCollectionSlice";
import {createLogger} from "redux-logger";

const logger = createLogger({});


export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        settings: settingsSlice.reducer,
        editor: editorSlice.reducer,
        iconCollection: iconCollectionSlice.reducer,
    },
    middleware: [
        logger,
    ]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


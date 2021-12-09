import {configureStore} from "@reduxjs/toolkit";
import searchSlice from "./slice/searchSlice";
import settingsSlice from "./slice/settingsSlice";
import editorSlice from "./slice/editorSlice";

export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        settings: settingsSlice.reducer,
        editor: editorSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

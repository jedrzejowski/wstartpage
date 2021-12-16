import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "../hooks";
import type {
    IconCollectionT,
    IconContainerT,
    IconWidgetT,
    NormalizedIconCollectionT,
    NormalizedIconSectionT
} from "../../types";

interface IconCollectionData {
    widget: Partial<Record<number, IconWidgetT>>;
    sections: Partial<Record<number, NormalizedIconSectionT>>;
    collections: Partial<Record<string, NormalizedIconCollectionT>>;
    requests: string[]
}

let i = 0;

const initialState: IconCollectionData = {
    widget: {},
    sections: {},
    collections: {},
    requests: [],
};

export const iconCollectionSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        requestCollectionLoad(state, action: PayloadAction<string>) {
            if (action.payload in state.collections) {
                return;
            }

            state.requests.push(action.payload);
        },
        addCollection(state, action: PayloadAction<{ name: string, collection: IconCollectionT }>) {

            function normalizeContainer(iconContainer: IconContainerT | null | undefined): number[] {
                iconContainer = iconContainer ?? [];
                return iconContainer.map(iconSection => {
                    const id = ++i;

                    state.sections[id] = {
                        ...iconSection,
                        widgets: normalizeWidgets(iconSection.widgets)
                    };

                    return id;
                })
            }

            function normalizeWidgets(iconWidgets: IconWidgetT[]): number[] {
                return iconWidgets.map(iconWidget => {
                    const id = ++i;

                    state.widget[id] = iconWidget;

                    return id;
                });
            }

            state.collections[action.payload.name] = {
                ...action.payload.collection,
                top: normalizeContainer(action.payload.collection.top),
                right: normalizeContainer(action.payload.collection.right),
                bottom: normalizeContainer(action.payload.collection.bottom),
                left: normalizeContainer(action.payload.collection.left),
                middle: normalizeContainer(action.payload.collection.middle),
            };

            const rI = state.requests.indexOf(action.payload.name);
            if (rI !== -1) {
                state.requests.splice(rI, 1);
            }
        },
        updateWidget(state, action: PayloadAction<{ widgetId: number, widget: IconWidgetT }>) {
            const {widgetId, widget} = action.payload;
            state.widget[widgetId] = widget;
        },
    }
});

export const useIconCollection = (name: string) => useAppSelector(state => state.iconCollection.collections[name] ?? null);
export const useIconSection = (id: number) => useAppSelector(state => state.iconCollection.sections[id] ?? null);
export const useIconWidget = (id: number) => useAppSelector(state => state.iconCollection.widget[id] ?? null);


export default iconCollectionSlice;


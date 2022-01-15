import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "../hooks";
import type {
    IconCollectionT,
    IconContainerT,
    IconWidgetT,
    NormalizedIconCollectionT,
    NormalizedIconSectionT
} from "../../types";
import genId from "../genId";
import actions from "../actions";

interface IconCollectionData {
    widgets: Partial<Record<number, IconWidgetT>>;
    sections: Partial<Record<number, NormalizedIconSectionT>>;
    collections: Partial<Record<string, NormalizedIconCollectionT>>;
    requests: string[]
}

let i = 0;

const initialState: IconCollectionData = {
    widgets: {},
    sections: {},
    collections: {},
    requests: [],
};

export const iconCollectionSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        requestCollectionLoad(state, action: PayloadAction<{ collectionName: string, hard?: boolean }>) {
            const {collectionName, hard = false} = action.payload;
            if (collectionName in state.collections && !hard) {
                return;
            }

            state.requests.push(collectionName);
        },
        addCollection(state, action: PayloadAction<{ name: string, collection: IconCollectionT }>) {

            function normalizeContainer(iconContainer: IconContainerT | null | undefined): number[] {
                iconContainer = iconContainer ?? [];
                return iconContainer.map(iconSection => {
                    const id = genId();

                    state.sections[id] = {
                        ...iconSection,
                        widgets: normalizeWidgets(iconSection.widgets)
                    };

                    return id;
                })
            }

            function normalizeWidgets(iconWidgets: IconWidgetT[]): number[] {
                return iconWidgets.map(iconWidget => {
                    const id = genId();

                    state.widgets[id] = iconWidget;

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
            state.widgets[widgetId] = widget;
        },
    },
    extraReducers: (builder) => builder
        .addCase(actions.addWidgetIcon, (state, action) => {
            const {sectionId, widgetId} = action.payload
            state.widgets[widgetId] = {
                title: "Example",
                url: "https://example.com",
                icon: {
                    text: "Example",
                    bgColor: "#FF000",
                    fontSize: "30"
                }
            }
            state.sections[sectionId]?.widgets.push(widgetId);
        })
});

export const useIconCollection = (name: string | string[]) => {
    if (Array.isArray(name)) {
        const collections = useAppSelector(state => Object.entries(state.iconCollection.collections)
            .filter(entry => name.includes(entry[0])).map(entry => entry[1]));

        if (collections.length != name.length) {
            return null;
        }

        return {
            top: collections.map(col => col?.top ?? []).flat(),
            bottom: collections.map(col => col?.bottom ?? []).flat(),
            middle: collections.map(col => col?.middle ?? []).flat(),
            right: collections.map(col => col?.right ?? []).flat(),
            left: collections.map(col => col?.left ?? []).flat(),
        }
    } else {
        return useAppSelector(state => state.iconCollection.collections[name] ?? null);
    }
}
export const useIconSection = (id: number) => useAppSelector(state => state.iconCollection.sections[id] ?? null);
export const useIconWidget = (id: number) => useAppSelector(state => state.iconCollection.widgets[id] ?? null);

export default iconCollectionSlice;


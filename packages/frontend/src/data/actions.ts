import {createAction} from "@reduxjs/toolkit";
import type {IconContainersT} from "../types";

export const actions = {
    addWidgetIcon: createAction<{ sectionId: string, widgetId: string }>("addWidgetIcon"),
    addIconSection: createAction<{
        iconCollectionName: string,
        containerName: IconContainersT,
        sectionId: string,
    }>("addIconSection"),
}

export default actions;

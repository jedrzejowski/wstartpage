import {createAction} from "@reduxjs/toolkit";
import type {IconContainersT} from "../types";

export const actions = {
    addWidgetIcon: createAction<{ sectionId: number, widgetId: number }>("addWidgetIcon"),
    addIconSection: createAction<{
        iconCollectionName: string,
        containerName: IconContainersT,
        sectionId: number,
    }>("addIconSection"),
}

export default actions;

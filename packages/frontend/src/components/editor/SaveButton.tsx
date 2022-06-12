import React, {FC, useState} from "react";
import Button from "../input/Button";
import ContentSaveIcon from "mdi-react/ContentSaveIcon";
import {useAppSelector} from "../../data/hooks";
import {
    IconCollectionT,
    IconSectionT,
    IconWidgetT,
    NormalizedIconCollectionT,
    NormalizedIconSectionT
} from "../../types";

type MyState = "idle" | "fetching";

export const SaveButton: FC = React.memo(props => {
    const [myState, setMyState] = useState<MyState>("idle");
    const selectedIconCollectionName = useAppSelector(state => state.editor.selectedIconCollectionName);
    const iconCollectionSlice = useAppSelector(state => state.iconCollection)

    return <Button
        disabled={myState === "fetching"}
        icon={ContentSaveIcon}
        onClick={handleSave}
    >
        Zapisz
    </Button>

    function handleSave() {
        if (!selectedIconCollectionName) {
            return;
        }

        function unnormalizaIconCollection(iconCollection: NormalizedIconCollectionT): IconCollectionT {
            return {
                includes: iconCollection.includes,
                settings: iconCollection.settings,
                top: unnormalizeIconSections(iconCollection.top),
                left: unnormalizeIconSections(iconCollection.left),
                right: unnormalizeIconSections(iconCollection.right),
                middle: unnormalizeIconSections(iconCollection.middle),
                bottom: unnormalizeIconSections(iconCollection.bottom),
            }
        }

        function unnormalizeIconSections(sections: string[]): IconSectionT[] {
            return sections.map(sectionId => {
                const section = iconCollectionSlice.sections[sectionId];

                if (!section) {
                    throw new Error("slice is corrupted");
                }

                return {
                    ...section,
                    widgets: unnormalizeIconWidgets(section.widgets)
                }
            })
        }

        function unnormalizeIconWidgets(widgets: string[]): IconWidgetT[] {
            return widgets.map(widgetId => {
                const widget = iconCollectionSlice.widgets[widgetId];

                if (!widget) {
                    throw new Error("slice is corrupted");
                }

                return {
                    ...widget,
                }
            })
        }

        const current = iconCollectionSlice.collections[selectedIconCollectionName];
        if (!current) {
            return;
        }
        const iconCollection = unnormalizaIconCollection(current);


    }
});


export default SaveButton;
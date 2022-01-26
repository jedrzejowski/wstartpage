import React, {FC} from "react";
import IconWidgetForm from "./IconWidgetForm";
import {useAppSelector} from "../../data/hooks";
import IconCollectionForm from "./IconCollectionForm";
import IconSectionForm from "./IconSectionForm";

export const EditorFormContainer: FC = React.memo(props => {
    const selectedObj = useAppSelector(state => state.editor.selectedObj);

    if (!selectedObj) {
        return null;
    }

    if ('iconCollectionName' in selectedObj) {
        return <IconCollectionForm iconCollectionName={selectedObj.iconCollectionName}/>;
    }

    if ('widgetId' in selectedObj) {
        return <IconWidgetForm widgetId={selectedObj.widgetId}/>;
    }

    if ('sectionId' in selectedObj) {
        return <IconSectionForm sectionId={selectedObj.sectionId}/>;
    }

    return null;
});

export default EditorFormContainer;
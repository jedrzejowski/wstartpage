import React, {FC} from "react";
import IconWidgetForm from "./IconWidgetForm";
import {useAppSelector} from "../../data/hooks";
import IconCollectionForm from "./IconCollectionForm";

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


    return null;
});

export default EditorFormContainer;
import React, {FC} from "react";
import IconWidgetForm from "./IconWidgetForm";
import TextInput from "../TextInput";
import {useAppSelector} from "../../data/hooks";

export const EditorFormContainer: FC = React.memo(props => {
    const selectedObj = useAppSelector(state => state.editor.selectedObj);
    console.log('selectedObj', selectedObj)

    if (!selectedObj) {
        return null;
    }

    if ('widgetId' in selectedObj) {
        return <IconWidgetForm widgetId={selectedObj.widgetId}/>;
    }

    return null;
});

export default EditorFormContainer;
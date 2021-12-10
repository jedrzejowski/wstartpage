import React, {FC} from "react";
import IconWidgetForm from "./IconWidgetForm";
import TextInput from "./TextInput";

export const EditorFormContainer: FC = React.memo(props => {
    return <div>
        <IconWidgetForm/>
        <TextInput label="Tytuł"/>
        <TextInput label="URL"/>
        <TextInput/>
    </div>
});

export default EditorFormContainer;
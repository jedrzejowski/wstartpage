import {FC} from "react";
import {useKeyboardEventEmitter} from "./KeyboardEventEmitter";
import settingsSlice, {useDisplayTitles} from "../data/slice/settingsSlice";
import {useAppDispatch} from "../data/hooks";

export const Shortcuts: FC = props => {
    const displayTitles = useDisplayTitles();
    const dispatch = useAppDispatch();

    useKeyboardEventEmitter(event => {

        if (event.shiftKey && event.key === "T") {
            dispatch(settingsSlice.actions.setDisplayTitles(!displayTitles));
            return;
        }
    });

    return null;
}

export default Shortcuts;
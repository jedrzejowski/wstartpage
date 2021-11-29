import {FC} from "react";
import {useKeyboardEventEmitter} from "./KeyboardEventEmitter";
import settingsSlice, {useSettings} from "../data/slice/settingsSlice";
import {useAppDispatch} from "../data/hooks";

export const Shortcuts: FC = props => {
    const settings = useSettings()
    const dispatch = useAppDispatch();

    useKeyboardEventEmitter(event => {

        if (event.shiftKey && event.key === "T") {
            dispatch(settingsSlice.actions.setDisplayTitles(!settings.displayTitles));
            return;
        }

        if (event.shiftKey && event.key === "D") {
            dispatch(settingsSlice.actions.setDarkMode(!settings.darkMode));
            return;
        }

        if (event.key === "+") {
            dispatch(settingsSlice.actions.setZoomLevel(settings.zoomLevel + 10));
            return;
        }

        if (event.key === "-") {
            dispatch(settingsSlice.actions.setZoomLevel(settings.zoomLevel - 10));
            return;
        }
    });

    return null;
}

export default Shortcuts;
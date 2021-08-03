import {useEffect, useMemo} from "react";

export function useKeyboardEventEmitter(cb: (key: KeyboardEvent) => void) {

    useEffect(() => {

        const eventCallback = (event: KeyboardEvent) => {
            if (event.target == document.body) {
                cb(event);
            }
        };

        window.addEventListener("keydown", eventCallback);

        return () => {
            window.removeEventListener("keydown", eventCallback);
        }
    }, [cb]);
}


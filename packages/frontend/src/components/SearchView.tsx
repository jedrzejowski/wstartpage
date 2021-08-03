import React, {FC} from "react";
import styled from "@emotion/styled";
import searchSlice, {useSearchQuery} from "../data/slice/searchSlice";
import {useKeyboardEventEmitter} from "./KeyboardEventEmitter";
import {useAppDispatch} from "../data/hooks";

export const SearchView: FC = props => {
    const searchQuery = useSearchQuery()
    const dispatch = useAppDispatch();

    useKeyboardEventEmitter(event => {

        if (event.shiftKey || event.altKey || event.ctrlKey) {
            return;
        }

        if (event.code.match(/^Key[A-Z]$/)) {
            dispatch(searchSlice.actions.append(event.key));
        }

        if (event.code === "Backspace") {
            dispatch(searchSlice.actions.backspace());
        }

        if (event.code === "Escape") {
            dispatch(searchSlice.actions.clear());
        }
    });

    return (
        <Root>
            {searchQuery}
        </Root>
    )
};

const Root = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  bottom: 10%;
  font-size: 5em;
  text-shadow: 0 0 20px black;
  color: white;
  text-align: center;
`

export default SearchView;
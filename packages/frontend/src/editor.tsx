import React from "react";
import StartPage from "./components/startpage/StartPage";
import StartPageShortcuts from "./components/startpage/StartPageShortcuts";
import {SettingsSaver} from "./data/slice/settingsSlice";
import app_render from "./app_render";
import StartPageEditor from "./components/editor/StartPageEditor";

app_render(<>
    <StartPageEditor/>
</>);

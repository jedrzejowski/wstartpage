import React from "react";
import ReactDom from "react-dom";
import Dashboard from "./components/Dashboard";
import EnsureFontLoaded from "./lib/EnsureFontLoaded";
import Modal from "react-modal";
import {ThemeProvider} from "./theme";
import {Provider as ReduxProvider} from "react-redux";
import {store} from "./data/store";
import Shortcuts from "./components/Shortcuts";
import {SettingsSaver} from "./data/slice/settingsSlice";

const app = document.createElement("div");
app.id = "app";
document.body.append(app);

Modal.setAppElement(app);

ReactDom.render(
    <>
        <EnsureFontLoaded
            fontFamily="Yanone Kaffeesatz"
            href="https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:400,700|Roboto:100,300,400"/>
        <EnsureFontLoaded
            fontFamily="Roboto"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <EnsureFontLoaded
            fontFamily="Material Icons"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"/>


        <ReduxProvider store={store}>
            <Shortcuts/>
            <SettingsSaver/>
            <ThemeProvider>
                <Dashboard/>
            </ThemeProvider>
        </ReduxProvider>

    </>,
    app
);

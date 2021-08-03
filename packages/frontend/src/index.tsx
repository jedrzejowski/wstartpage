import Dashboard from "./components/Dashboard";
import ReactDom from "react-dom";
import React from "react";
import EnsureFontLoaded from "./lib/EnsureFontLoaded";
import Modal from 'react-modal';
import {ThemeProvider} from '@emotion/react'
import theme from "./theme";
import {Provider as ReduxProvider} from 'react-redux'
import {store} from "./data/store";
import Shortcuts from "./components/Shortcuts";

const app = document.createElement("div");
app.id = "app";
document.body.append(app);

Modal.setAppElement(app);

ReactDom.render(
    <>
        <EnsureFontLoaded fontFamily="Yanone Kaffeesatz"/>


        <ReduxProvider store={store}>
            <Shortcuts/>
            <ThemeProvider theme={theme}>
                <Dashboard/>
            </ThemeProvider>
        </ReduxProvider>

    </>,
    app
);

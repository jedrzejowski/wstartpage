import Dashboard from "./components/Dashboard";
import ReactDom from "react-dom";
import React from "react";
import EnsureFontLoaded from "./lib/EnsureFontLoaded";
import Modal from 'react-modal';
import {ThemeProvider} from '@emotion/react'
import theme from "./theme";
import {CurrentDashboardsNamesContext} from "./data/currentDashboards";

const app = document.createElement("div");
app.id = "app";
document.body.append(app);

Modal.setAppElement(app);

ReactDom.render(
    <>
        <EnsureFontLoaded fontFamily="Yanone Kaffeesatz"/>

        <CurrentDashboardsNamesContext>
            <ThemeProvider theme={theme}>
                <Dashboard/>
            </ThemeProvider>
        </CurrentDashboardsNamesContext>

    </>,
    app
);

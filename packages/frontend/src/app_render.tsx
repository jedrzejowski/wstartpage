import React, {FunctionComponentElement} from "react";
import ReactDom from "react-dom";
import EnsureFontLoaded from "./components/EnsureFontLoaded";
import Modal from "react-modal";
import {ThemeProvider} from "./theme";
import {Provider as ReduxProvider} from "react-redux";
import {store} from "./data/store";
import {QueryClient, QueryClientProvider} from "react-query";

export function app_render(app: FunctionComponentElement<any>) {
    const root = document.createElement("div");
    root.id = "app";
    document.body.append(root);

    const queryClient = new QueryClient()

    Modal.setAppElement(root);

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

            <QueryClientProvider client={queryClient}>
                <ReduxProvider store={store}>
                    <ThemeProvider>

                        {app}

                    </ThemeProvider>
                </ReduxProvider>
            </QueryClientProvider>

        </>,
        root
    );

    return root;
}

export default app_render;

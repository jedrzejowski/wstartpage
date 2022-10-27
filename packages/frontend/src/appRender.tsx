import React, {FunctionComponentElement} from 'react';
import {createRoot} from 'react-dom/client';
import EnsureFontLoaded from './components/EnsureFontLoaded';
import {ThemeProvider} from './theme';
import {Provider as ReduxProvider} from 'react-redux';
import {reduxStore} from './data/redux';
import reportWebVitals from './reportWebVitals';


export function appRender(app: FunctionComponentElement<any>) {
  const root = document.getElementById('root')!;

  const container = createRoot(root);

  container.render(
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

      <ReduxProvider store={reduxStore}>
        <ThemeProvider>
          {app}
        </ThemeProvider>
      </ReduxProvider>

    </>
  );

  reportWebVitals();

  return root;
}

export default appRender;

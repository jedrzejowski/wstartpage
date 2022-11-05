import React from 'react';
import appRender from './appRender';
import StartPageEditor from './components/editor/StartPageEditor';

export default () => {
  appRender(<>
    <StartPageEditor/>
  </>);
}

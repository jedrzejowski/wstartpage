import appRender from './appRender';
import {
  HashRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import StartPageEditor from "./components/editor/StartPageEditor.tsx";

const Router = HashRouter;

function App() {

  // <StartPageEditor/>;
  return <Router>
    <Routes>
      {/*<Route path="/" element={<Home />} />*/}
      {/*<Route path="users/*" element={<Users />} />*/}
    </Routes>
  </Router>
}

appRender(<App/>);

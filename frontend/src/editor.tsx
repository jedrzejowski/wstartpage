import appRender from './appRender.tsx';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./components/admin/LoginPage.tsx";
import TileEditorPage from "./components/admin/TileEditorPage.tsx";
import RequireAuth from "./components/RequireAuth.tsx";

const Router = HashRouter;

function App() {

  // <StartPageEditor/>;
  return <Router>
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="*" element={
        <RequireAuth>
          <Routes>
            <Route path="/tile-collection-editor" element={<TileEditorPage/>}/>
          </Routes>
        </RequireAuth>
      }/>
      {/*<Route path="users/*" element={<Users />} />*/}
    </Routes>
  </Router>
}


function NoMatch() {
  return <div>TODO</div>;
}

appRender(<App/>);

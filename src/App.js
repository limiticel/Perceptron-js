import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Navbar from "./components/pages/Navbar";
import IA from "./components/pages/train"
export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/company">
        <Company />
      </Route>
      <Route path="/Ia_module">
        <IA />
      </Route>
    </Switch>
  </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
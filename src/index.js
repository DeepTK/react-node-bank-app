import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import login from "Login.jsx"
import Admin from 'layouts/Admin'
import Login from "Login";
import delete_cache from "./global/clear_browser_cache";
import SubUser from "layouts/SubUser";
// import * as serviceWorker from './serviceWorker';
//disabling this because it may store cache
const hist = createBrowserHistory();
delete_cache();
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/subuser" component={SubUser} />
      <Route path="/admin"  component={Admin} />
      <Route path="/sign-in"  component={login} />
      <Redirect to="/sign-in" />
      <Route path="*" component={Login}/>
    </Switch>
  </Router>,
  document.getElementById("root") 
  
);
// serviceWorker.register();
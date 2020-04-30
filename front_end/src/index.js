/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import SignIn from 'layouts/SignIn';
import SignUp from 'layouts/SignUp'

import "assets/css/material-dashboard-react.css?v=1.8.0";
import LandingPage from "views/LandingPage/LandingPage";
import { UserProvider } from "context/UserContext";
import ImgStream from "views/ImgStream/ImgStream";
import DefaultStream from "views/DefaultStream/DefaultStream";
import LabelButton from "components/LabelButton/LabelButton";
import Logout from "components/Logout/Logout";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";

const hist = createBrowserHistory();

ReactDOM.render(
  <UserProvider>
  <Router history={hist}>
    <Switch>
    
    
      <Route path="/SignIn" component={SignIn}/>
      <Route path="/SignUp" component={SignUp}/>
      <PrivateRoute path="/admin" component={Admin} />
      <Route path="/(home|)" component={LandingPage} />
      <Route path="/rtl" component={RTL} />
      <Route path="/img" component={ImgStream} />
      <Route exact path="/default/:name" component={DefaultStream} />
      <PrivateRoute exact path="/logout" component={Logout} />
      
      
      
    </Switch>
  </Router>
  </UserProvider>
 ,
  document.getElementById("root")
);

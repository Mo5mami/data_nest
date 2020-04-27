import React from 'react'

import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import SignIn from 'layouts/SignIn';
import SignUp from 'layouts/SignUp'

import "assets/css/material-dashboard-react.css?v=1.8.0";
import LandingPage from "views/LandingPage/LandingPage";
import { useState } from 'react';
import ImgStream from 'views/ImgStream/ImgStream';
import DefaultStream from 'views/DefaultStream/DefaultStream';

const hist = createBrowserHistory();


export const userCont =React.createContext()
export default function MainComponent() {
    const initialUser={
        name:"No login",
    }
    const [user,setUser] = useState(initialUser)
    

    return (
   
        <Router history={hist}>
    <userCont.Provider value={{user,setUser}}>
    <Switch>
    <Route path="/SignIn" component={SignIn}/>
    

      <Route path="/SignUp" component={SignUp}/>
      <Route path="/admin" component={Admin} />
      <Route path="/(home|)" component={LandingPage} />
      <Route path="/img" component={ImgStream} />
      <Route path="/default" component={DefaultStream} />
      <Route path="/rtl" component={RTL} />
      
    </Switch>
    </userCont.Provider>
  </Router>

    )
}

//export default MainComponent

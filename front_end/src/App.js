import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'
import App2 from './components/App2'
import Request from './components/Request'

import { Link, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Route path="/(SignIn|)" component={SignIn}/>
      <Route path="/SignUp" component={SignUp}/>
      <Route path="/App2" component={App2}/>
      <Route path="/Request" component={Request}/>

    </div>
  );
}

export default App;

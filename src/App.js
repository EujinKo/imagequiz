import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Quiz from './components/Quiz';
import './App.css';

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

//To put the base path on the top, you need to put exact path
function App() {
  return (
    // <div className="App">
    //   <Home />
      
    // </div>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path='/' render={props => <Home {...props}/>}>
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/quiz' render={props => <Quiz {...props}/>}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

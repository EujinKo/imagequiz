import React from 'react';
import Home from './components/Home';
import './App.css';

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <Home />
      
    // </div>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/login'>
        {/* <Login /> */}
      </Route>
    </switch>
    </BrowserRouter>
  );
}

export default App;

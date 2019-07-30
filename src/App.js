import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";


import NavBar from "./components/layaout/NavBar";
import PokeList from "./components/pokemon/PokeList";

import PokeInfo from './components/pokemon/PokeInfo';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./App.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <React.Fragment>
          <Switch>
            <Route path='/pokemon' component={PokeInfo} ></Route>
            <Route path='/' component={PokeList} ></Route>
          </Switch>
        </React.Fragment> 
      </BrowserRouter>
    </div>
  );
}

export default App;

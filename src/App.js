import React from "react";
import { BrowserRouter, Route } from "react-router-dom";


import NavBar from "./components/layaout/NavBar";
import PokeList from "./components/pokemon/PokeList";

import PokeInfo from './components/pokemon/PokeInfo';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./App.css";
function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <BrowserRouter>
        <React.Fragment>
          <Route path='//' component={PokeList} ></Route>
          <Route path='/pokemon' component={PokeInfo} ></Route>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;

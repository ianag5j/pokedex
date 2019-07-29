import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./App.css";

import NavBar from "./components/layaout/NavBar";
import PokeList from "./components/pokemon/PokeList";

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
        <PokeList />
      </header>
    </div>
  );
}

export default App;

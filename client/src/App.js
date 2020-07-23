import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Movies from "./components/Movies";
import TVSeries from "./components/TVSeries";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="body">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movies" component={Movies} />
          <Route path="/tv" component={TVSeries} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

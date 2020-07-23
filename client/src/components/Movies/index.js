import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Main";
import AddMovie from "./AddMovie";
import FavouritesMovie from "./FavouritesMovie";
import MovieById from "./MovieById";
import UpdateMovie from "./UpdateMovie";
import Sidebar from "../Sidebar";

function Movies() {
  return (
    <div className="Movies Two-Side">
      <Sidebar name="movies" />
      <div className="Movies-container Mainbar">
        <Switch>
          <Route exact path="/movies/" component={Main} />
          <Route exact path="/movies/add" component={AddMovie} />
          <Route exact path="/movies/favourites" component={FavouritesMovie} />
          <Route exact path="/movies/:id" component={MovieById} />
          <Route exact path="/movies/:id/edit" component={UpdateMovie} />
        </Switch>
      </div>
    </div>
  );
}

export default Movies;

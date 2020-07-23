import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_FAVOURITES_MOVIE } from "../../../queries/movies";
import Card from "../Card";

function FavouritesMovie() {
  const { data, loading } = useQuery(GET_FAVOURITES_MOVIE);
  return (
    <div>
      <h1>Favourites Movie</h1>
      <div className="Favourites-container">
        {!loading && !data.favouritesMovie.length && <p>No Favourites Yet</p>}
        {!loading &&
          data.favouritesMovie.map((favourite) => (
            <Card key={favourite.id} {...favourite} />
          ))}
      </div>
    </div>
  );
}

export default FavouritesMovie;

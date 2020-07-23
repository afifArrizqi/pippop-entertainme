import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_MOVIES } from "../../../queries/movies";
import Card from "../Card";
import "./Main.css";

function Movies() {
  const { data, loading } = useQuery(GET_MOVIES);

  return (
    <div className="Main">
      {loading && <p>Loading...</p>}
      {!loading &&
        data.movies.map((tag) => {
          return <Card key={tag._id} {...tag} />;
        })}
    </div>
  );
}

export default Movies;

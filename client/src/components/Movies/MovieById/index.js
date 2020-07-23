import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_MOVIE_BY_ID } from "../../../queries/movies";

function MovieById(props) {
  const { data } = useQuery(GET_MOVIE_BY_ID, {
    variables: {
      id: props.match.params.id,
    },
  });

  return (
    <div className="MovieById White">
      {data && (
        <div>
          <h2>{data.getMovie.title}</h2>
          <hr />
          <img src={data.getMovie.poster_path} alt={data.getMovie.title} />
          <p>Overview: {data.getMovie.overview}</p>
          <p>Popularity: {data.getMovie.popularity}</p>
          <p>
            {data.getMovie.tags.map((tag) => {
              return <span key={tag}>#{tag} </span>;
            })}
          </p>
        </div>
      )}
    </div>
  );
}

export default MovieById;

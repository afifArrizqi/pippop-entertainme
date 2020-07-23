import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  DELETE_MOVIE,
  ADD_FAVOURITES_MOVIE,
  GET_MOVIES,
  GET_FAVOURITES_MOVIE,
} from "../../../queries/movies";
import "./Card.css";

function Card({ _id, title, overview, poster_path, popularity, tags }) {
  const { pathname } = useLocation();
  const favouritesRoute = pathname === "/movies/favourites" ? true : false;
  const [isFavorites, setIsFavourites] = useState(false);
  const { data } = useQuery(GET_FAVOURITES_MOVIE, {
    onCompleted: () => {
      for (let favourite of data.favouritesMovie) {
        if (favourite.id === _id) setIsFavourites(true);
      }
    },
  });
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });
  const [addFavouritesMovie] = useMutation(ADD_FAVOURITES_MOVIE);

  async function onDelete(id) {
    await deleteMovie({ variables: { id } });
  }

  async function onFavourites(
    id,
    title,
    overview,
    poster_path,
    popularity,
    tags
  ) {
    await addFavouritesMovie({
      variables: { id, title, overview, poster_path, popularity, tags },
    });
    setIsFavourites(true);
  }
  return (
    <div className="Card">
      <div className="imagePlacer">
        <img src={poster_path} alt={title} />
      </div>
      <h1>{title}</h1>
      <p>{overview}</p>
      <p>{popularity}</p>
      <p>
        {tags.map((tag) => {
          return <span key={tag}>#{tag} </span>;
        })}
      </p>
      {!favouritesRoute && (
        <div>
          <Link className="btn Link White" to={`/movies/${_id}`}>
            detail
          </Link>
          <Link className="btn Link White" to={`/movies/${_id}/edit`}>
            edit
          </Link>
          <button className="btn" onClick={() => onDelete(_id)}>
            delete
          </button>
          <button
            className={isFavorites ? "btn btn-deactive" : "btn"}
            onClick={() => {
              onFavourites(_id, title, overview, poster_path, popularity, tags);
            }}
            disabled={isFavorites}
          >
            add to favourites
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;

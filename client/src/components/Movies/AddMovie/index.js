import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_MOVIE, GET_MOVIES } from "../../../queries/movies";

function AddMovie(props) {
  const [addMovie, { error }] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
    onCompleted: () => props.history.replace("/movies"),
  });
  const [form, setForm] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: 0,
    tags: [],
  });

  function onChange(e) {
    let { name, value } = e.target;
    if (name === "popularity") {
      value = parseFloat(value);
    }

    const newForm = {
      ...form,
      [name]: value,
    };
    setForm(newForm);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (validationChecker(form)) {
      await addMovie({ variables: { movie: form } });
      if (!error) {
        console.log("successfully add movie");
      }
    } else {
      console.log("Validation Error");
    }
  }

  function validationChecker({
    title,
    overview,
    poster_path,
    popularity,
    tags,
  }) {
    let str = false;
    let num = false;
    let arr = false;
    if (title && overview && poster_path) str = true;
    if (!isNaN(popularity)) num = true;
    if (Array.isArray(tags)) arr = true;
    return str && num && arr;
  }

  return (
    <div className="Add Movie">
      <form onSubmit={onSubmit} className="form-small White">
        <h1>Add Movie</h1>
        <div className="form-controller">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={onChange}
          />
        </div>
        <div className="form-controller">
          <label>Overview</label>
          <input
            type="text"
            name="overview"
            value={form.overview}
            onChange={onChange}
          />
        </div>
        <div className="form-controller">
          <label>Poster</label>
          <input
            type="url"
            name="poster_path"
            value={form.poster_path}
            onChange={onChange}
          />
        </div>
        <div className="form-controller">
          <label>Popularity</label>
          <input
            type="number"
            name="popularity"
            value={form.popularity}
            onChange={onChange}
            min={0}
            max={5}
            step={0.2}
          />
        </div>
        <div className="form-controller">
          <label>Tags</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={(e) => {
              const newTags = e.target.value.split(",");
              const newForm = {
                ...form,
                tags: newTags,
              };
              setForm(newForm);
            }}
          />
        </div>
        <button className="btn-form" type="submit">
          Add Movie
        </button>
      </form>
    </div>
  );
}

export default AddMovie;

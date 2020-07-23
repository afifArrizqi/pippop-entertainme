# Query Template

Note: given Id is empty String. Fill it up with the id you desire.

```
# Write your query or mutation here
query entertainMe {
  #### Movies ####
  movies {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
  
  getMovie(id: "") {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }

  ##### TV SERIES ####
  tv_series {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }

  getTVSeries(id: "") {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }

  ##### EntertainMe ######
  entertainMe {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
    tv_series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
}

mutation entertainMeMutation {
  #### Movies ####
  insertMovie(
    movie: {
      title: "hello movies 11"
      overview: "Very Good"
      poster_path: "http://localhost:5000/"
      popularity: 5.0
      tags: ["rocket"]
    }
  ) {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }

  updateMovie(
    movie: {
      id: ""
      data: {
        title: "hello movies 10"
        overview: "Very Good"
        poster_path: "http://localhost:5000/"
        popularity: 4.7
        tags: ["rocket", "goal"]
      }
    }
  ) {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }

  deleteMovie(id: "") {
    ok
  }

  ##### TV SERIES #####

  insertTVSeries(
    tv: {
      title: "hello tv series 10"
      overview: "Very Good"
      poster_path: "http://localhost:5000/"
      popularity: 4.4
      tags: ["rocket"]
    }
  ) {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }

  updateTVSeries(
    tv: {
      id: ""
      data: {
        title: "hello tv series 8"
        overview: "Very Good"
        poster_path: "http://localhost:5000/"
        popularity: 4.7
        tags: ["rocket", "goal"]
      }
    }
  ) {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }

  deleteTVSeries(id: "") {
    ok
  }
}
```
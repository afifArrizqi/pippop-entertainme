const Redis = require("ioredis");
const redis = new Redis();
const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  input UpdateMovie {
    id: ID!
    data: InsertMovie
  }

  input InsertMovie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Movies {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type MovieDelete {
    ok: Int
  }

  extend type Query {
    movies: [Movies]
    getMovie(id: ID!): Movies
  }

  extend type Mutation {
    insertMovie(movie: InsertMovie): [Movies]
    updateMovie(movie: UpdateMovie): Movies
    deleteMovie(id: ID!): MovieDelete
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      const moviesCache = await redis.get("movies");
      if (moviesCache) {
        console.log("dari cache");
        return JSON.parse(moviesCache);
      } else {
        try {
          console.log("dari axios");
          const movies = await axios.get("http://localhost:3001/movies");
          await redis.set("movies", JSON.stringify(movies.data));
          await redis.del("entertainme");
          return movies.data;
        } catch (err) {
          return err;
        }
      }
    },
    getMovie: async (_, args) => {
      const { id } = args;
      const movieCache = await redis.get(`movieById${id}`);
      if (movieCache) {
        console.log("dariChace");
        return JSON.parse(movieCache);
      } else {
        try {
          console.log("dariAxios");
          const movie = await axios.get(`http://localhost:3001/movies/${id}`);
          await redis.set(`movieById${id}`, JSON.stringify(movie.data));
          return movie.data;
        } catch (err) {
          return err;
        }
      }
    },
  },

  Mutation: {
    insertMovie: async (_, args) => {
      try {
        const movie = await axios.post(
          "http://localhost:3001/movies",
          args.movie
        );
        const id = movie.data.ops[0]._id;
        const result = movie.data.ops;
        redis.del("movies");
        redis.del("entertainme");
        await redis.set(`movieById${id}`, JSON.stringify(result));
        return result;
      } catch (err) {
        return err;
      }
    },
    updateMovie: async (_, args) => {
      const { id, data } = args.movie;
      try {
        const movie = await axios.put(
          `http://localhost:3001/movies/${id}`,
          data
        );
        const result = { ...JSON.parse(movie.config.data), _id: id };
        await redis.del("movies");
        await redis.del("entertainme");
        await redis.set(`movieById${id}`, JSON.stringify(result));
        return result;
      } catch (err) {
        return err;
      }
    },
    deleteMovie: async (_, args) => {
      const { id } = args;
      try {
        const movie = await axios.delete(`http://localhost:3001/movies/${id}`);
        await redis.del("movies");
        await redis.del("entertainme");
        await redis.del(`movieById${id}`);
        return movie.data;
      } catch (err) {
        return err;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};

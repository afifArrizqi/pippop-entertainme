const Redis = require("ioredis");
const redis = new Redis();
const { gql } = require("apollo-server");
const {
  fetchMovies,
  fetchTVSeries,
} = require("../middlewares/fetchEntertainMe");

const typeDefs = gql`
  #### Saya pakai 1 boiler plate untuk movies dan tv series di entertainMe
  #### Karena boiler platenya sama dan agar penulisannya DRY
  type EntertainMeContent {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type EntertainMe {
    movies: [EntertainMeContent]
    tv_series: [EntertainMeContent]
  }

  extend type Query {
    entertainMe: EntertainMe
  }
`;

const resolvers = {
  Query: {
    entertainMe: async () => {
      const entertainMeCache = await redis.get("entertainme");
      if (entertainMeCache) {
        return JSON.parse(entertainMeCache);
      }
      const movies = await fetchMovies(); //di import dari middlewares
      const tv_series = await fetchTVSeries(); //di import dari middlewares
      const result = { movies: movies, tv_series: tv_series };
      await redis.set("entertainme", JSON.stringify(result));
      return result;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};

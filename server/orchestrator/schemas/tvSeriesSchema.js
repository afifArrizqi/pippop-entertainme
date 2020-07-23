const Redis = require("ioredis");
const redis = new Redis();
const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  input UpdateTVSeries {
    id: ID!
    data: InsertTVSeries
  }

  input InsertTVSeries {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type TVSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type TVSeriesDelete {
    ok: Int
  }

  extend type Query {
    tv_series: [TVSeries]
    getTVSeries(id: ID!): TVSeries
  }

  extend type Mutation {
    insertTVSeries(tv: InsertTVSeries): [TVSeries]
    updateTVSeries(tv: UpdateTVSeries): TVSeries
    deleteTVSeries(id: ID!): TVSeriesDelete
  }
`;

const resolvers = {
  Query: {
    tv_series: async () => {
      const tvSeriesCache = await redis.get("tvSeries");
      if (tvSeriesCache) {
        console.log("dariChace");
        return JSON.parse(tvSeriesCache);
      } else {
        try {
          console.log("dariAxios");
          const tvSeries = await axios.get("http://localhost:3002/tv");
          await redis.set("tvSeries", JSON.stringify(tvSeries.data));
          await redis.del("entertainme");
          return tvSeries.data;
        } catch (err) {
          return err;
        }
      }
    },
    getTVSeries: async (_, args) => {
      const { id } = args;
      const tvSeriesCache = await redis.get(`tvSeriesById${id}`);
      if (tvSeriesCache) {
        console.log("dariChace");
        return JSON.parse(tvSeriesCache);
      } else {
        try {
          console.log("dariAxios");
          const tvSeries = await axios.get(`http://localhost:3002/tv/${id}`);
          await redis.set(`tvSeriesById${id}`, JSON.stringify(tvSeries.data));
          await redis.del("entertainme");
          return tvSeries.data;
        } catch (err) {
          return err;
        }
      }
    },
  },

  Mutation: {
    insertTVSeries: async (_, args) => {
      try {
        const tv = await axios.post("http://localhost:3002/tv", args.tv);
        const id = tv.data.ops[0]._id;
        const result = tv.data.ops;
        await redis.del("tvSeries");
        await redis.del("entertainme");
        await redis.set(`tvSeriesById${id}`, JSON.stringify(result));
        return result;
      } catch (err) {
        return err;
      }
    },
    updateTVSeries: async (_, args) => {
      const { id, data } = args.tv;
      try {
        const tv = await axios.put(`http://localhost:3002/tv/${id}`, data);
        const result = { ...JSON.parse(tv.config.data), _id: id };
        await redis.del("tvSeries");
        await redis.del("entertainme");
        await redis.set(`tvSeriesById${id}`, JSON.stringify(result));
        return result;
      } catch (err) {
        return err;
      }
    },
    deleteTVSeries: async (_, args) => {
      const { id } = args;
      try {
        const tv = await axios.delete(`http://localhost:3002/tv/${id}`);
        await redis.del("tvSeries");
        await redis.del("entertainme");
        await redis.del(`tvSeriesById${id}`);
        return tv.data;
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

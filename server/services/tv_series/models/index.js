const { db } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

db.createCollection("TVSeries", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "overview", "poster_path", "popularity", "tags"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and required",
        },
        overview: {
          bsonType: "string",
          description: "must be a string and required",
        },
        poster_path: {
          bsonType: "string",
          description: "must be a string and required",
        },
        popularity: {
          bsonType: "double",
          description: "must be a double and required",
        },
        tags: {
          bsonType: "array",
          description: "must be a array and required",
        },
      },
    },
  },
});

const TVSeries = db.collection("TVSeries");

class TvSeriesModel {
  static findAll() {
    const tvSeries = TVSeries.find({}).toArray();
    return tvSeries;
  }
  static findOne(id) {
    return TVSeries.findOne({ _id: ObjectId(id) });
  }
  static insertOne(data) {
    return TVSeries.insertOne(data);
  }
  static updateOne(id, data) {
    return TVSeries.updateOne({ _id: ObjectId(id) }, { $set: data });
  }
  static deleteOne(id, data) {
    return TVSeries.deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = TvSeriesModel;

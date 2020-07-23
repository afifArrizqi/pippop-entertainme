const { db } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

// const db = getDatabase();
db.createCollection("Movies", {
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

const Movie = db.collection("Movies");

class MoviesModel {
  static findAll() {
    return Movie.find({}).toArray();
  }
  static findOne(id) {
    return Movie.findOne({ _id: ObjectId(id) });
  }
  static insertOne(data) {
    return Movie.insertOne(data);
  }
  static updateOne(id, data) {
    return Movie.updateOne({ _id: ObjectId(id) }, { $set: data });
  }
  static deleteOne(id, data) {
    return Movie.deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = MoviesModel;

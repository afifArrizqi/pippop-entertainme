const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "entertainMe";

const client = new MongoClient(url);
const connect = async () => client.connect();
connect();
const db = client.db(dbName);

db.collection("Movies")
  .find()
  .toArray((err, movies) => {
    console.log(err, movies);
  });

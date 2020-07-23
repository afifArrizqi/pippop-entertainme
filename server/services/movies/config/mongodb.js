const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "entertainMe";

const client = new MongoClient(url, { useUnifiedTopology: true });
const connect = async () => await client.connect();
connect();
const db = client.db(dbName);

module.exports = {
  connect,
  db,
};

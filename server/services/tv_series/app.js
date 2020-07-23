const express = require("express");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(port, () => console.log("Server is Started"));

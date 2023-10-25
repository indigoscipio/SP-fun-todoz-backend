require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
var port = process.env.PORT || 3001;
var URI = process.env.URI;

const app = express();
app.use(cors());
app.use(express.static("build"));
app.use(bodyParser.json());

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", routes);

const PORT = port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

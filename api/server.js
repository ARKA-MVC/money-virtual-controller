const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require('cors');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());

server.use(require("./routes"));

server.listen(process.env.PORT || 3080, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is listening on port ${process.env.PORT || 3080}`);
  }
});

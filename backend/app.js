require('dotenv').config();
const debug = require('debug')('app');
const express = require('express');
const bodyParser = require('body-parser');
const loaders = require('./loaders');
const cors = require("cors");

const port = process.env.PORT || 3000;

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  await loaders.init(app);

  app.listen(port, err => {
    if (err) {
      debug(err);
      return;
    }
    debug(`Example app listening on port ${port}!`);
  });
}

startServer();

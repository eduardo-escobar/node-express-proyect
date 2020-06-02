const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const routesV1 = require('./routes/v1');

const app = new express();

console.log('Mongo', process.env.MONGO);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routesV1(app);

const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to mongoDB');
    app.listen(port, () => {
      console.log('runing on 3000');
    });
  })
  .catch((error) => {
    console.log(error);
  });

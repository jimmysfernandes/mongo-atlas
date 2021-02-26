const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const addClient = require('./src/resources/addClient');
const findClientByEmail = require('./src/resources/findClientByEmail');

const createApp = () => {
  const app = express();
  
  app.use(morgan('combined'));
  app.use(bodyParser.json());

  app.post('/clients', addClient);
  app.get('/clients/:email', findClientByEmail);

  return app;
}

const connectDb = () => {
  const url = process.env.MONGO_URL;

  return mongoose.connect(url, { useUnifiedTopology: true,  useNewUrlParser: true, autoIndex: true });
};

connectDb()
  .then(() => {
    console.log('Connected on data with success');

    const port = process.env.PORT || 5000;

    const app = createApp();

    app.listen(port, () => {
      console.log('Server started with success');
    });
  });
